<template>
  <div class="tracker-margin">
    <div class="tracker-button-container">
      <button class="tracker-button" @click="toggleShowButtons">Schlaf</button>
    </div>

    <div v-if="showButton" class="tracker-button-margin">
      <f7-button outline v-if="timerStarted" @click="toggleTimerStarted">Stoppen</f7-button>
      <f7-button outline v-else @click="toggleTimerStarted">Starten</f7-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NeedsTrackerSleep",

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