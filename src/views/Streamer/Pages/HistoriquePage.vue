<template>
  <div>
    <h3>{{ $t('historique.games_in_progress') }}</h3>
    <b-table hover striped :items="gamesInProgress" :fields="fields">
      <template #cell(actions)="data">
        <b-button
            v-on:click="updateGameStatus(data.item, gameStatus.FINISHED)"
            variant="success"
        ><b-icon-check-circle-fill />
        </b-button>
      </template>
    </b-table>
    <h3>{{ $t('historique.games_todo') }}</h3>
    <b-table hover striped :items="gamesToDo" :fields="fields">
      <template #cell(actions)="data">
        <b-button
            v-on:click="updateGameStatus(data.item, gameStatus.IN_PROGRESS)"
            variant="success"
        ><b-icon-check-circle-fill />
        </b-button>
      </template>
    </b-table>
    <h3>{{ $t('historique.games_over') }}</h3>
    <b-table hover striped :items="gamesOver" :fields="fields">
    </b-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import firebase from "firebase";
import { GameStatus } from "@/models/game-status.enum";
import { GameModel } from "@/models/game.model";
import i18n from "@/i18n";
import { UserHelper } from "@/user.helper";
import { UserModel } from "@/models/user.model";

@Component({})
export default class HistoriquePage extends Vue {

  public gamesToDo: Array<GameModel> = [];
  public gamesInProgress: Array<GameModel> = [];
  public gamesOver: Array<GameModel> = [];
  private streamer: string;
  private user: UserModel;
  public gameStatus = GameStatus;

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

    firebase.auth().onAuthStateChanged(async (user) => {
      this.user = new UserModel({
        email: user?.email,
        twitchName: await UserHelper.getUserTwitchName(user?.uid)
      })
      if (this.isStreamerOfChannel()) {
        this.fields.push({
          key: "actions",
          label: i18n.t("historique.headers.actions"),
        });
      }
    });

    this.loadDatas();
  }

  @Watch('$route.params.streamer')
  public changeStreamer(): void {
    this.streamer = this.$route.params.streamer;
    this.loadDatas();
  }

  private async loadDatas() {
    this.gamesToDo = await this.loadGamesForStatus(GameStatus.TODO);
    this.gamesInProgress = await this.loadGamesForStatus(GameStatus.IN_PROGRESS);
    this.gamesOver = await this.loadGamesForStatus(GameStatus.FINISHED);
  }

  public isStreamerOfChannel(): boolean {
    return UserHelper.isStreamerOfChannel(this.user, this.streamer);
  }

  private async loadGamesForStatus(status: GameStatus): Promise<GameModel[]> {
    const snapshot = await firebase.database().ref('/').child(this.streamer)
        .child("games")
        .orderByChild('status')
        .equalTo(status)
        .once('value');

    if (snapshot.val() != null) {
      return Object.entries(snapshot.val())
          .map(entrie => {
            return new GameModel(Object.assign({}, {id: entrie[0]}, entrie[1]));
          });
    } else {
      return [];
    }
  }

  updateGameStatus(game: GameModel, status: GameStatus): void {
    firebase
        .database()
        .ref("/")
        .child(this.streamer)
        .child("games")
        .child(game.id)
        .update({ status: status });
    this.loadDatas();
  }
}
</script>

<style scoped>

</style>