<template>
  <b-modal id="modal-reject-suggestion" :title="$t('suggestions.reject.title')" :ok-title="$t('suggestions.reject.confirm')"
           :cancel-title="$t('suggestions.reject.cancel')" @ok="onModalOk()" @hide="onModalFerme()">
    {{ $t('suggestions.reject.explanation') }}
    <b-form-input
        v-model="reason"
        type="text"
        :placeholder="$t('suggestions.reject.reason_placeholder')"
    />
  </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SuggestionModel } from "@/models/suggestion.model";

@Component
export default class RejectSuggestion extends Vue {

  @Prop()
  public suggestion: SuggestionModel;

  public reason: string;
  private isOk = false;

  public onModalOk() {
    this.isOk = true;
    this.$emit('confirmReject', this.reason)
  }

  public onModalFerme() {
    if(!this.isOk) {
      this.$emit('cancelReject')
      this.isOk = false;
    }
  }
}
</script>

<style scoped>

</style>