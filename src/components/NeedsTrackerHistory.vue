<template>
  <div class="timeline">

    <div class="timeline-item" v-for="(entry) in this.history" :key="entry.id">
      <div class="timeline-item-time">{{ this.formatTime(entry.from) }}
        <span v-if="entry.to"><br>-<br></span>
        <span v-if="entry.to">{{ entry.to}}</span>
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

  <f7-block>
    <f7-button outline color="red" v-if="history.length" @click="$emit('history:deleteAll')">❌ Alles Löschen</f7-button>
  </f7-block>
</template>

<script>
import { DateTimeFormatter } from '@js-joda/core';

const FORMATTER = DateTimeFormatter.ofPattern("HH:mm")

export default {
  name: "NeedsTrackerHistory",

  emits: [ 'history:deleteAll' ],
  
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