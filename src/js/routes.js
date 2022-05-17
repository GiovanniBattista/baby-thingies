import TemperatureCalculatorPage from '../pages/TemperatureCalculatorPage.vue';
import NotFoundPage from '../pages/404.vue';

var routes = [
  {
    path: '/',
    component: TemperatureCalculatorPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
