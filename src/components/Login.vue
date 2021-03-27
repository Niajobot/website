<template>
  <b-modal id="modal-login" hide-footer>
    <template #modal-title> Connexion </template>
    <div class=".align-middle">
      <div class="form">
        <b-row>
          <b-col sm="12" class="mb-2"
            ><b-form-input v-model="email" type="email" placeholder="email" />
          </b-col>
          <b-col sm="12">
            <b-form-input
              v-model="password"
              type="password"
              placeholder="password"
            />
          </b-col>
        </b-row>
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <b-button
        class="mr-2"
        variant="outline-danger"
        @click="$bvModal.hide('modal-login')"
        >Cancel</b-button
      >
      <b-button v-on:click="logToFirebase()" variant="secondary"
        >Login</b-button
      >
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebase from "firebase";

@Component
export default class Login extends Vue {
  private email = "";
  private password = "";

  public async logToFirebase() {
    await firebase.auth().signInWithEmailAndPassword(this.email, this.password);

    this.$bvModal.hide('modal-login');
  }
}
</script>

<style scoped lang="scss">
.card {
  vertical-align: center;
}

input {
  margin-right: 10px;
}

.form {
  margin-bottom: 10px;
}
</style>