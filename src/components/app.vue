<template>
  <f7-app v-bind="f7params" >

  <!-- Views/Tabs container -->
  <f7-views tabs class="safe-areas">
    <!-- Tabbar for switching views-tabs -->
    <f7-toolbar tabbar labels bottom>
      <f7-link tab-link="#view-watertemp" tab-link-active icon-ios="f7:timer" icon-aurora="f7:timer" icon-md="f7:timer" text="Flasche"></f7-link>
      <!-- <f7-link tab-link="#view-tracking" icon-ios="f7:graph_round" icon-aurora="f7:graph_round" icon-md="f7:graph_round" text="Tracken"></f7-link> -->
    </f7-toolbar>

    <!-- Your main view/tab, should have "view-main" class. It also has "tab-active" class -->
    <f7-view id="view-watertemp" main tab tab-active url="/"></f7-view>

    <!-- Tracking View -->
    <f7-view id="view-tracking" name="tracking" tab url="/tracking/"></f7-view>

  </f7-views>

  </f7-app>
</template>
<script>
  import { ref, onMounted } from 'vue';
  import { f7, f7ready } from 'framework7-vue';


  import routes from '../js/routes.js';
  import store from '../js/store';

  export default {
    setup() {

      // Framework7 Parameters
      const f7params = {
        name: 'Baby Thingies', // App name
        theme: 'auto', // Automatic theme detection

        // App store
        store: store,
        // App routes
        routes: routes,
      };
     
      onMounted(() => {
        f7ready(() => {


          // Call F7 APIs here
        });
      });

      return {
        f7params,
      }
    }
  }
</script>