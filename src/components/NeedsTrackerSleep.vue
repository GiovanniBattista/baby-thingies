<template>
  <div class="tracker-margin">
    <needs-tracker-tracking-button @click="toggleShowButtons" title="Schlaf"></needs-tracker-tracking-button>

    <div v-if="showButton" class="tracker-button-margin">
      <f7-button outline v-if="timerStarted" @click="toggleTimerStarted">Stoppen</f7-button>
      <f7-button outline v-else @click="toggleTimerStarted">Starten</f7-button>
    </div>
  </div>
</template>

<script>
import NeedsTrackerTrackingButton from './NeedsTrackerTrackingButton.vue';

export default {
  name: "NeedsTrackerSleep",

  components: { NeedsTrackerTrackingButton },
  emits: ['track:sleepStart', 'track:sleepEnd'],
  
  data() {
    return {
      showButton: false,
      timerStarted: false,
    };
  },
  
  methods: {
    toggleShowButtons() {
      this.showButton = !this.showButton
    },
    toggleTimerStarted() {
      this.timerStarted = !this.timerStarted
      if (this.timerStarted) {
        this.$emit('track:sleepStart', new Date())
      } else {
        this.$emit('track:sleepEnd', new Date());
      }
    }
  },
};
</script>

<style lang="scss" scoped></style>