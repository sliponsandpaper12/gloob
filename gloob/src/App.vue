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
<script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore-compat.js"></script>

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
