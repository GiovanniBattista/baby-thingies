import TemperatureCalculatorPage from '../pages/TemperatureCalculatorPage.vue';


import AboutPage from '../pages/about.vue';
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
