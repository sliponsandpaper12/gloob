<template>
    <div>
      <form @submit.prevent="handleSubmit">
        <!-- Days Selection -->
        <div v-for="day in daysOfWeek" :key="day">
          <input type="checkbox" :id="day" :value="day" v-model="selectedDays" />
          <label :for="day">{{ day }}</label>
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
      daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      selectedDays: [],
      openingHour: '',
      openingMinute: '',
      closingHour: '',
      closingMinute: ''
    };
  },
  methods: {
    handleSubmit() {
      // Process form submission
      console.log("Selected Days:", this.selectedDays);
      console.log("Opening Time:", this.formatTime(this.openingHour, this.openingMinute));
      console.log("Closing Time:", this.formatTime(this.closingHour, this.closingMinute));
      // Add your form submission logic here
    },
    formatTime(hour, minute) {
      // Ensuring hour and minute are two digits
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      return `${formattedHour}:${formattedMinute}`;
    }
  }
};
</script>
