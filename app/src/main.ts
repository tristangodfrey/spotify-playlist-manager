import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { default as SpotifyWebApi } from "./spotify-web-api.js";
import { default as axios } from "axios";
import cookie from "cookie";
import vuetify from "./plugins/vuetify";

const cookies = cookie.parse(document.cookie);

Vue.config.productionTip = false;

const api = new SpotifyWebApi();

const url = new URL(window.location.href);

//@ts-ignore
const accessToken = url.searchParams.get("token");

console.log('hello');

let expiresAt = parseInt(
  url.searchParams.get("expires") as string
);

const autoRefresh = () => {
  setTimeout(() => {

    const current = Math.floor(new Date().getTime() / 1000);

    //refresh if we have less than a minute left on the token
    if ((expiresAt - current) < 60) {
      axios.get("/refresh").then((res) => {
        const token = res.data["token"];
        expiresAt = res.data["expires"];
        api.setAccessToken(token);
      });
    }
  }, 100);
};

autoRefresh();

api.setAccessToken(accessToken);


Vue.prototype.$api = api;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
