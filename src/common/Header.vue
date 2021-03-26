<template>
  <header>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#" v-if="streamer">{{ streamer }}</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav> </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-button variant="outline-secondary">Log In</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Header extends Vue {
  @Prop()
  private streamer: string;
}
</script>

<style lang="scss">
.navbar {
  padding: 0 30px;
}
</style>