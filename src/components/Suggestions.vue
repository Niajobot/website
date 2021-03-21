<template>
  <div>
    <ul>
      <li v-for="(suggestion, name, index) in suggestions" :key="index">
        {{name}} :
        <ul>
          <li v-for="(game, index) in suggestion" :key="index">
            {{ game.game }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import firebase from 'firebase';

@Component
export default class Suggestions extends Vue {

  public suggestions: any = [];

  public mounted(): void {
    firebase.database().ref('/').child('nicroz38')
        .child("suggestions")
        .on("value", snapshot => {
          this.suggestions = snapshot.val()
        });
  }

  @Prop() private msg!: string;
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
