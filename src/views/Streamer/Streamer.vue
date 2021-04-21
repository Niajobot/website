<template>
  <div class="container-streamer">
    <b-navbar
      toggleable="lg"
      type="dark"
      :variant="`dark-primary-${theme}`"
    >
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'HomeStreamer', params: {streamer: streamer}}">{{$t("streamer.navbar.home")}}</b-nav-item>
        <b-nav-item :to="{ name: 'Suggestions', params: {streamer: streamer}}">{{$t("streamer.navbar.suggestions")}}</b-nav-item>
        <b-nav-item :to="{ name: 'Historique', params: {streamer: streamer}}">{{$t("streamer.navbar.history")}}</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Route } from "vue-router";
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

@Component({})
export default class Streamer extends Vue {
  public streamer: string;
  public theme: string;
  private streamerList = ["biajo", "nicroz38", "vega_nosaure"];

  @Watch("$route", { immediate: true, deep: true })
  onUrlChange(to: Route, from: Route) {
    if (to?.params?.streamer !== from?.params?.streamer) {
      this.streamer = to.params.streamer;
      if(this.streamerList.includes(this.streamer)) {
        this.theme = this.streamer;
      } else {
        this.theme = "default";
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container-streamer {
  margin: -15px -30px;
  .content {
    margin: 15px 30px;
  }
}
</style>