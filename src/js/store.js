
import { createStore } from 'framework7/lite';
import { db } from './db';

import { LocalTime, DateTimeFormatter } from '@js-joda/core';
const FORMATTER = DateTimeFormatter.ofPattern("HH:mm")

const store = createStore({
  state: {
    trackingHistory: [],
  },
  getters: {
    trackingHistory({ state }) {
      return state.trackingHistory;
    }
  },
  actions: {
    async loadTrackingEvents({ state }) {
      await db.open()
      var events = await db.tracking_history.toArray()
      for (var event of events) {
        event.from = LocalTime.parse(event.from)
      }
      state.trackingHistory = events
    },
    async addTrackingEvent({ state }, eventRecord) {
      var record = {...eventRecord}
      record.from = eventRecord.from.format(FORMATTER)
      if (record.to) {
        record.to = eventRecord.to.format(FORMATTER)
      }

      await db.open()
      await db.transaction('rw', db.tracking_history, function() {
        db.tracking_history.add(record)
      })
      state.trackingHistory = [...state.trackingHistory, eventRecord];
    },
    async deleteAllTrackingRecords({state}) {
      await db.open()
      await db.tracking_history.clear()
      state.trackingHistory = []
    }
  },
})
export default store;
