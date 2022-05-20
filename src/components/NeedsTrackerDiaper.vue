<template>
  <div>
    <needs-tracker-tracking-button @click="toggleShowButtons" title="Windel"></needs-tracker-tracking-button>

    <div v-if="showButtons" class="tracker-button-margin">
      <f7-row>
        <f7-col>
          <f7-button outline @click="$emit('track:diaper', 'Pipi')">💦</f7-button>
        </f7-col>
        <f7-col>
          <f7-button outline @click="$emit('track:diaper', 'Kaka')">💩</f7-button>
        </f7-col>
        <f7-col>
          <f7-button outline @click="$emit('track:diaper', 'Pipi & Kaka')">💦💩</f7-button>
        </f7-col>
      </f7-row>
    </div>
  </div>

</template>

<script>
import NeedsTrackerTrackingButton from './NeedsTrackerTrackingButton.vue';

export default {
  name: "NeedsTrackerDiaper",

  components: { NeedsTrackerTrackingButton },

  emits: ['track:diaper'],

  data() {
    return {
      showButtons: false,
    }
  },

  computed: {
  },

  methods: {
    toggleShowButtons() {
      this.showButtons = !this.showButtons;
    }
  },
};
</script>

<style lang="scss" scoped>

</style>