<template>
  <header>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <router-link :to="{ name: 'Home' }"
        ><b-navbar-brand>{{ $t('header.brand') }}</b-navbar-brand></router-link
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          
          <b-nav-item v-for="(streamer, index) in streamers" :key="index" :to="{ name: 'Suggestions', params: {streamer: streamer}}">{{ streamer }}</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <div v-if="userEmail == null" class="d-flex">
            <div>
              <b-button v-b-modal.modal-login variant="outline-secondary">
                {{ $t('header.login') }}
              </b-button>

              <Login/>
            </div>
          </div>
          <div v-else>
            <b-dropdown variant="outline-secondary">
              <template #button-content>
                {{ userEmail }}
              </template>
              <b-dropdown-item @click="logoutToFirebase">{{ $t('header.logout') }}</b-dropdown-item>
            </b-dropdown>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script lang="ts">
//VUE
import { Component, Vue } from "vue-property-decorator";

//external
import firebase from "firebase";

//internal
import Login from "@/components/Login.vue";

@Component({
  components: {Login},
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