
import { createStore } from 'framework7/lite';
import { db } from './db';
import TIME_FORMATTER from './formatter'

import { LocalTime, Duration } from '@js-joda/core';

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
      //record.from = eventRecord.from.format(TIME_FORMATTER)

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
          var to = eventRecord.from; //eventRecord.from.format(TIME_FORMATTER)
          await db.tracking_history.update(foundSleepRecords.id, { to })
        } else {
          var record = {...eventRecord}
          //record.from = eventRecord.from.format(TIME_FORMATTER)
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
  convertFromToLocalTime(events)
  state.trackingHistory = sortTrackingEvents(events)
}

function convertFromToLocalTime( events ) {
  for (var event of events) {
    //event.from = LocalTime.parse(event.from)

    if (event.type === "Schlaf") {
      var from = LocalTime.parse(event.from)
      var to = event.to ? LocalTime.parse(event.to) : LocalTime.now()

      var duration = Duration.between(from, to)
      var durationText = new Date(duration.seconds() * 1000).toISOString().slice(11, 16)
      var split = durationText.split(':')

      event.text = "Dauer: "
      if (parseInt(split[0]) > 0) {
        event.text += split[0] + "h "
      }
      event.text += split[1] + "min"
    }
  }
}

function sortTrackingEvents( trackingEvents ) {
  return trackingEvents.sort((e1, e2) => {
    var from1 = LocalTime.parse(e1.from)
    var from2 = LocalTime.parse(e2.from)

    return from1.compareTo(from2)
  })
}

export default store;
