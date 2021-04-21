<template>
  <div>
    <h2>{{ $t("home.streamers.list_streamers") }}</h2>

    <b-card-group class="row" deck>
      <b-card
        class="col-md-2"
        v-for="(streamer, index) in streamers"
        :key="index"
        :class="streamer"
      >
        <h3>{{ streamer }}</h3>
        <div class="image" />
        <router-link
          :to="{ name: 'Suggestions', params: { streamer: streamer } }"
        >
          {{ $t("home.streamers.go_to_streamer") }}
        </router-link>
      </b-card>
    </b-card-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebase from "firebase";

@Component({})
export default class StreamersList extends Vue {
  public streamers: string[] = [];

  async mounted() {
    this.streamers = (await firebase.database().ref("/streamers").get()).val();
  }
}
</script>

<style scoped lang="scss">
.card {
  color: var(--light);
  &.biajo {
    background-color: var(--purple);
    .image {
      background: url("../../../assets/biajo.png");
    }
  }
  &.nicroz38 {
    background-color: var(--marron);
    .image {
      background: url("../../../assets/nicroz38.jpg");
    }
  }
  &.vega_nosaure {
    background-color: var(--green);
    .image {
      background: url("../../../assets/vega_nosaure.png");
    }
  }
  .card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    a {
      color: var(--light);
      text-decoration: underline;
      margin-top: 2em;
    }

    .image {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background-size: 70px !important;
    }
  }
}
</style>