
<template>
  <b-jumbotron
    header="BootstrapVue"
    lead="Bootstrap v4 Components for Vue.js 2"
  >
    <template #header>{{ $t("home.niajobot.welcome_title") }}</template>

    <template #lead>
      {{ $t("home.niajobot.description") }}
    </template>
    <b-button variant="secondary" v-scroll-to="'#features'">{{ $t("home.niajobot.need_more_informations") }}</b-button>
  </b-jumbotron>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Welcome extends Vue {
}
</script>

<style scoped>
</style>