<template>
  <f7-page name="tracking">
    <f7-navbar title="Tracking"></f7-navbar>

    <f7-block>
      <div class="row">
        <needs-tracker-tracking-button @click="recordType='Windel'" title="Windel"></needs-tracker-tracking-button>
      </div>
      <div class="row">
        <needs-tracker-tracking-button @click="recordType='Flasche'" title="Flasche"></needs-tracker-tracking-button>
        <needs-tracker-tracking-button @click="recordType='Schlaf'"  title="Schlaf"></needs-tracker-tracking-button>
      </div>
    </f7-block>

    <f7-block>
      <needs-tracker-diaper 
        @track:diaper="recordDiaper"
        :key="componentKey"
        v-if="recordType == 'Windel'"
      ></needs-tracker-diaper>
      <needs-tracker-feeding
        @track:feeding="recordFeeding"
        :key="componentKey"
        v-if="recordType == 'Flasche'"
        style="width: 120px; margin: 0 auto;"
      ></needs-tracker-feeding>
      <needs-tracker-sleep
        :key="componentKey"
        v-if="recordType == 'Schlaf'"
      ></needs-tracker-sleep>
    </f7-block>

    <f7-block>
      <f7-row>
        <f7-col>
          <f7-button outline @click="saveRecording" fill color="green" :disabled="!canSaveTrackRecord()">✅ Speichern</f7-button>
        </f7-col>
        <f7-col>
          <f7-button outline @click="revertScreen" :disabled="!canSaveTrackRecord()">🔙 Zurücksetzen</f7-button>
        </f7-col>
      </f7-row>
      
    </f7-block>

    <f7-block>
      <needs-tracker-history :history="history" @history:delete-all="deleteAllTrackingRecords"></needs-tracker-history>
    </f7-block>
  </f7-page>
</template>

<script>
import NeedsTrackerDiaper from '../components/NeedsTrackerDiaper.vue';
import NeedsTrackerFeeding from '../components/NeedsTrackerFeeding.vue';
import NeedsTrackerSleep from '../components/NeedsTrackerSleep.vue';
import NeedsTrackerHistory from '../components/NeedsTrackerHistory.vue';
import NeedsTrackerTrackingButton from '../components/NeedsTrackerTrackingButton.vue';

import { LocalTime } from '@js-joda/core';

import { useStore } from 'framework7-vue';
import store from '../js/store'

export default {
  name: "NeedsTrackingPage",
  
  components: {
    NeedsTrackerDiaper,
    NeedsTrackerFeeding,
    NeedsTrackerSleep,
    NeedsTrackerHistory,
    NeedsTrackerTrackingButton
},

  data() {
    return {
      recordType: null,
      recordContent: null,
      wasTracked: false,
      wasChanged: false,
      resetChildComponents: false,
      componentKey: 0,
      history: useStore('trackingHistory'),
    }
  },

  mounted() {
    store.dispatch('loadTrackingEvents')
  },

  methods: {
    recordDiaper( diaper ) {
      console.log("Diaper type: ", diaper)
      this.recordType = "Windel"
      this.recordContent = diaper
      this.wasTracked = true
    },
    recordFeeding( feedAmount ) {
      console.log("Feed amount: ", feedAmount)
      this.recordType = "Flasche"
      this.recordContent = feedAmount + "ml"
      this.wasTracked = true
    },
    recordSleepStart( time ) {
      console.log("Sleep started at: ", time)
      this.recordType = "Schlaf"
      this.recordContent = null
      this.wasTracked = true
    },
    recordSleepEnd( time ) {
      console.log("Sleep ended at: ", time)
      this.recordType = "Schlaf"
      this.recordContent = null
      this.wasTracked = true
    },
    saveRecording() {
      var record = { type: this.recordType, text: this.recordContent }
      record.from = LocalTime.now()

      if (this.recordType === 'Flasche' && !record.recordContent) {
        record.text = '100ml'
      }

      if (this.recordType === 'Schlaf') {
        store.dispatch('addOrUpdateSleepTrackingEvent', record)
      } else {
        store.dispatch('addTrackingEvent', record)
      }
      
      // clear all recordings
      this.revertScreen()
    },
    revertScreen() {
      this.recordType = null
      this.recordContent = null
      this.wasTracked = false
      this.componentKey += 1
    },
    deleteAllTrackingRecords() {
      store.dispatch('deleteAllTrackingRecords')
    },
    canSaveTrackRecord() {
      return (this.recordType && this.recordType !== 'Windel') || this.wasTracked;
    }
  },
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
}
</style>