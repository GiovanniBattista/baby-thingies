import TemperatureCalculatorPage from '../pages/TemperatureCalculatorPage.vue';
import NeedsTrackingPage from '../pages/NeedsTrackingPage.vue';
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
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
