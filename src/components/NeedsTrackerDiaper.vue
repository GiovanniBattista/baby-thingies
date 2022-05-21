<template>
  <div>
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
</template>

<script>
export default {
  name: "NeedsTrackerDiaper",

  components: {  },

  emits: ['track:diaper'],

  data() {
    return {
    }
  },

  methods: {
  },
};
</script>

<style lang="scss" scoped>

</style>