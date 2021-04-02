<template>
  <router-view />
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import SuggestionPage from "@/views/SuggestionPage.vue";
import HistoriquePage from "@/views/HistoriquePage.vue";

@Component({
  components: {
    SuggestionPage,
    HistoriquePage
  }
})
export default class Streamer extends Vue {

}
</script>

<style scoped>

</style>