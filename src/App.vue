<template>
  <div id="app" :class="currentTheme">
    <Header></Header>
    <main>
      <router-view :key="$route.path"/>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import firebase from "firebase";
import BootstrapVue, { IconsPlugin, LayoutPlugin } from "bootstrap-vue";
import { Route } from "vue-router";
import VueScrollTo from "vue-scrollto";


import Header from "./common/Header.vue";

import "./styles/site.scss";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(LayoutPlugin);
Vue.use(VueScrollTo);

@Component({
  components: {
    Header
  },
})
export default class App extends Vue {

  public currentTheme: string;
  async created() {
    const firebaseConfig = {
      apiKey: "AIzaSyChh1BEx0mB2747hP8jW9QA8ebwIgJmodQ",
      authDomain: "stream-2549c.firebaseapp.com",
      databaseURL: "https://stream-2549c-default-rtdb.firebaseio.com",
      projectId: "stream-2549c",
      storageBucket: "stream-2549c.appspot.com",
      messagingSenderId: "590148583267",
      appId: "1:590148583267:web:fa9acd5b27be53fead1d56",
    };

    firebase.initializeApp(firebaseConfig);

    await firebase.auth().signInAnonymously();

    this.currentTheme = 'main';
  }

  @Watch("$route", { immediate: true, deep: true })
  onUrlChange(to: Route, from: Route) {
    if (to?.params?.streamer !== from?.params?.streamer) {
      // ThemeHelper.theme = "flatly";
      this.currentTheme = to?.params?.streamer ?? 'main'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  main {
    margin: 15px 30px;
  }
}
</style>
