<template>
  <b-modal id="modal-modification-password" :title="$t('modification_password.title')" @show="init()" hide-footer>
    <b-form @submit="validateBeforeSubmit" @reset="hideModal">
      <div class=".align-middle">
        <div class="form">
          <b-form-group :label="$t('modification_password.new_password')">
            <b-form-input
                v-if="!showPassword"
                v-model="newPassword"
                type="password"
                :placeholder="$t('modification_password.new_password')"
            />
            <b-form-input
                v-else
                v-model="newPassword"
                type="text"
            />
          </b-form-group>

          <b-form-group :label="$t('modification_password.confirm_password')">
            <b-form-input
                v-if="!showPassword"
                v-model="confirmPassword"
                type="password"
                :placeholder="$t('modification_password.confirm_password')"
            />
            <b-form-input
                v-else
                v-model="confirmPassword"
                type="text"
            />
          </b-form-group>
          <b-form-checkbox id="showPassword" v-model="showPassword" name="showPassword">
            {{$t('modification_password.show_password')}}
          </b-form-checkbox>
          <ul class="errors">
            <li v-for="error in errors" :key="error">{{$t(`modification_password.error.${error}`)}}</li>
          </ul>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <b-button class="mr-2" variant="outline-danger" type="reset">{{
          $t("login.cancel")
        }}</b-button>
        <b-button variant="secondary" type="submit">{{
          $t("modification_password.validate")
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
  private newPassword = "";
  private confirmPassword = "";

  public showPassword = false;
  public errors:string[] = [];

  public init() {
    this.newPassword = '';
    this.confirmPassword = '';
    this.showPassword = false;
    this.errors = [];
  }

  public hideModal(event: any) {
    event.preventDefault();
    this.$bvModal.hide("modal-modification-password");
  }

  public validateBeforeSubmit(event: any) {
    event.preventDefault();
    this.errors = [];    
    if(this.newPassword && this.confirmPassword && this.newPassword === this.confirmPassword) {
      this.modification();
      return true;
    }
    if(!this.newPassword) {
      this.errors.push('new_password_required');
    }
    if(!this.confirmPassword) {
      this.errors.push('confirm_password_required');
    }

    this.errors.push('confirm_password_different');
  }

  private async modification() {
    await firebase.auth().currentUser?.updatePassword(this.newPassword).then(() => {
      this.$bvModal.hide("modal-modification-password");
    }).catch((error) => {
      switch (error.code) {
        case "auth/weak-password":
          this.errors.push('auth/weak-password');
          break;
        default:
          this.errors.push('generic');
          break;
      }
    });
  }
}
</script>

<style scoped lang="scss">
@import "../styles/site.scss";
.form {
  margin-bottom: 10px;
  .errors {
    color: $red;
    font-size:0.8em;
    list-style: none;
    padding-left: 0;
  }
}
</style>