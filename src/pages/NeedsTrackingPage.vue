<template>
  <f7-page name="tracking">
    <f7-navbar title="Tracking"></f7-navbar>

    <f7-block>
      <div class="row">
        <needs-tracker-diaper 
          @track:diaper="recordDiaper"
          :reset-component="resetChildComponents"
        ></needs-tracker-diaper>
      </div>
      <div class="row">
        <needs-tracker-feeding
          @track:feeding="recordFeeding"
        ></needs-tracker-feeding>
        <needs-tracker-sleep
          @track:sleep-start="recordSleepStart"
          @track:sleep-end="recordSleepEnd"
        ></needs-tracker-sleep>
      </div>
    </f7-block>
    <f7-block>
      <f7-button outline @click="saveRecording" :disabled="!wasTracked">✅ Speichern</f7-button>
      <f7-button outline color="red" v-if="wasTracked" style="margin-top: 5px" >Löschen</f7-button>
    </f7-block>

    <f7-block>
      <needs-tracker-history :history="history"></needs-tracker-history>
    </f7-block>
  </f7-page>
</template>

<script>
import NeedsTrackerDiaper from '../components/NeedsTrackerDiaper.vue';
import NeedsTrackerFeeding from '../components/NeedsTrackerFeeding.vue';
import NeedsTrackerSleep from '../components/NeedsTrackerSleep.vue';
import NeedsTrackerHistory from '../components/NeedsTrackerHistory.vue';

export default {
  components: { NeedsTrackerFeeding },
  name: "NeedsTrackingPage",
  
  components: {
    NeedsTrackerDiaper,
    NeedsTrackerFeeding,
    NeedsTrackerSleep,
    NeedsTrackerHistory
},

  data() {
    return {
      recordType: null,
      recordContent: null,
      wasTracked: false,
      resetChildComponents: false,
      history: [], // TODO use store for that
    }
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

      if (this.recordType != "Schlaf") {
        record.instant = new Date()
      } else {
        record.instant = new Date()
        // TODO do something here
      }

      this.history.push(record)
      // clear all recordings
      this.recordType = null
      this.recordContent = null
      this.wasTracked = false
      this.resetChildComponents = true
      this.resetChildComponents = false
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