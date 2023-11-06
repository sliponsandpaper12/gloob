<!-- CSS here will only be on the links to the diff places -->

<template>
  <div id="nav"> <!-- each of the router link will render a page -->
    <!-- <router-link to="/">Map Page</router-link> 
    <router-link to="/next">Location Exist</router-link>
    <router-link to="/create">Create Location</router-link>
    <router-link to="/reviews">Add Reviews</router-link> -->
    <!-- <router-link to="/itiPage"></router-link> -->

  </div>
  <div class="container">
    <router-view></router-view> <!-- this shows where the page will be in the document -->
  </div>
</template>

<script>
export default {
  name: 'App',
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
