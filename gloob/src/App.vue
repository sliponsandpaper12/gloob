<template>
  <div id="nav">
    <router-link to="/">Map</router-link>
    <router-link to="/next">LocationExist</router-link>
  </div>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import CreateLocation from './components/CreateLocation.vue';
// import Test3 from './components/test3.vue';
import Test2 from './components/test2.vue';
import Test from './components/test.vue';
import Map from './components/Map.vue';
import LocationExist from './components/LocationExist.vue';
import OpeningHours from './components/OpeningHours.vue';


export default {
  components: {
    CreateLocation,
    Map,
    LocationExist,
    OpeningHours,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
