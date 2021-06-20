<template>
  <div class="card-spotify" v-if="track">
    <img :src="trackImage.url" :width="100" :height="100" />
    <div class="card-content">
      <h2>{{ track.name }}</h2>
      <span>{{ track.artists[0].name }} - {{ track.album.name }}</span>
    </div>
    <div class="card-control">

    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card-spotify {
    border: 1px solid red;
  }
</style>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import {Container, Draggable, DropResult} from "vue-smooth-dnd";
import {default as SpotifyWebApi} from "spotify-web-api-js";

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
      trackImage: this.track.album.images[0]
    }
  }

}
</script>
