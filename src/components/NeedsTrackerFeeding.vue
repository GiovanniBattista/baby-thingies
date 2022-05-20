<template>
  <div class="tracker-margin">
    <needs-tracker-tracking-button @click="toggleShowButtons" title="Flasche"></needs-tracker-tracking-button>

    <div v-if="showButtons" class="tracker-button-margin">
      <f7-stepper :value="100" :min="60" :max="200" :step="5" :autorepeat="true" @change="$emit('track:feeding', parseInt($event.target.value))"></f7-stepper>
    </div>
  </div>
</template>

<script>
import NeedsTrackerTrackingButton from './NeedsTrackerTrackingButton.vue';

export default {
  name: "NeedsTrackerFeeding",

  components: { NeedsTrackerTrackingButton },

  emits: ['track:feeding'],
  
  data() {
    return {
      showButtons: false,
    };
  },
  methods: {
    toggleShowButtons() {
      this.showButtons = !this.showButtons;
    }
  },
};
</script>

<style lang="scss" scoped></style>