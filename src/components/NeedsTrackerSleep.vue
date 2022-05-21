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

  props: [ "openSleepRecordId" ],

  emits: ['track:sleepStart', 'track:sleepEnd'],
  
  data() {
    console.log("openSleepRecordId: ", this.openSleepRecordId)
    return {
      showButton: false,
      timerStarted: this.openSleepRecordId ? true : false,
    };
  },
  
  methods: {
    toggleShowButtons() {
      this.showButton = !this.showButton
    },
    toggleTimerStarted() {
      this.timerStarted = !this.timerStarted
      if (this.timerStarted) {
        this.$emit('track:sleepStart')
      } else {
        this.$emit('track:sleepEnd', this.openSleepRecordId);
      }
    }
  },
};
</script>

<style lang="scss" scoped></style>