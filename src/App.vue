<template>
  <div id="app">
    <Header streamer="nicroz38"></Header>
    <main>
      <SuggestionPage streamer="nicroz38" />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SuggestionPage from "./pages/SuggestionPage.vue";
import Header from "./common/Header.vue";
import firebase from "firebase";
import BootstrapVue, { IconsPlugin, LayoutPlugin } from "bootstrap-vue";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue/dist/bootstrap-vue.css";

import "./styles/theme.scss";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(LayoutPlugin);

@Component({
  components: {
    SuggestionPage,
    Header,
  },
})
export default class App extends Vue {
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
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
  // padding-left: 100px;
  // padding-right: 100px;
}
</style>
