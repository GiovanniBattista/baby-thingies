<template>
  <div class="tracker-margin">
    <div class="tracker-button-container">
      <button class="tracker-button" @click="toggleShowButtons">Flasche</button>
    </div>

    <div v-if="showButtons" class="tracker-button-margin">
      <f7-stepper :value="100" :min="60" :max="200" :step="5" :autorepeat="true" @change="$emit('track:feeding', parseInt($event.target.value))"></f7-stepper>
    </div>
  </div>
</template>

<script>
export default {
  name: "NeedsTrackerFeeding",

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