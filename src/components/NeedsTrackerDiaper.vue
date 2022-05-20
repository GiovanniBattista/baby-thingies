<template>
  <div >
    <div class="tracker-button-container">
      <button class="tracker-button" @click="toggleShowButtons">Windel</button>
    </div>

    <div v-if="showButtons" class="tracker-button-margin">
      <f7-row>
        <f7-col>
          <f7-button outline @click="$emit('track:diaper', 'Pipi')">💦</f7-button>
        </f7-col>
        <f7-col>
          <f7-button outline @click="$emit('track:diaper', 'Kaka')">💩</f7-button>
        </f7-col>
        <f7-col>
          <f7-button outline @click="$emit('track:diaper', 'Pipi & Kaka')">Beides</f7-button>
        </f7-col>
      </f7-row>
    </div>
  </div>

</template>

<script>
export default {
  name: "NeedsTrackerDiaper",

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