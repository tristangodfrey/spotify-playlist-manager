<template>
    <v-col cols="4">
      <v-card class="spotify-playlist-card">
        <v-card-title>{{ playlist.name }}</v-card-title>
        <Container
            :v-if="tracks.length > 0"
            @drop="(e) => onDrop(playlist.id, e)"
            class="playlist-container"
            :get-child-payload="(index) => getChildPayload(playlist.id, index)"
            group-name="main"
        >
          <Draggable
              v-for="track in tracks"
              :key="track.id"
          >

            <spotify-track-card :track="track" />

          </Draggable>
        </Container>
      </v-card>

    </v-col>

</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.spotify-playlist-card {

}
</style>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Container, Draggable, DropResult } from "vue-smooth-dnd";
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
export default class SpotifyPlaylistCard extends Vue {
  @Prop()
  playlist: SpotifyApi.PlaylistObjectSimplified;

  @Prop()
  tracks: SpotifyApi.TrackObjectFull[];

  getChildPayload(playlistId: string, index: number) {

    return {
      playlistId,
      track: this.tracks[index],
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

        this.tracks.splice(
            dropResult.removedIndex,
            1
        );

      }

      if (dropResult.addedIndex !== null) {

        this.tracks.splice(
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
