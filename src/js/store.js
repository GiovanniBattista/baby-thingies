
import { createStore } from 'framework7/lite';
import { db } from './db';
import { formatDuration } from './formatter'

import { LocalDateTime, Duration } from '@js-joda/core';

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
      internalLoadTrackingEvents(state)
    },
    async addTrackingEvent({ state }, eventRecord) {
      var record = {...eventRecord}

      await db.open()
      await db.transaction('rw', db.tracking_history, function() {
        db.tracking_history.add(record)
      })
      state.trackingHistory = sortTrackingEvents([...state.trackingHistory, eventRecord]);
    },
    async addOrUpdateSleepTrackingEvent({state}, eventRecord){
      await db.open()
      // first, find any open sleep tracking records
      await db.transaction('rw', db.tracking_history, async function() {
        var foundSleepRecords = await db.tracking_history.where("type").equals("Schlaf").and(record => !record.to).first()
        if (foundSleepRecords) {
          debugger;
          var to = eventRecord.from;
          await db.tracking_history.update(foundSleepRecords.id, { to })
        } else {
          var record = {...eventRecord}
          
          await db.tracking_history.add(record)
        }

        internalLoadTrackingEvents(state)
      })
    },
    async deleteAllTrackingRecords({state}) {
      await db.open()
      await db.tracking_history.clear()
      state.trackingHistory = []
    }
  },
})

async function internalLoadTrackingEvents( state ) {
  var events = await db.tracking_history.toArray()
  convertFromToLocalDateTime(events)
  state.trackingHistory = sortTrackingEvents(events)
}

function convertFromToLocalDateTime( events ) {
  for (var event of events) {
    //event.from = LocalDateTime.parse(event.from)

    if (event.type === "Schlaf") {
      var from = LocalDateTime.parse(event.from)
      var to = event.to ? LocalDateTime.parse(event.to) : LocalDateTime.now()

      var duration = Duration.between(from, to)
      var text
      if (event.to) {
        text = ""
      } else {
        text = "seit "
      }
      event.text = text + formatDuration(duration)
    }
  }
}

function sortTrackingEvents( trackingEvents ) {
  return trackingEvents.sort((e1, e2) => {
    var from1 = LocalDateTime.parse(e1.from)
    var from2 = LocalDateTime.parse(e2.from)

    return from1.compareTo(from2)
  })
}

export default store;
