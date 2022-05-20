<template>
  <div class="timeline">

    <div class="timeline-item" v-for="(entry,index) in this.history" :key="index">
      <div class="timeline-item-time" v-if="entry.instant">{{ this.formatTime(entry.instant) }}</div>
      <div class="timeline-item-time" v-else></div>
      <div class="timeline-item-divider"></div>
      <div class="timeline-item-content">
        <div class="timeline-item-inner">
          <div class="timeline-item-title">{{ entry.type }}</div>
          <div class="timeline-item-text">{{ entry.text }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "NeedsTrackerHistory",
  
  data() {
    return {};
  },

  props: {
    history: {
      type: Array,
      required: true,
    }
  },

  methods: {
    formatTime( time ) {
      return `${time.getHours()}:${time.getMinutes()}`
    }
  },
};
</script>

<style lang="scss" scoped></style>