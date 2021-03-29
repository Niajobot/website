<template>
  <div>
    <b-table hover striped :items="suggestions" :fields="fields">
      <template #cell(status)="data">
        {{ $t(`suggestions.status.${data.item.status}`) }}
      </template>
      <template #cell(actions)="data">
        <b-button v-if="userEmail != null && streamer === userTwitchName" v-on:click="deleteSuggestion(data.item)"
                  variant="outline-danger">{{ $t('suggestions.actions.delete') }}
        </b-button>
      </template>
    </b-table>

  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import firebase from 'firebase';
import {SuggestionModel} from "@/models/suggestions.model";
import i18n from "@/i18n";

@Component({})
export default class SuggestionPage extends Vue {

  public suggestions: Array<SuggestionModel> = [];
  public userEmail: string | null = null;
  public userTwitchName: string | null = null;

  public fields = [
    {
      key: 'game',
      label: i18n.t('suggestions.headers.game')
    },
    {
      key: 'author',
      label: i18n.t('suggestions.headers.author')
    },
    {
      key: 'status',
      label: i18n.t('suggestions.headers.status')
    },
    {
      key: 'actions',
      label: i18n.t('suggestions.headers.actions')
    }
  ];

  private streamer: string;
  private firebaseConnexion: firebase.database.Reference;

  public mounted(): void {
    this.streamer = this.$route.params.streamer;

    firebase.auth().onAuthStateChanged(async user => {
      if (user != null) {
        this.userEmail = user.email;
        const value = await firebase.database().ref('/users')
            .orderByKey()
            .equalTo(user.uid)
            .get()
        if (value.val() != null) {
          this.userTwitchName = value.val()[user.uid];
        }
      } else {
        this.userEmail = null;
      }
    });

    this.loadSuggestions();
  }

  public deleteSuggestion(suggestion: SuggestionModel): void {
    firebase.database().ref('/').child(this.streamer)
        .child("suggestions")
        .child(suggestion.id).remove()
  }

  @Watch('$route.params.streamer')
  public changeStreamer() {
    this.firebaseConnexion.off();
    this.streamer = this.$route.params.streamer;
    this.loadSuggestions();
  }

  private loadSuggestions() {
    this.firebaseConnexion = firebase.database().ref('/').child(this.streamer)
        .child("suggestions");
    this.firebaseConnexion
        .on("value", snapshot => {
          if (snapshot.val() != null) {
            this.suggestions = Object.entries(snapshot.val())
                .map(entrie => {
                  return new SuggestionModel(Object.assign({}, {id: entrie[0]}, entrie[1]));
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
@import '../styles/theme.scss';

#collapse-login {
  margin-top: 25px;
}

.table {
  @extend %shadow-3-dp;
}
</style>
