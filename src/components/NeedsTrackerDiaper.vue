<template>
  <div>
    <f7-segmented class="margin-right">
      <f7-button large outline :active="activeButton === 'P'" @click="onButtonActivated('P', 'Pipi')">💦</f7-button>
      <f7-button large outline :active="activeButton === 'K'" @click="onButtonActivated('K', 'Kaka')">💩</f7-button>
      <f7-button large outline :active="activeButton === 'PK'" @click="onButtonActivated('PK', 'Pipi & Kaka')">💦💩</f7-button>
    </f7-segmented>
  </div>
</template>

<script>
export default {
  name: "NeedsTrackerDiaper",

  components: {  },

  emits: ['track:diaper'],

  data() {
    return {
      activeButton: 'P',
    }
  },

  methods: {
    onButtonActivated( activeButton, emitterText ) {
      this.activeButton = activeButton
      this.$emit('track:diaper', emitterText)
    }
  },
};
</script>

<style lang="scss" scoped>

</style>