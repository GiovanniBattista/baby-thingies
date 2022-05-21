
import { createStore } from 'framework7/lite';
import { db } from './db';

import { LocalTime, DateTimeFormatter, Duration } from '@js-joda/core';
const FORMATTER = DateTimeFormatter.ofPattern("HH:mm")

const store = createStore({
  state: {
    trackingHistory: [],
    openSleepRecord: -1,
  },
  getters: {
    trackingHistory({ state }) {
      return state.trackingHistory;
    },
    openSleepRecord({ state }) {
      console.log('getopenSleepRecord', state.openSleepRecord)
      return state.openSleepRecord
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

      await db.open()
      await db.transaction('rw', db.tracking_history, function() {
        db.tracking_history.add(record)
      })
      state.trackingHistory = [...state.trackingHistory, eventRecord];
    },

    async updateSleepTrackingEvent({ state }, eventRecord) {     
      await db.open()
      var sleepRecord = await db.tracking_history.get( {id: eventRecord.id })
      var from = LocalTime.parse(sleepRecord.from)
      var to = eventRecord.to
      var duration = Duration.between(from, to)

      var text = "Dauer: " + duration.format(FORMATTER);

      var record = { to: eventRecord.to.format(FORMATTER), text }
      await db.tracking_history.update( eventRecord.id, record)
    },
    async findOpenSleepingRecord({state}) {
      await db.open()
      var foundSleepRecords = await db.tracking_history.where("type").equals("Schlaf").and(record => !record.to).first()
      console.log("Found sleeping records: ", foundSleepRecords)
      state.openSleepRecord = foundSleepRecords?.id
    },
    async deleteAllTrackingRecords({state}) {
      await db.open()
      await db.tracking_history.clear()
      state.trackingHistory = []
    }
  },
})
export default store;
