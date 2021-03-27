<template>
  <div>
    <b-table hover striped :items="suggestions" :fields="fields">
      <template #cell(actions)="data">
        <b-button v-if="userEmail != null" v-on:click="deleteSuggestion(data.item)" variant="outline-danger">Suppression</b-button>
      </template>
    </b-table>

  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import firebase from 'firebase';
import {SuggestionModel} from "@/models/suggestions.model";
@Component({
})
export default class SuggestionPage extends Vue {

  @Prop()
  private streamer: string;

  public suggestions: Array<SuggestionModel> = [];
  public userEmail : string | null = null;

  public fields = [
    'game',
    'author',
    'status',
    'actions'
  ];

  public mounted(): void {
    firebase.auth().onAuthStateChanged(user => {
      this.userEmail = user != null ? user.email : null;
    });

    firebase.database().ref('/').child(this.streamer)
        .child("suggestions")
        .on("value", snapshot => {
          this.suggestions = Object.entries(snapshot.val())
              .map(entrie => {
                return new SuggestionModel(Object.assign({}, {id: entrie[0]}, entrie[1]));
              });
        });
  }

  public deleteSuggestion(suggestion: SuggestionModel): void {
    firebase.database().ref('/').child(this.streamer)
        .child("suggestions")
        .child(suggestion.id).remove()
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
