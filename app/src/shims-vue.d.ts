import { default as SpotifyWebApi } from "spotify-web-api-js";

declare module "*.vue" {
  import Vue from "vue";

  export default Vue;
}

declare module "vue/types/vue" {
  // 3. Declare augmentation for Vue
  interface Vue {
    $api: SpotifyWebApi.SpotifyWebApiJs;
  }
}
