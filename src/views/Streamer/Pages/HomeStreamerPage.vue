<template>
  <div>
    <b-jumbotron :bg-variant="`dark-primary-${streamer}`">
      <template #header>{{
        $t("streamer.welcome_message", { streamer: streamer })
      }}</template>
      <p v-html="$t(`streamer.${streamer}.description`)"></p>
      <b-button
        variant="secondary"
        :href="`http://twitch.tv/${streamer}`"
        target="_blank"
        >{{ $t("streamer.see_twitch") }}</b-button
      >
    </b-jumbotron>
    <h2>{{ $t("historique.games_in_progress") }}</h2>
    <b-table hover striped :items="gamesInProgress" :fields="fields"> </b-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import i18n from "@/i18n";
import { Component, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import firebase from "firebase";

import { GameModel } from "@/models/game.model";
import { GameStatus } from "@/models/game-status.enum";

@Component({})
export default class HomeStreamerPage extends Vue {
  public streamer: string;

  public gamesInProgress: Array<GameModel> = [];

  public fields = [
    {
      key: 'game',
      label: i18n.t('historique.headers.game')
    },
    {
      key: 'original_suggesting_author',
      label: i18n.t('historique.headers.original_suggesting_author')
    }
  ];

  private async loadDatas() {
    this.gamesInProgress = await this.loadGamesForStatus(
      GameStatus.IN_PROGRESS
    );
  }
  public mounted(): void {
    this.loadDatas();
  }
  private async loadGamesForStatus(status: GameStatus): Promise<GameModel[]> {
    const snapshot = await firebase
      .database()
      .ref("/")
      .child(this.streamer)
      .child("games")
      .orderByChild("status")
      .equalTo(status)
      .once("value");

    if (snapshot.val() != null) {
      return Object.entries(snapshot.val()).map((entrie) => {
        return new GameModel(Object.assign({}, { id: entrie[0] }, entrie[1]));
      });
    } else {
      return [];
    }
  }

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