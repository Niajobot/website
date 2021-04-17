<template>
  <header>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <router-link :to="{ name: 'Home' }"
        ><b-navbar-brand>{{ $t('header.brand') }}</b-navbar-brand></router-link
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          
          <b-nav-item v-for="(streamer, index) in streamers" :key="index" :to="{ name: 'HomeStreamer', params: {streamer: streamer}}">{{ streamer }}</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item disabled>Beta</b-nav-item>
          <div v-if="userEmail == null" class="d-flex">
            <div>
              <b-button v-b-modal.modal-login variant="outline-light">
                {{ $t('header.login') }}
              </b-button>

              <Login/>
            </div>
          </div>
          <div v-else>
            <b-dropdown variant="outline-light" right>
              <template #button-content>
                {{ userEmail }}
              </template>
              <b-dropdown-item v-b-modal.modal-modification-password>{{ $t('header.modification_password') }}</b-dropdown-item>
              <b-dropdown-item @click="logoutToFirebase">{{ $t('header.logout') }}</b-dropdown-item>
            </b-dropdown>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <ModificationPassword/>
  </header>
</template>

<script lang="ts">
//VUE
import { Component, Vue } from "vue-property-decorator";

//external
import firebase from "firebase";

//internal
import Login from "@/components/Login.vue";
import ModificationPassword from "@/components/ModificationPassword.vue";

@Component({
  components: {ModificationPassword, Login},
})
export default class Header extends Vue {
  public userEmail: string | null = null;

public streamers: string[] = [];

  public async mounted() {
    this.streamers = (await firebase.database().ref('/streamers').get()).val();
    firebase.auth().onAuthStateChanged((user) => {
      this.userEmail = user != null ? user.email : null;
    });
  }

  public async logoutToFirebase() { 
    await firebase.auth().signOut();
  }
}
</script>

<style lang="scss">
.navbar {
  padding: 0 30px;
}
</style>