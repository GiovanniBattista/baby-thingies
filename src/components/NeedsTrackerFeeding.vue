<template>
  <div>
    <f7-stepper class="margin-right" large :value="100" :min="60" :max="200" :step="5" :autorepeat="true" @change="$emit('track:feeding', parseInt($event.target.value))"></f7-stepper>
  </div>
</template>

<script>
export default {
  name: "NeedsTrackerFeeding",

  components: {  },

  emits: ['track:feeding'],
  
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped></style>