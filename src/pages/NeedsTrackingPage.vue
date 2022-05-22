<template>
  <f7-page name="tracking">
    <f7-navbar title="Tracking"></f7-navbar>

    <f7-block>
      <div class="row">
        <needs-tracker-tracking-button @click="changeRecordType('Windel')" title="Windel"></needs-tracker-tracking-button>
      </div>
      <div class="row">
        <needs-tracker-tracking-button @click="changeRecordType('Flasche')" title="Flasche"></needs-tracker-tracking-button>
        <needs-tracker-tracking-button @click="changeRecordType('Schlaf')"  title="Schlaf"></needs-tracker-tracking-button>
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

    <f7-block v-if="recordType">
      <f7-input type="time" style="margin: 0 auto;" :value="from"></f7-input>
    </f7-block>

    <f7-block>
      <f7-row>
        <f7-col>
          <f7-button outline @click="saveRecording" fill color="green" :disabled="!canSaveTrackRecord()">✅ Speichern</f7-button>
        </f7-col>
        <f7-col>
          <f7-button outline @click="revertScreen" :disabled="!canRevertTrackRecord()">🔙 Zurücksetzen</f7-button>
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
      from: null,
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
    changeRecordType( type ) {
      this.recordType = type
      this.from = LocalTime.now()
    },
    recordDiaper( diaper ) {
      console.log("Diaper type: ", diaper)
      this.recordContent = diaper
      this.wasTracked = true
    },
    recordFeeding( feedAmount ) {
      console.log("Feed amount: ", feedAmount)
      this.recordContent = feedAmount + "ml"
      this.wasTracked = true
    },
    saveRecording() {
      var record = { type: this.recordType, text: this.recordContent, from: this.from }

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
    canRevertTrackRecord() {
      return this.recordType
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