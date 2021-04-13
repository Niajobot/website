<template>
  <div>
    <p>{{ $t(`suggestions.explanation`) }}</p>
    <b-table hover striped :items="suggestions" :fields="fields">
      <template #cell(status)="data">
        <h5>
          <b-badge pill :variant="`${statusDisplayed[data.item.status]}`">{{
            $t(`suggestions.status.${data.item.status}`)
          }}</b-badge>
        </h5>
      </template>
      <template #cell(actions)="data">
        <b-button
          v-if="isStreamerOfChannel()"
          v-on:click="deleteSuggestion(data.item)"
          class="mr-2"
          variant="outline-danger"
          ><b-icon-trash-fill />
        </b-button>
        <b-button
          v-if="isStreamerOfChannel()"
          v-on:click="acceptSuggestion(data.item)"
          variant="success"
          ><b-icon-check-circle-fill />
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import firebase from "firebase";
import { SuggestionModel } from "@/models/suggestion.model";
import i18n from "@/i18n";
import { GameModel } from "@/models/game.model";
import { SuggestionStatus } from "@/models/suggestion-status.enum";
import { GameStatus } from "@/models/game-status.enum";

@Component({})
export default class SuggestionPage extends Vue {
  public suggestions: Array<SuggestionModel> = [];
  public userEmail: string | null = null;
  public userTwitchName: string | null = null;
  public statusDisplayed = {
    SUBMITED: "info",
    ACCEPTED: "success",
  };

  public fields = [
    {
      key: "game",
      label: i18n.t("suggestions.headers.game"),
    },
    {
      key: "author",
      label: i18n.t("suggestions.headers.author"),
    },
    {
      key: "status",
      label: i18n.t("suggestions.headers.status"),
    },
  ];

  /**{
      key: "actions",
      label: i18n.t("suggestions.headers.actions"),
    } */
  private streamer: string;
  private firebaseConnexion: firebase.database.Reference;

  public mounted(): void {
    this.streamer = this.$route.params.streamer;

    firebase.auth().onAuthStateChanged(async (user) => {
      console.log(user);
      if (user != null) {
        this.userEmail = user.email;
        const value = await firebase
          .database()
          .ref("/users")
          .orderByKey()
          .equalTo(user.uid)
          .get();
        if (value.val() != null) {
          this.userTwitchName = value.val()[user.uid];
        }
        if (this.isStreamerOfChannel()) {
          this.fields.push({
            key: "actions",
            label: i18n.t("suggestions.headers.actions"),
          });
        }
      } else {
        this.userEmail = null;
      }
    });

    this.loadSuggestions();
  }

  public deleteSuggestion(suggestion: SuggestionModel): void {
    firebase
      .database()
      .ref("/")
      .child(this.streamer)
      .child("suggestions")
      .child(suggestion.id)
      .remove();
  }

  public acceptSuggestion(suggestion: SuggestionModel): void {
    firebase
      .database()
      .ref("/")
      .child(this.streamer)
      .child("suggestions")
      .child(suggestion.id)
      .update({ status: "ACCEPTED" });
    firebase
      .database()
      .ref("/")
      .child(this.streamer)
      .child("games")
      .push(
        new GameModel({
          game: suggestion.game,
          original_suggesting_author: suggestion.author,
          status: GameStatus.TODO,
        })
      );
  }

  public isStreamerOfChannel() {
    return this.userEmail != null && this.streamer === this.userTwitchName;
  }

  @Watch("$route.params.streamer")
  public changeStreamer() {
    this.firebaseConnexion.off();
    this.streamer = this.$route.params.streamer;
    this.loadSuggestions();
  }

  private loadSuggestions() {
    this.firebaseConnexion = firebase
      .database()
      .ref("/")
      .child(this.streamer)
      .child("suggestions");
    this.firebaseConnexion
      .orderByChild("status")
      .equalTo(SuggestionStatus.SUBMITED)
      .on("value", (snapshot) => {
        if (snapshot.val() != null) {
          this.suggestions = Object.entries(snapshot.val()).map((entrie) => {
            return new SuggestionModel(
              Object.assign({}, { id: entrie[0] }, entrie[1])
            );
          });
        } else {
          this.suggestions = [];
        }
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
