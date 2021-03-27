<template>
  <header>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#" v-if="streamer">{{ streamer }}</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav> </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <div v-if="userEmail == null" class="d-flex">
            <div>
              <b-button v-b-modal.modal-login variant="outline-secondary">
                Log In
              </b-button>

              <Login />
            </div>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script lang="ts">
//VUE
import { Component, Prop, Vue } from "vue-property-decorator";

//external
import firebase from "firebase";

//internal
import Login from "@/components/Login.vue";
@Component({
  components: { Login },
})
export default class Header extends Vue {
  @Prop()
  public streamer: string;

  public userEmail: string | null = null;

  public mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.userEmail = user != null ? user.email : null;
    });
  }
}
</script>

<style lang="scss">
.navbar {
  padding: 0 30px;
}
</style>