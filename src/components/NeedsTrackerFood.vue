<template>
  <div class="display-flex">
    <f7-stepper class="margin-right" large :value="100" :min="0" :step="5" :autorepeat="true" @change="$emit('track:food', parseInt($event.target.value))"></f7-stepper>
  </div>
</template>

<script>
export default {
  name: "NeedsTrackerFood",

  components: {  },

  emits: ['track:food'],
  
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped></style>