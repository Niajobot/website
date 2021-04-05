<template>
  <div>
    <h3>{{ $t('historique.games_in_progress') }}</h3>
    <b-table hover striped :items="gamesInProgress" :fields="fields">
    </b-table>
    <h3>{{ $t('historique.games_todo') }}</h3>
    <b-table hover striped :items="gamesToDo" :fields="fields">
    </b-table>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import firebase from "firebase";
import {GameStatus} from "@/models/game-status.enum";
import {GameModel} from "@/models/game.model";
import i18n from "@/i18n";

@Component({})
export default class HistoriquePage extends Vue {

  public gamesToDo: Array<GameModel> = [];
  public gamesInProgress: Array<GameModel> = [];
  private streamer: string;

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

  public mounted(): void {
    this.streamer = this.$route.params.streamer;
    this.loadDatas();
  }

  @Watch('$route.params.streamer')
  public changeStreamer() {
    this.streamer = this.$route.params.streamer;
    this.loadDatas();
  }

  private loadDatas() {
    this.loadHistorique();
    this.loadCurentGames();
  }

  private async loadHistorique() {
    const snapshot = await firebase.database().ref('/').child(this.streamer)
        .child("games")
        .orderByChild('status')
        .equalTo(GameStatus.TODO)
        .once('value');

    if (snapshot.val() != null) {
      this.gamesToDo = Object.entries(snapshot.val())
          .map(entrie => {
            return new GameModel(Object.assign({}, {id: entrie[0]}, entrie[1]));
          });
    } else {
      this.gamesToDo = [];
    }
  }

  private async loadCurentGames() {
    const snapshot = await firebase.database().ref('/').child(this.streamer)
        .child("games")
        .orderByChild('status')
        .equalTo(GameStatus.IN_PROGRESS)
        .once('value');

    if (snapshot.val() != null) {
      this.gamesInProgress = Object.entries(snapshot.val())
          .map(entrie => {
            return new GameModel(Object.assign({}, {id: entrie[0]}, entrie[1]));
          });
    } else {
      this.gamesInProgress = [];
    }
  }
}
</script>

<style scoped>

</style>