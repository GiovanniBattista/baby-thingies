<template>
  <f7-button outline @click="$emit('click')" class="tracker-button">{{ title }}</f7-button>
</template>

<script>
export default {
  name: "NeedsTrackerTrackingButton",
  
  props: [ "title" ],

  emits: [ "click" ],

  data() {
    return {};
  },

  methods: {},
};
</script>

<style lang="scss" scoped>

  $tracker-button-height: 100px;

  .tracker-button-container {
    width: $tracker-button-height;
  }
  .tracker-button {
    height: $tracker-button-height;
    width: $tracker-button-height;
    border-radius: calc($tracker-button-height/2);
    margin: 0 auto;
  }
</style>