<template>
  <b-card class=".align-middle">
    <div class="form">
      <input v-model="email" type="email" placeholder="email"/>
      <input v-model="password" type="password" placeholder="password"/>
    </div>
    <b-button v-on:click="logToFirebase()" variant="outline-primary">Login</b-button>
  </b-card>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import firebase from "firebase";

@Component
export default class Login extends Vue {

  private email = '';
  private password = '';

  public async logToFirebase() {
    await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
  }
}
</script>

<style scoped lang="scss">

.card {
  vertical-align: center;
}

input {
  max-width: 25%;
  margin-right: 10px;
}

.form {
  margin-bottom: 10px;
}

</style>