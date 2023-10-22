<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <CreateLocation/>
</template>

<script>
import CreateLocation from './components/CreateLocation.vue';


export default {
  components: {
    CreateLocation,
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
