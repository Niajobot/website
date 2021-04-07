<template>
  <div>
    <h2>{{ $t("home.features.title") }}</h2>
    <b-card-group class="row" deck>
      <b-card class="col-12 col-md-3">
        <b-card-img
          :src="require('../../../assets/suggestion-icon.svg')"
          top
        ></b-card-img>
        <h3>{{ $t("home.features.suggestions_title") }}</h3>
        <b-card-text
          v-html="$t('home.features.suggestions_text')"
        ></b-card-text>
      </b-card>

      <b-card class="col-12 col-md-3 come">
        <b-badge variant="success">{{$t('home.features.come')}}</b-badge>
        <b-card-img
          :src="require('../../../assets/plannification-icon.svg')"
          top
        ></b-card-img>
        <h3>{{ $t("home.features.planification_title") }}</h3>
        <b-card-text
          v-html="$t('home.features.planification_text')"
        ></b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Features extends Vue {}
</script>

<style scoped lang="scss">
.card {
  &.come {
    background-color: var(--light);
  }
  .badge {
      align-self: flex-end;
  }
  .card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 0;
    padding-right: 0;

    h3 {
      align-self: start;
    }
    .card-img-top {
      max-width: 50%;
      height: 150px;
    }
  }
}
</style>