<template>
  <b-modal id="modal-modification-password" :title="$t('modification_password.title')" @show="init()" @ok="modification()">
    <b-input-group>
      <b-form-input
          v-if="!showPassword"
          v-model="password"
          type="password"
          placeholder="password"
      />
      <b-form-input
          v-else
          v-model="password"
          type="text"
          placeholder="password"
      />
      <b-input-group-append>
        <b-button
            variant="outline-info"
            @click="switchShowPassword()"
        ><b-icon-eye-fill v-if="!showPassword"></b-icon-eye-fill
        ><b-icon-eye-slash-fill v-else></b-icon-eye-slash-fill
        ></b-button>
      </b-input-group-append>
    </b-input-group>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebase from "firebase";

@Component
export default class Login extends Vue {
  private password = "";
  public showPassword = false;

  public init() {
    this.password = '';
    this.showPassword = false;
  }

  public async modification() {
    await firebase.auth().currentUser?.updatePassword(this.password);
  }

  public switchShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
</script>

<style scoped lang="scss">
.form {
  margin-bottom: 10px;
}
</style>