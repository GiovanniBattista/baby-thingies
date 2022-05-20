<template>
  <div class="tracker-button-container">
    <button class="tracker-button" @click="$emit('click')">{{ title }}</button>
  </div>
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
    margin: 0 auto;
  }
  .tracker-button {
    display: inline-block;
    height: $tracker-button-height;
    width: $tracker-button-height;
    background-color: lightblue;
    border-radius: calc($tracker-button-height/2);
    text-align: center;
    line-height: $tracker-button-height;
  }
</style>