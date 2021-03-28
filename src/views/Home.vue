<template>
  <div>
    <h1>{{ $t('home.welcome_title') }}</h1>
    <p v-html="$t('home.welcome_text')"></p>
    {{ $t('home.list_streamers') }}
    <ul>
      <li v-for="(streamer, index) in streamers" :key="index">
        <router-link :to="{ name: 'Suggestions', params: {streamer: streamer}}">{{ streamer }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import firebase from "firebase";

@Component({
  name: "Home"
})
export default class HomePage extends Vue {

  public streamers: string[] = [];

  async mounted() {
    this.streamers = (await firebase.database().ref('/streamers').get()).val();
  }
}
</script>

<style scoped>

</style>