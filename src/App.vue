<template>
  <div id="app">
    <Suggestions/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Suggestions from './components/Suggestions.vue';
import firebase from "firebase";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue, {IconsPlugin} from "bootstrap-vue";
import './app.scss'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

@Component({
  components: {
    Suggestions,
  },
})
export default class App extends Vue {

  created() {
    const firebaseConfig = {
      apiKey: "AIzaSyChh1BEx0mB2747hP8jW9QA8ebwIgJmodQ",
      authDomain: "stream-2549c.firebaseapp.com",
      databaseURL: "https://stream-2549c-default-rtdb.firebaseio.com",
      projectId: "stream-2549c",
      storageBucket: "stream-2549c.appspot.com",
      messagingSenderId: "590148583267",
      appId: "1:590148583267:web:fa9acd5b27be53fead1d56"
    }

    firebase.initializeApp(firebaseConfig)
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
  margin-top: 60px;
}
</style>
