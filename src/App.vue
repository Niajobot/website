<template>
  <div id="app">
    <Suggestions msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Suggestions from './components/Suggestions.vue';
import firebase from "firebase";

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
