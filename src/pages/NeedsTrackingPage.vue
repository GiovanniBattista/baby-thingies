<template>
  <f7-page name="tracking" ptr @ptr:refresh="loadRecords">
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

    <f7-block v-if="recordType">
      <div 
        class="tracking-container tracking-container-space-evenly">
      <f7-input type="time" v-model:value="from" class="time-input"></f7-input>
        <needs-tracker-diaper 
          @track:diaper="recordDiaper"
          :key="componentKey"
          v-if="recordType == 'Windel'"
          class="tracker-diaper"
        ></needs-tracker-diaper>
        <needs-tracker-feeding
          @track:feeding="recordFeeding"
          :key="componentKey"
          v-if="recordType == 'Flasche'"
          class="tracker-feeding"
        ></needs-tracker-feeding>
        <needs-tracker-sleep
          :key="componentKey"
          v-if="recordType == 'Schlaf'"
          class="tracker-sleep"
        ></needs-tracker-sleep>
      <f7-button outline @click="saveRecording" fill color="green" :disabled="!canSaveTrackRecord()">✅</f7-button>
      </div>
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

import TIME_FORMATTER from '../js/formatter'

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
      from: "",
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
    async loadRecords(done) {
      await store.dispatch('loadTrackingEvents')
      done()
    },
    changeRecordType( type ) {
      if (this.recordType === type) {
        this.revertScreen()
      } else {
      this.recordType = type
      this.from = LocalTime.now().format(TIME_FORMATTER)
      }
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

      if (this.recordType === 'Flasche' && !record.text) {
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
    },
    refreshPage() {
      this.revertScreen()
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

.time-input {
  width: 120px;
  height: var(--f7-stepper-height);
  border: var(--f7-stepper-border-width) solid var(--f7-theme-color);
  border-radius: var(--f7-stepper-border-radius);
  color: var(--f7-stepper-value-text-color, var(--f7-theme-color));
  font-size: var(--f7-stepper-value-font-size);
  font-weight: var(--f7-stepper-value-font-weight);
  text-align: center;
  padding-left: var(--f7-input-outline-padding-horizontal);
  padding-right: var(--f7-input-outline-padding-horizontal);
  box-sizing: border-box;
  display: inline-block;
}

.time-input input {
  height: 100% !important;
}

.tracking-container {
  display: flex;
  align-content: center;
  
}

.tracking-container-space-evenly {
  justify-content: space-evenly; 
}
.tracking-container-center {
  justify-content: center; 
}


</style>