import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {default as SpotifyWebApi} from "./spotify-web-api.js";
import {default as axios} from "axios";
import cookie from "cookie";

const cookies = cookie.parse(document.cookie);

Vue.config.productionTip = false;

const api = new SpotifyWebApi();

/**
 * Trim a second off the time to ensure we are within the window (latency etc)
 * @param expirationSeconds
 */
const getRefreshInterval = (expirationSeconds: number) => {
    return (expirationSeconds - 1) * 1000
};

const url = new URL(window.location.href);

//@ts-ignore
const accessToken = url.searchParams.get("token");

let refreshIntervalSeconds = parseInt(url.searchParams.get("expires") as string);

const autoRefresh = (refreshInterval: number) => {
    setTimeout(() => {
        axios.get('/refresh').then(res => {
            const token = res.data['token'];
            refreshIntervalSeconds = res.data['expires'];
            api.setAccessToken(token);

            //restart the timeout
            autoRefresh(refreshIntervalSeconds);


        });
    }, refreshInterval);
}

autoRefresh(getRefreshInterval(refreshIntervalSeconds));

api.setAccessToken(accessToken);

//
// const realApi = () => {
//   return new Proxy(new SpotifyWebApi(), {
//     get: function(target, name, receiver) {
//       //@ts-ignore
//       if (!target.hasOwnProperty(name)) {
//         //@ts-ignore
//         if (typeof target[name] === "function") {
//           console.log(
//             "Calling Method : ",
//             name,
//             "|| on : ",
//             target.constructor.name
//           );
//         }
//         //@ts-ignore
//         return new Proxy(target[name], this);
//       }
//       return Reflect.get(target, name, receiver);
//     }
//   });
// };

Vue.prototype.$api = api;


new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
