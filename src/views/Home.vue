<template>
  <div>
    <b-jumbotron
      header="BootstrapVue"
      lead="Bootstrap v4 Components for Vue.js 2"
    >
      <template #header>{{ $t("home.niajobot.welcome_title") }}</template>

      <template #lead>
        {{ $t("home.niajobot.description") }}
      </template>
    </b-jumbotron>

    <b-card>
      <h2>{{ $t("home.streamers.list_streamers") }}</h2>
      <b-card-text>
        {{ $t("home.streamers.text") }}
        <ul>
          <li v-for="(streamer, index) in streamers" :key="index">
            <router-link
              :to="{ name: 'Suggestions', params: { streamer: streamer } }"
              >{{ streamer }}</router-link
            >
          </li>
        </ul>
      </b-card-text>
    </b-card>
    <hr class="my-4" />
    <h2>{{ $t("home.features.title") }}</h2>
    <b-card-group class="row">
      <b-card class="col-12 col-md-3">
        <b-card-img
          :src="require('../assets/suggestion-icon.svg')"
          top          
        ></b-card-img>
        <h3>{{ $t("home.features.suggestions_title") }}</h3>
        <b-card-text
          v-html="$t('home.features.suggestions_text')"
        ></b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebase from "firebase";

@Component({
  name: "Home",
})
export default class HomePage extends Vue {
  public streamers: string[] = [];

  async mounted() {
    this.streamers = (await firebase.database().ref("/streamers").get()).val();
  }
}
</script>

<style scoped>
</style>