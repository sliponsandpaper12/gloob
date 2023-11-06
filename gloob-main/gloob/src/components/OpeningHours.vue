<template>
    <div>
      <form @submit.prevent="handleSubmit">
        <!-- Days Selection -->
      <div style="display: flex;">
        <div 
          v-for="(day, index) in daysOfWeek" 
          :key="day"
          :class="{ 'green-background': isDayWithTime(index) }"
        >
          <input 
            type="checkbox" 
            :id="day" 
            :value="index" 
            v-model.number="selectedDays" 
          />
          <label :for="day">{{ day }}</label>
        </div>
      </div>
        <!-- Time Input -->
        <div>
          <label for="openingHours">Opening Time:</label>
          <input type="number" id="openingHour" v-model.number="openingHour" min="0" max="23" placeholder="HH (00-23)" /> :
          <input type="number" id="openingMinute" v-model.number="openingMinute" min="0" max="59" placeholder="MM (00-59)" />
        </div>
  
        <div>
          <label for="closingHours">Closing Time:</label>
          <input type="number" id="closingHour" v-model.number="closingHour" min="0" max="23" placeholder="HH (00-23)" /> :
          <input type="number" id="closingMinute" v-model.number="closingMinute" min="0" max="59" placeholder="MM (00-59)" />
        </div>
  
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      selectedDays: [],
      openingHour: 0,
      openingMinute: 0,
      closingHour: 0,
      closingMinute: 0,
      daysWithTimes: [], // Stores days with their opening and closing times
    };
  },
  methods: {
    handleSubmit() {
      this.selectedDays.forEach(dayIndex => {
        const existingDay = this.daysWithTimes.find(day => day.day === dayIndex);
        if (existingDay) {
          existingDay.open.hours = this.openingHour;
          existingDay.open.min = this.openingMinute;
          existingDay.close.hours = this.closingHour;
          existingDay.close.min = this.closingMinute;
        } else {
          this.daysWithTimes.push({
            day: dayIndex,
            open: { hours: this.openingHour, min: this.openingMinute },
            close: { hours: this.closingHour, min: this.closingMinute }
          });
        }
      });
      // Clear form or handle other cleanup tasks
    },
    isDayWithTime(index) {
      return this.daysWithTimes.some(day => day.day === index && (day.open.hours !== 0 || day.open.min !== 0 || day.close.hours !== 0 || day.close.min !== 0));
    }
  }
};
</script>

<style>
.green-background {
  background-color: green;
}
</style>
