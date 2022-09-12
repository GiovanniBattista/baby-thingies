<template>
  <div class="display-flex">
    <f7-stepper class="margin-right" large :value="100" :min="0" :max="200" :step="5" :autorepeat="true" @change="$emit('track:feeding', parseInt($event.target.value))"></f7-stepper>
    <f7-link icon-f7="info_circle" class="margin-right" popup-open=".baby-food-measurments"></f7-link>
  </div>

  <f7-popup class="baby-food-measurments" swipe-to-close>
    <f7-page>
      <f7-navbar title="Trinkmenge & Dosierung">
        <f7-nav-right>
          <f7-link popup-close>Close</f7-link>
        </f7-nav-right>
      </f7-navbar>

      <f7-block strong>
        <div class="row">
          <div class="col-33"><b>Wasser (ml)</b></div>
          <div class="col-33"><b>Fertig gemixt (ml)</b></div>
          <div class="col-33"><b>Messlöffel</b></div>
        </div>
        <div class="row">
          <div class="col-33">30 ml</div>
          <div class="col-33">35 ml</div>
          <div class="col-33">1</div>
        </div>
        <div class="row">
          <div class="col-33">60 ml</div>
          <div class="col-33">70 ml</div>
          <div class="col-33">2</div>
        </div>
        <div class="row">
          <div class="col-33">90 ml</div>
          <div class="col-33">100 ml</div>
          <div class="col-33">3</div>
        </div>
        <div class="row">
          <div class="col-33">120 ml</div>
          <div class="col-33">135 ml</div>
          <div class="col-33">4</div>
        </div>
        <div class="row">
          <div class="col-33">150 ml</div>
          <div class="col-33">165 ml</div>
          <div class="col-33">5</div>
        </div>
        <div class="row">
          <div class="col-33">180 ml</div>
          <div class="col-33">200 ml</div>
          <div class="col-33">6</div>
        </div>
        <div class="row">
          <div class="col-33">210 ml</div>
          <div class="col-33">235 ml</div>
          <div class="col-33">7</div>
        </div>
      </f7-block>
    </f7-page>
  </f7-popup>
</template>

<script>
export default {
  name: "NeedsTrackerFeeding",

  components: {  },

  emits: ['track:feeding'],
  
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
  }
</style>