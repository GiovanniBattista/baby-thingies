<template>
  <div class="timeline">

    <div class="timeline-item" v-for="(entry,index) in this.history" :key="index">
      <div class="timeline-item-date">{{ entry.from }}
        <span v-if="entry.to"><br>{{ entry.to}}</span>
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
};
</script>

<style lang="scss" scoped></style>