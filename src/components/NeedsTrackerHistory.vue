<template>
  <div class="timeline timeline-sides">

    <div class="timeline-item" :class="this.determineItemSide(entry.date)" v-for="(entry,index) in this.preparedHistoryItems" :key="index">
      <div class="timeline-item-date long">{{ entry.date }}</div>
      <div class="timeline-item-divider"></div>
      <div class="timeline-item-content">
        <div class="timeline-item-inner">
          <div class="timeline-item-time">{{ entry.from }}
            <span v-if="entry.to"> - {{ entry.to}}</span></div>
          <div class="timeline-item-text">{{ entry.type }}: {{ entry.text }}</div>
        </div>
      </div>
    </div>

  </div>

  <f7-block>
    <f7-button outline color="red" v-if="history.length" @click="$emit('history:deleteAll')">❌ Alles Löschen</f7-button>
  </f7-block>
</template>

<script>
import { Locale } from '@js-joda/locale_de'
import { LocalDateTime, DateTimeFormatter } from '@js-joda/core';

let lastDate = null;
let lastItemCssClass = 'timeline-item-right';

export default {
  name: "NeedsTrackerHistory",

  emits: [ 'history:deleteAll' ],

  data() {
    return {
      
    };
  },

  props: {
    history: {
      type: Array,
      required: true,
    }
  },

  computed: {
    preparedHistoryItems() {
      const dateFormatter = DateTimeFormatter.ofPattern('eeee, dd. MMM').withLocale(Locale.GERMAN);
      const timeFormatter = DateTimeFormatter.ofPattern('HH:mm');

      // sort the history in reverse order, meaning that the latest entry is on top
      const sortedHistory = [...this.history];
      sortedHistory.forEach(record => record.dateTime = LocalDateTime.parse(record.from))
      sortedHistory.sort((record1, record2) => record2.dateTime.compareTo(record1.dateTime))

      const history = new Array()
      let lastDate;
      for (const item of sortedHistory) {
        let record = { ...item }
        const dateTime = record.dateTime;
        const date = dateTime.toLocalDate();
        let formattedDate = date.format(dateFormatter)
        if (lastDate != formattedDate) {
          lastDate = formattedDate
          record.date = formattedDate
        }

        record.from = dateTime.toLocalTime().format(timeFormatter)

        if (item.to) {
          record.to = LocalDateTime.parse(item.to).toLocalTime().format(timeFormatter);
        }
        history.push(record)
      }

      return history
    }
  },

  methods: {
    determineItemSide( date ) {
      if (date && lastDate != date) {
        lastDate = date

        if (lastItemCssClass === 'timeline-item-right') {
          lastItemCssClass = 'timeline-item-left'
        } else {
          lastItemCssClass = 'timeline-item-right'
        }
      }
      return lastItemCssClass
    }
  }
};
</script>

<style lang="scss" scoped>
.timeline-item-date.long {
  width: 75px;
  font-size: 1rem;
  font-weight: 500;
}
.timeline-item.timeline-item-right {
  margin-left: calc(50% - (var(--f7-timeline-divider-margin-horizontal) * 2 + 10px) / 2 - 100px);
}
.dark .timeline-item-inner {
  background-color: #424242;
}
</style>