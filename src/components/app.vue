<template>
  <f7-app v-bind="f7params" >

  <!-- Views/Tabs container -->
  <f7-views tabs class="safe-areas">
    <!-- Tabbar for switching views-tabs -->
    <f7-toolbar tabbar labels bottom>
      <f7-link tab-link="#view-watertemp" :tab-link-active="view2Load == 'view-watertemp'" icon-ios="f7:thermometer" icon-aurora="f7:thermometer" icon-md="f7:thermometer" text="Flasche" @click="setActiveTab('view-watertemp')"></f7-link>
      <f7-link tab-link="#view-tracking"  :tab-link-active="view2Load == 'view-tracking'" icon-ios="f7:stopwatch" icon-aurora="f7:stopwatch" icon-md="f7:stopwatch" text="Tracking" @click="setActiveTab('view-tracking')"></f7-link>
    </f7-toolbar>

    <!-- Your main view/tab, should have "view-main" class. It also has "tab-active" class -->
    <f7-view 
      id="view-watertemp" 
      name="watertemp"
      :main="view2Load == 'view-watertemp'" 
      :tab-active="view2Load == 'view-watertemp'" 
      tab 
      url="/"
    ></f7-view>

    <!-- Tracking View -->
    <f7-view 
      id="view-tracking" 
      name="tracking" 
      :main="view2Load == 'view-tracking'" 
      :tab-active="view2Load == 'view-tracking'" 
      tab 
      url="/tracking"
    ></f7-view>

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

      const view2Load = localStorage.getItem("view2load") || "view-watertemp"

      // Framework7 Parameters
      const f7params = {
        name: 'Baby Thingies', // App name
        theme: 'auto', // Automatic theme detection

        autoDarkMode: true,
        iosTranslucentBars: false,

        // App store
        store: store,
        // App routes
        routes: routes,
        // Register service worker (only on production build)
        serviceWorker: process.env.NODE_ENV ==='production' ? {
          path: '/service-worker.js',
        } : {},
      };
     
      onMounted(() => {
        f7ready(() => {


          // Call F7 APIs here
        });
      });

      return {
        f7params,
        view2Load
      }
    },

    methods: {
      setActiveTab( viewId ) {
        localStorage.setItem('view2load', viewId)
      }
    }
  }
</script>