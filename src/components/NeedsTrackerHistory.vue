<template>
  <div class="timeline timeline-sides">

    <div class="timeline-item" :class="this.determineItemSide(entry.date)" v-for="(entry,index) in this.preparedHistoryItems" :key="index">
      <div class="timeline-item-date">{{ entry.date }}</div>
      <div class="timeline-item-divider"></div>
      <div class="timeline-item-content">
        <div class="timeline-item-inner">
          <div class="timeline-item-time">{{ entry.from }}
            <span v-if="entry.to"> - {{ entry.to}}</span></div>
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
import { LocalDateTime, DateTimeFormatter, LocalTime, Duration, LocalDate } from '@js-joda/core';

export default {
  name: "NeedsTrackerHistory",

  emits: [ 'history:deleteAll' ],
  
  data() {
    return {
      lastDate: null,
      lastItemCssClass: 'timeline-item-right',
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
      const dateFormatter = DateTimeFormatter.ofPattern('dd.MM');
      const timeFormatter = DateTimeFormatter.ofPattern('HH:mm');

      const history = new Array()
      let lastDate;
      for (const item of this.history) {
        let record = { ...item }
        const dateTime = LocalDateTime.parse(item.from);
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
      if (date && this.lastDate != date) {
        this.lastDate = date

        if (this.lastItemCssClass === 'timeline-item-right') {
          this.lastItemCssClass = 'timeline-item-left'
        } else {
          this.lastItemCssClass = 'timeline-item-right'
        }
      }
      return this.lastItemCssClass
    }
  }
};
</script>

<style lang="scss" scoped></style>