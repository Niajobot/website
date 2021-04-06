<template>
  <b-modal id="modal-login" hide-footer>
    <template #modal-title> {{ $t("login.title") }} </template>
    <b-alert :show="showAlert" variant="danger">
      <div v-if="errorMessage">
        {{ $t(`login.errror.${errorMessage}`) }}
      </div>
    </b-alert>
    <b-form @submit="logToFirebase" @reset="onReset">
      <div class=".align-middle">
        <div class="form">
          <b-row>
            <b-col sm="12" class="mb-2"
              ><b-form-input
                v-model="email"
                type="email"
                placeholder="email"
                name="email"
              />
            </b-col>
            <b-col sm="12">
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
                    @click="switchShowPassword"
                    ><b-icon-eye-fill v-if="!showPassword"></b-icon-eye-fill
                    ><b-icon-eye-slash-fill v-else></b-icon-eye-slash-fill
                  ></b-button>
                </b-input-group-append>
              </b-input-group>
            </b-col>
          </b-row>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <b-button class="mr-2" variant="outline-danger" type="reset">{{
          $t("login.cancel")
        }}</b-button>
        <b-button variant="secondary" type="submit">{{
          $t("login.login")
        }}</b-button>
      </div>
    </b-form>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebase from "firebase";

@Component
export default class Login extends Vue {
  private email = "";
  private password = "";
  public errorMessage = "";
  public showAlert = false;
  public showPassword = false;

  public async logToFirebase(event: any) {
    event.preventDefault();
    await firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.$bvModal.hide("modal-login");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
          case "auth/user-not-found":
          case "auth/wrong-password":
            this.errorMessage = "email_or_password_invalid";
            break;
          case "auth/user-disabled":
            this.errorMessage = "user_disabled";
            break;
          default:
            this.errorMessage = "generic";
            break;
        }
        this.showAlert = true;
      });
  }

  public onReset(event: any) {
    event.preventDefault();
    this.$bvModal.hide("modal-login");
    this.email = "";
    this.password = "";
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