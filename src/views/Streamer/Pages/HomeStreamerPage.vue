<template>
  <div>
    <b-jumbotron :bg-variant="`dark-primary-${streamer}`">
      <template #header>{{
        $t("streamer.welcome_message", { streamer: streamer })
      }}</template>
      <b-button variant="secondary" :href="`http://twitch.tv/${streamer}`" target="_blank">{{
        $t("streamer.see_twitch")
      }}</b-button>
    </b-jumbotron>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { Route } from "vue-router";


@Component({})
export default class HomeStreamerPage extends Vue {
  public streamer: string;

  @Watch("$route", { immediate: true, deep: true })
  onUrlChange(to: Route, from: Route) {
    if (to?.params?.streamer !== from?.params?.streamer) {
      this.streamer = to.params.streamer;
    }
  }
}
</script>

<style scoped lang="scss">
.jumbotron {
  margin: -15px -30px;
  border-radius: 0 !important;
  color: var(--light);
}
</style>