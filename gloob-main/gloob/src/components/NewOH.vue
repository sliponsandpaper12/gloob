<template>
    <div>
      <div v-for="(day, index) in daysOfWeek" :key="index">
        <span @click="fetchOpeningHours(day)">
          {{ day }}
        </span>
        <p v-if="openingHours[day]">{{ openingHours[day] }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        openingHours: {}
      };
    },
    methods: {
    }
  };
  </script>