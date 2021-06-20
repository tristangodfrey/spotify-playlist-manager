<template>
  <v-card v-if="track" outlined class="card-wrapper">
    <v-row>
      <v-col cols="2">
        <img :src="trackImage.url" :width="80" :height="80" />
      </v-col>
      <v-col cols="8">
        <div class="card-content">
          <v-card-title class="text-no-wrap">{{ track.name }}</v-card-title>
          <v-card-subtitle class="text-no-wrap">{{ track.artists[0].name }} - {{ track.album.name }}</v-card-subtitle>
        </div>
      </v-col>
      <v-col cols="2">
        <div class="card-control">
          <v-icon
              large
              color="green darken-2">
            mdi-play
          </v-icon>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-wrapper {
  margin-bottom: 10px;
  height: 80px;
}

.card-control {
  padding-top: 20px;
  padding-left: 10px;
}

.card-content {
  margin-top: -5px;
}
</style>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Container, Draggable, DropResult } from "vue-smooth-dnd";
import { default as SpotifyWebApi } from "spotify-web-api-js";

@Component({
  components: {
    Container,
    Draggable,
  },
})
export default class SpotifyTrackCard extends Vue {
  @Prop()
  track: SpotifyApi.TrackObjectFull;

  data() {
    return {
      trackImage: this.track.album.images[0],
    };
  }
}
</script>
