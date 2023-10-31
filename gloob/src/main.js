import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

// Import your components
import Map from './components/Map.vue';
import LocationExist from './components/LocationExist.vue';

const routes = [
  { path: '/', component: Map },
  { path: '/next', component: LocationExist },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router); // Use the router
app.mount('#app');

export default app; // Export the app instance if needed
