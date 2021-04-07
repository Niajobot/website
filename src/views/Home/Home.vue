<template>
  <div>
    <Welcome />
    <StreamersList />
    <hr class="my-4" />
    <Features id="features" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Welcome from "./components/Welcome.vue";
import StreamersList from "./components/StreamersList.vue";
import Features from "./components/Features.vue";

@Component({
  components: {
    Welcome,
    StreamersList,
    Features,
  },
})
export default class HomePage extends Vue {
}
</script>

<style scoped>
</style>