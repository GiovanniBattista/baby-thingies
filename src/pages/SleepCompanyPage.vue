<template>
  <f7-page name="sleepcompany">
    <f7-navbar title="Sleep Company"></f7-navbar>

    <div class="display-flex flex-direction-column align-items-center justify-content-center" style="height: 100%">
      <f7-block-title class="display-flex justify-content-center margin-bottom">Who is next?</f7-block-title>
      <f7-block class="margin-top">
        <f7-row>
          <f7-col>
            <div>
              <needs-tracker-tracking-button
                :active="who === 'mommy'"
                @click="onChangeSleepCompanyClicked('mommy')"
                icon="mommy"
                title="Mommy"
              ></needs-tracker-tracking-button>
              <div class="who">Mommy</div>
            </div>
          </f7-col>

          <f7-col>
            <div>
              <needs-tracker-tracking-button
                :active="who === 'daddy'"
                @click="onChangeSleepCompanyClicked('daddy')"
                icon="daddy"
                title="Daddy"
              ></needs-tracker-tracking-button>
              <div class="who">Daddy</div>
            </div>
          </f7-col>
        </f7-row>
      </f7-block>
    </div>
  </f7-page>
</template>

<script setup>
import { LocalDate, ChronoUnit } from '@js-joda/core';
import { ref } from 'vue'

import NeedsTrackerTrackingButton from './../components/NeedsTrackerTrackingButton.vue'

const persistedData = localStorage.getItem('sleep-company-data') || "{}"
const data = JSON.parse(persistedData)

let when = LocalDate.now()
if (data.when) {
  when = LocalDate.parse(data.when)
}

const distanceInDays = when.until(LocalDate.now(), ChronoUnit.DAYS)
const isWho = distanceInDays % 2 == 0;

let who = ref(null)
if (data.who) {
  if (isWho) {
    who.value = data.who
  } else if (data.who === 'daddy') {
    who.value = "mommy"
  } else {
    who.value = "daddy"
  }
}

function onChangeSleepCompanyClicked( newWho ) {
  const data = {
    who: newWho,
    when: LocalDate.now().toString()
  }
  localStorage.setItem('sleep-company-data', JSON.stringify(data))
  who.value = newWho
}
</script>

<style lang="scss" scoped>
.who {
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