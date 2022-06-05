<template>
  <f7-page name="tracking" ptr @ptr:refresh="loadRecords">
    <f7-navbar title="Tracking">
      <f7-nav-right>
        <f7-link icon-f7="info_circle" popup-open=".demo-popup-swipe-handler" ></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-block>
      <f7-row>
        <f7-col>
          <div>
            <needs-tracker-tracking-button :active="recordType === 'Windel'" @click="changeRecordType('Windel')" title="Windel"></needs-tracker-tracking-button>
            <div class="latest-event" v-if="latestDiaper">{{ latestDiaper }}</div>
          </div>
        </f7-col>
      </f7-row>
      <f7-row>
        <f7-col>
          <needs-tracker-tracking-button :active="recordType === 'Flasche'" @click="changeRecordType('Flasche')" title="Flasche"></needs-tracker-tracking-button>
          <div class="latest-event" v-if="latestFeed">{{ latestFeed }}</div>
        </f7-col>
        <f7-col>
          <needs-tracker-tracking-button :active="recordType === 'Schlaf'" @click="changeRecordType('Schlaf')"  title="Schlaf"></needs-tracker-tracking-button>
          <div class="latest-event" v-if="latestSleep">{{ latestSleep }}</div>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-block v-if="recordType">
      <div 
        class="tracking-container tracking-container-center">
        <f7-input type="time" v-model:value="from" class="time-input time-input-large margin-right" inputStyle="height: 100%;line-height:var(--f7-stepper-large-height);" large></f7-input>
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
      <f7-button outline @click="saveRecording" large fill color="green" :disabled="!recordType">✅</f7-button>
      </div>
    </f7-block>

    <f7-block>
      <needs-tracker-history :history="history" @history:delete-all="deleteAllTrackingRecords"></needs-tracker-history>
    </f7-block>
  </f7-page>

  <f7-popup class="demo-popup-swipe-handler" swipe-to-close>
    <f7-page>
      <f7-navbar title="Über">
        <f7-nav-right>
          <f7-link popup-close>Close</f7-link>
        </f7-nav-right>
      </f7-navbar>

      <f7-block-title>Verwendete Icons</f7-block-title>
      <f7-block strong>
        <a href="https://www.flaticon.com/de/kostenlose-icons/baby" title="baby Icons">Baby Icons erstellt von wanicon - Flaticon</a><br>
        <a href="https://www.flaticon.com/free-icons/baby-diaper" title="baby diaper icons">Baby diaper icons created by Freepik - Flaticon</a><br>
        <a href="https://www.flaticon.com/free-icons/baby-bottle" title="baby bottle icons">Baby bottle icons created by Freepik - Flaticon</a><br>
      </f7-block>

      <f7-block-title>Credits</f7-block-title>
      <f7-block strong>
        © GiovanniBattista <br>
        <a href="https://github.com/GiovanniBattista/baby-thingies">Github</a>
      </f7-block>
    </f7-page>
  </f7-popup>
</template>

<script>
import NeedsTrackerDiaper from '../components/NeedsTrackerDiaper.vue';
import NeedsTrackerFeeding from '../components/NeedsTrackerFeeding.vue';
import NeedsTrackerSleep from '../components/NeedsTrackerSleep.vue';
import NeedsTrackerHistory from '../components/NeedsTrackerHistory.vue';
import NeedsTrackerTrackingButton from '../components/NeedsTrackerTrackingButton.vue';

import { Duration, LocalTime } from '@js-joda/core';

import { useStore } from 'framework7-vue';
import store from '../js/store'

import { formatDuration, TIME_FORMATTER } from '../js/formatter'
import NeedsTrackerLatestTracks from '../components/NeedsTrackerLatestTracks.vue';

export default {
  name: "NeedsTrackingPage",
  
  components: {
    NeedsTrackerDiaper,
    NeedsTrackerFeeding,
    NeedsTrackerSleep,
    NeedsTrackerHistory,
    NeedsTrackerTrackingButton,
    NeedsTrackerLatestTracks
},

  data() {
    return {
      recordType: null,
      recordContent: null,
      from: "",
      wasChanged: false,
      resetChildComponents: false,
      componentKey: 0,
      history: useStore('trackingHistory'),
    }
  },

  computed: {    
    reverseHistory() {
      return [].concat(this.history).reverse()
    },

    latestSleep() {
      var sleepEvent = this.reverseHistory.find(el => el.type === 'Schlaf')
      var to = sleepEvent?.to
      if (to) {
        var time = LocalTime.parse(to)
        return this.formatDuration(time)
      } else {
        return ""
      }
    },
    latestFeed() {
      var feedEvent = this.reverseHistory.find(el => el.type === 'Flasche')
      var from = feedEvent?.from
      if (from) {
        var time = LocalTime.parse(from)
        return this.formatDuration(time)
      } else {
        return ""
      }
    },
    latestDiaper() {
      var diaperEvent = this.reverseHistory.find(el => el.type === 'Windel')
      var from = diaperEvent?.from
      if (from) {
        var time = LocalTime.parse(from)
        return this.formatDuration(time)
      } else {
        return ""
      }
    },
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
      if (this.recordType === 'Windel') {
        this.recordContent = 'Pipi'
      }
      this.from = LocalTime.now().format(TIME_FORMATTER)
      }
    },
    recordDiaper( diaper ) {
      console.log("Diaper type: ", diaper)
      this.recordContent = diaper
    },
    recordFeeding( feedAmount ) {
      console.log("Feed amount: ", feedAmount)
      this.recordContent = feedAmount + "ml"
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
      this.componentKey += 1
    },
    deleteAllTrackingRecords() {
      store.dispatch('deleteAllTrackingRecords')
    },
    canRevertTrackRecord() {

      return this.recordType
    },
    refreshPage() {
      this.revertScreen()
    },
    formatDuration( time ) {
      var duration = Duration.between(time, LocalTime.now())
      var formatted = formatDuration(duration);
      if (formatted.charCodeAt(0) < 65) {
        return "vor " + formatted
      } else { 
        return formatted
      }
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

.time-input-large {
  height: var(--f7-stepper-large-height);
}

.time-input-input {
  height: 100%;
}

.tracking-container {
  display: flex;
  align-content: center;
  
}

.tracking-container-center {
  justify-content: center; 
}

.latest-event {
  display: flex;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  box-sizing: border-box;
  vertical-align: middle;
  justify-content: center;
  align-items: center;

  line-height: calc(var(--f7-button-height) - var(--f7-button-border-width, 0) * 2);
  font-size: 11px;
}

</style>