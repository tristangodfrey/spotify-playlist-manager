<style lang="css">
.playlists {
  display: flex;
  flex-direction: row;
  width: 5000px;
}
</style>

<template>
  <div>
    <div class="playlists">
      <div
        class="playlist-container"
        v-for="playlist in playlists"
        :key="playlist.id"
      >
        <h2>{{ playlist.name }}</h2>
        <Container
          :v-if="playlists.length > 0"
          @drop="(e) => onDrop(playlist.id, e)"
          class="playlist-container"
          :get-child-payload="(index) => getChildPayload(playlist.id, index)"
          group-name="main"
        >
          <Draggable
            v-for="track in playlistTracks[playlist.id]"
            :key="track.id"
          >
            <spotify-track-card :track="track" />
          </Draggable>
        </Container>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Container, Draggable, DropResult } from "vue-smooth-dnd";
import { default as Vue } from "vue";
import { Component, Prop } from "vue-property-decorator";
import { default as SpotifyWebApi } from "spotify-web-api-js";
import SpotifyTrackCard from "@/components/cards/SpotifyTrackCard.vue";

type TrackPayload = {
  playlistId: string;
  track: SpotifyApi.TrackObjectFull;
};

@Component({
  components: {
    SpotifyTrackCard,
    Container,
    Draggable,
  },
})
export default class DragTest extends Vue {
  playlists: SpotifyApi.PlaylistObjectSimplified[] = [];

  playlistTracks: { [key: string]: SpotifyApi.TrackObjectFull[] } = {};

  async getPlaylists() {
    try {
      return await this.$api.getUserPlaylists("116624350", {});
    } catch (e) {


    }
  }

  async created() {
    if (this.playlists.length !== 0) {
      return;
    }

    const playlists = await this.getPlaylists();

    if (playlists) {
      // const playlists = playlists as SpotifyApi.ListOfUsersPlaylistsResponse;



      for (let playlist of playlists.items) {
        try {
          const tracks = await this.$api.getPlaylistTracks(playlist.id);

          this.$set(
            this.playlistTracks,
            playlist.id,
            tracks.items.map((t) => t.track as SpotifyApi.TrackObjectFull)
          );

        } catch (e) {


        }
      }

      this.playlists = playlists.items;
    }

  }

  shouldAcceptDrop(playlistId: string, src: any, payload: any) {
    //@TODO: if it's already here do nothing

    //remove it from the old playlist

    return true;
  }

  getChildPayload(playlistId: string, index: number) {

    return {
      playlistId,
      track: this.playlistTracks[playlistId][index],
    };
  }

  async onDrop(playlistId: string, dropResult: DropResult<TrackPayload>) {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const { payload } = dropResult;



      try {
        const res = await this.$api.addTracksToPlaylist(playlistId, [
          payload.track.uri,
        ]);
      } catch (e: any) {


        return;
      }

      //remove from old playlist
      try {
        const res = await this.$api.removeTracksFromPlaylist(
          payload.playlistId,
          [payload.track.uri]
        );
      } catch (e: any) {


        return;
      }

      if (dropResult.removedIndex !== null) {

        this.playlistTracks[payload.playlistId].splice(
          dropResult.removedIndex,
          1
        );

      }

      if (dropResult.addedIndex !== null) {

        this.playlistTracks[playlistId].splice(
          dropResult.addedIndex,
          0,
          payload.track
        );

      }

      // this.$set(this.playlistTracks[playlistId], dropResult.addedIndex, payload.track);
    }

    //move to new playlist
  }
}
</script>
