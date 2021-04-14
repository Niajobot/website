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
          v-b-tooltip.hover :title="$t('suggestions.tooltip.delete_suggestion')"
          class="mr-2"
          variant="outline-danger"
          ><b-icon-trash-fill />
        </b-button>
        <b-button
          v-if="isStreamerOfChannel()"
          v-on:click="acceptSuggestion(data.item)"
          v-b-tooltip.hover :title="$t('suggestions.tooltip.accept_suggestion')"
          variant="success"
          ><b-icon-check-circle-fill />
        </b-button>
      </template>
    </b-table>
    <div v-if="isStreamerOfChannel()">
      <p>{{ $t(`suggestions.accepted`) }}</p>
      <b-table hover striped :items="acceptedSuggestions" :fields="fields" >
        <template #cell(status)="data">
          <h5>
            <b-badge pill :variant="`${statusDisplayed[data.item.status]}`">{{
                $t(`suggestions.status.${data.item.status}`)
              }}</b-badge>
          </h5>
        </template>
        <template #cell(actions)="data">
          <b-button
              v-on:click="deleteSuggestion(data.item)"
              v-b-tooltip.hover :title="$t('suggestions.tooltip.delete_suggestion')"
              class="mr-2"
              variant="outline-danger"
          ><b-icon-trash-fill />
          </b-button>
          <b-button
              v-on:click="archiveSuggestion(data.item)"
              v-b-tooltip.hover :title="$t('suggestions.tooltip.archive_suggestion')"
              variant="success"
          ><b-icon-check-circle-fill />
          </b-button>
        </template>
      </b-table>
    </div>
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
import { UserHelper } from "@/user.helper";
import { UserModel } from "@/models/user.model";

@Component({})
export default class SuggestionPage extends Vue {
  public suggestions: Array<SuggestionModel> = [];
  public acceptedSuggestions: Array<SuggestionModel> = [];
  public user: UserModel;
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
      this.user = new UserModel({
        email: user?.email,
        twitchName: await UserHelper.getUserTwitchName(user?.uid)
      })
      if (this.isStreamerOfChannel()) {
        this.fields.push({
          key: "actions",
          label: i18n.t("suggestions.headers.actions"),
        });
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
  }

  public archiveSuggestion(suggestion: SuggestionModel): void {
    firebase
        .database()
        .ref("/")
        .child(this.streamer)
        .child("suggestions")
        .child(suggestion.id)
        .update({ status: "ARCHIVED" });
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

  public isStreamerOfChannel(): boolean {
    return UserHelper.isStreamerOfChannel(this.user, this.streamer);
  }

  @Watch("$route.params.streamer")
  public changeStreamer() {
    this.firebaseConnexion.off();
    this.streamer = this.$route.params.streamer;
    this.loadSuggestions();
  }

  private extractSuggestionValues(snapshot: any): SuggestionModel[] {
    if (snapshot.val() != null) {
      return Object.entries(snapshot.val()).map((entrie) => {
        return new SuggestionModel(
            Object.assign({}, { id: entrie[0] }, entrie[1])
        );
      });
    } else {
      return [];
    }
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
        this.suggestions = this.extractSuggestionValues(snapshot);
      });

    this.firebaseConnexion
        .orderByChild("status")
        .equalTo(SuggestionStatus.ACCEPTED)
        .on("value", (snapshot) => {
          this.acceptedSuggestions = this.extractSuggestionValues(snapshot);
        });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
