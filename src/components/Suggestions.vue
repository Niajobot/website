<template>
  <div>
    <ul>
      <li v-for="(suggestion, index) in suggestions" :key="index">
        {{ suggestion.game }} {{ suggestion.author }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import firebase from 'firebase';
import {SuggestionModel} from "@/models/suggestions.model";
import validate = WebAssembly.validate;

@Component
export default class Suggestions extends Vue {

  public suggestions: Array<SuggestionModel> = [];

  public mounted(): void {
    firebase.database().ref('/').child('nicroz38')
        .child("suggestions")
        .on("value", snapshot => {
          this.suggestions = (Object.values(snapshot.val()) as Partial<SuggestionModel>[])
            .map((val : Partial<SuggestionModel>) => {
              return new SuggestionModel(val);
            });
        });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
//
//ul {
//  list-style-type: none;
//  padding: 0;
//}
//
//li {
//  display: inline-block;
//  margin: 0 10px;
//}

a {
  color: #42b983;
}
</style>
