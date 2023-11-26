<template>
  <f7-page name="tracking" ptr @ptr:refresh="loadRecords">
    <f7-navbar title="Tracking">
      <f7-nav-right>
        <f7-link icon-f7="info_circle" popup-open=".app-info" ></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-block>
      <f7-row class="margin-bottom">
        <f7-col>
          <div>
            <needs-tracker-tracking-button :active="recordType === 'Windel'" @click="changeRecordType('Windel')" icon="windwl" title="Windel"></needs-tracker-tracking-button>
            <div class="latest-event" v-if="latestDiaper">{{ latestDiaper }}</div>
          </div>
        </f7-col>
        <f7-col>
          <needs-tracker-tracking-button :active="recordType === 'Schlaf'" @click="changeRecordType('Schlaf')"  icon="schlaf" title="Schlaf"></needs-tracker-tracking-button>
          <div class="latest-event" v-if="latestSleep">{{ latestSleep }}</div>
        </f7-col>
      </f7-row>
      <f7-row>
        <f7-col>
          <needs-tracker-tracking-button :active="recordType === 'Flasche'" @click="changeRecordType('Flasche')" icon="flasche" title="Flasche"></needs-tracker-tracking-button>
          <div class="latest-event" v-if="latestFeed">{{ latestFeed }}</div>
        </f7-col>
        <f7-col>
          <needs-tracker-tracking-button :active="recordType === 'Essen'" @click="changeRecordType('Essen')" icon="essen" title="Essen"></needs-tracker-tracking-button>
          <div class="latest-event" v-if="latestFood">{{ latestFood }}</div>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-block v-if="recordType">
      <div 
        class="display-flex flex-direction-column">
          <div
            class="display-flex justify-content-center margin-bottom">
            <f7-input type="date" v-model:value="date" class="time-input time-input-large margin-right" inputStyle="height: 100%;line-height:var(--f7-stepper-large-height);" large></f7-input>
            <f7-input type="time" v-model:value="from" class="time-input time-input-large margin-right" inputStyle="height: 100%;line-height:var(--f7-stepper-large-height);" large></f7-input>
          </div>

        <div 
          class="display-flex justify-content-center">
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
          <needs-tracker-food
            @track:food="recordFood"
            :key="componentKey"
            v-if="recordType == 'Essen'"
            class="tracker-food"
          ></needs-tracker-food>
          <needs-tracker-sleep
            :key="componentKey"
            v-if="recordType == 'Schlaf'"
            class="tracker-sleep"
          ></needs-tracker-sleep>
          <f7-button outline @click="saveRecording" large fill color="green" :disabled="!recordType">✅</f7-button>
        </div>
      </div>
    </f7-block>

    <f7-block>
      <needs-tracker-history :history="history" @history:delete-all="deleteAllTrackingRecords"></needs-tracker-history>
    </f7-block>
  </f7-page>

  <f7-popup class="app-info" swipe-to-close>
    <f7-page>
      <f7-navbar title="Info">
        <f7-nav-right>
          <f7-link popup-close>Close</f7-link>
        </f7-nav-right>
      </f7-navbar>

      <f7-block-title>Verwendete Icons</f7-block-title>
      <f7-block strong>
        <a href="https://www.flaticon.com/de/kostenlose-icons/baby" title="baby Icons">Baby Icons erstellt von wanicon - Flaticon</a><br>
        <a href="https://www.flaticon.com/free-icons/baby-food" title="baby food icons">Baby food icons created by Freepik - Flaticon</a>
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
import NeedsTrackerFood from '../components/NeedsTrackerFood.vue';
import NeedsTrackerSleep from '../components/NeedsTrackerSleep.vue';
import NeedsTrackerHistory from '../components/NeedsTrackerHistory.vue';
import NeedsTrackerTrackingButton from '../components/NeedsTrackerTrackingButton.vue';

import { Duration, LocalDateTime, LocalDate, LocalTime } from '@js-joda/core';

import { useStore } from 'framework7-vue';
import store from '../js/store'

import { formatDuration, TIME_FORMATTER, DATE_FORMATTER } from '../js/formatter'
import NeedsTrackerLatestTracks from '../components/NeedsTrackerLatestTracks.vue';

export default {
  name: "NeedsTrackingPage",
  
  components: {
    NeedsTrackerDiaper,
    NeedsTrackerFeeding,
    NeedsTrackerFood,
    NeedsTrackerSleep,
    NeedsTrackerHistory,
    NeedsTrackerTrackingButton,
    NeedsTrackerLatestTracks
},

  data() {
    return {
      recordType: null,
      recordContent: null,
      date: "",
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
        var time = LocalDateTime.parse(to)
        return this.formatDuration(time)
      } else {
        return ""
      }
    },
    latestFeed() {
      var feedEvent = this.reverseHistory.find(el => el.type === 'Flasche')
      var from = feedEvent?.from
      if (from) {
        var time = LocalDateTime.parse(from)
        return this.formatDuration(time)
      } else {
        return ""
      }
    },
    latestFood() {
      var feedEvent = this.reverseHistory.find(el => el.type === 'Essen')
      var from = feedEvent?.from
      if (from) {
        var time = LocalDateTime.parse(from)
        return this.formatDuration(time)
      } else {
        return ""
      }
    },
    latestDiaper() {
      var diaperEvent = this.reverseHistory.find(el => el.type === 'Windel')
      var from = diaperEvent?.from
      if (from) {
        var time = LocalDateTime.parse(from)
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
        this.date = LocalDate.now().toString()
      }
    },
    recordDiaper( diaper ) {
      console.log("Diaper type: ", diaper)
      this.recordContent = diaper
    },
    recordFeeding( feedAmount ) {
      console.log("Feed amount: ", feedAmount)
      if (!feedAmount) {
        this.recordContent = 'nichts getrunken'
      } else {
        this.recordContent = feedAmount + " ml"
      }
    },
    recordFood( foodAmount ) {
      console.log("Food amount: ", foodAmount)
      if (!foodAmount) {
        this.recordContent = 'nichts gegessen'
      } else {
        this.recordContent = foodAmount + " g"
      }
    },
    saveRecording() {
      const date = LocalDate.parse(this.date)
      const time = LocalTime.parse(this.from, TIME_FORMATTER)
      const dateTime = LocalDateTime.of(date, time)

      var record = { type: this.recordType, text: this.recordContent, from: dateTime.toString() }

      if (this.recordType === 'Flasche' && !record.text) {
        record.text = '100 ml'
      } else if (this.recordType === 'Essen' && !record.text) {
        record.text = '100 g'
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
      var duration = Duration.between(time, LocalDateTime.now())
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