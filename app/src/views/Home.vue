<style lang="css">
.playlists {
  overflow-x: scroll;
}
</style>

<template>
  <div>
    <v-container fluid>
      <v-row class="flex-nowrap playlists">
        <spotify-playlist-card v-for="playlist in playlists" :key="playlist.id" :playlist="playlist" :tracks="playlistTracks[playlist.id]" />
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Container, Draggable, DropResult } from "vue-smooth-dnd";
import { default as Vue } from "vue";
import { Component, Prop } from "vue-property-decorator";
import { default as SpotifyWebApi } from "spotify-web-api-js";
import SpotifyTrackCard from "@/components/cards/SpotifyTrackCard.vue";
import SpotifyPlaylistCard from "@/components/cards/SpotifyPlaylistCard.vue";

@Component({
  components: {
    SpotifyPlaylistCard,
    SpotifyTrackCard,
    Container,
    Draggable,
  },
})
export default class Home extends Vue {
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
}
</script>
