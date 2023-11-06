// dont need CSS

import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import AddGem from './components/AddGem.vue';
import LocationExist from './components/LocationExist.vue';
import CreateLocation from './components/CreateLocation.vue'; // Ensure this import is correct
import AddReviews from './components/addReview.vue';
import AddReview from './jonte/addReview.vue';
// import ItiPage from './jonte/itinerarypage.html';
import './assets/styles/tailwind.css'; // Ensure this is the correct path to your Tailwind CSS file


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AddReview',
      component: AddReview,
    },
    {
      path: '/next',
      name: 'LocationExist',
      component: LocationExist,
    },
    {
      path: '/create',
      name: 'CreateLocation',
      component: CreateLocation,
    },
    {
      path:'/reviewModal',
      name:'AddReviews',
      component:AddReviews,
    },
    {
      path: '/',
      name: 'AddGem',
      component: AddGem,
    },
    // {
    //   path:'/itiPage',
    //   name:'itiPage',
    //   component:ItiPage,
    // },
  ],
});

const app = createApp(App);
app.use(router);
app.mount('#app');
