<template>
  <f7-row class="latest-tracks">
    <f7-col>
      <span v-if="latestFeedTime">{{ latestFeedTime }}</span>
    </f7-col>
    <f7-col >
      <span v-if="latestDiaperTime">{{ latestDiaperTime }}</span>
    </f7-col>
    <f7-col>
      <span v-if="latestSleepTime">{{ latestSleepTime }}</span>
    </f7-col>
  </f7-row>
</template>

<script>
import { Duration, LocalTime } from '@js-joda/core';
import { formatDuration } from '../js/formatter';

export default {
  name: "NeedsTrackerLatestTracks",

  props: {
    history: {
      type: Array,
      required: true,
    }
  },

  data() {
    return {};
  },

  // history array is already sorted, so we just need to reverse the
  // array and search from the top to bottom to find the first occurrance of each track
  computed: {    
    latestSleep() {
      return this.history.reverse().find(el => el.type === 'Schlaf')
    },
    latestFeed() {
      return this.history.reverse().find(el => el.type === 'Flasche')
    },
    latestDiaper() {
      return this.history.reverse().find(el => el.type === 'Windel')
    },

    latestSleepTime() {
      var to = this.latestSleep?.to
      if (to) {
        var time = LocalTime.parse(to)
        var duration = Duration.between(time, LocalTime.now())
        return formatDuration(duration);
      } else {
        return ""
      }
    },
    latestFeedTime() {
      var from = this.latestFeed?.from
      if (from) {
        var time = LocalTime.parse(from)
        var duration = Duration.between(time, LocalTime.now())
        return formatDuration(duration);
      }else {
        return ""
      }
    },
    latestDiaperTime() {
      var from = this.latestDiaper?.from
      if (from) {
        var time = LocalTime.parse(from)
        var duration = Duration.between(time, LocalTime.now())
        return formatDuration(duration);
      }
      else {
        return ""
      }
    },
  },

  methods: {
  },
};
</script>

<style lang="scss" scoped></style>