<template>
  <div class="timeline">

    <div class="timeline-item" v-for="(entry,index) in this.history" :key="index">
      <div class="timeline-item-time">{{ this.formatTime(entry.from) }}
        <span v-if="entry.to"> - {{ entry.to}}</span>
      </div>
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
import { DateTimeFormatter } from '@js-joda/core';

const FORMATTER = DateTimeFormatter.ofPattern("HH:mm")

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
      return time.format(FORMATTER)
    }
  },
};
</script>

<style lang="scss" scoped></style>