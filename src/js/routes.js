import TemperatureCalculatorPage from '../pages/TemperatureCalculatorPage.vue';
import NeedsTrackingPage from '../pages/NeedsTrackingPage.vue';
import SleepCompanyPage from '../pages/SleepCompanyPage.vue'
import NotFoundPage from '../pages/404.vue';

var routes = [
  {
    path: '/',
    component: TemperatureCalculatorPage,
  },
  {
    path: '/tracking',
    component: NeedsTrackingPage,
  },
  {
    path: '/sleepcompany',
    component: SleepCompanyPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
