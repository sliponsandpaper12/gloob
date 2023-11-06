<!-- Can edit css of the categories(currently they are responsive to the search bar's search)  -->

<template>
    <div>
    <div>
      <div class="text-left mt-3">
        <label for="email" class="block mb-2 text-sm font-bold text-gray-900 ">Place Category</label>
        <div class="flex">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search Categories..." 
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
  
        <!-- Dropdown Menu -->
        <div class="relative inline-block text-left">
          <div>
            <button @click="dropdownOpen = !dropdownOpen" type="button" class="ml-2 text-xs p-2 rounded-lg inline-flex justify-center w-full px-4 py-2 text-xs font-medium text-white bg-gray-700 border border-gray-300 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
              Select Categories
              <!-- Icon -->
              <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
  
          <!-- Dropdown Items -->
          <div v-show="dropdownOpen" class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none " role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div v-for="(categories, categoryGroup) in filteredCategories" :key="categoryGroup" class="py-1" role="none">
              <!-- Category Group Header -->
              <div class="px-4 py-2 text-xs text-gray-500" role="none">
                {{ categoryGroup }}
              </div>
              <!-- Categories -->
              <template v-for="category in categories" :key="category">
                <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" @click="toggleCategorySelection(category)">
                  <span class="flex items-center">
                    <input type="checkbox" :checked="selectedCategories.includes(category)" class="mr-2">
                    {{ category }}
                  </span>
                </a>
              </template>
            </div>
          </div>
        </div>
        </div>
  
        <!-- Submit Button and Selected Categories Display
        <button @click="submitSelections" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow">Submit</button> -->
  
        <div v-if="selectedCategories.length" class="mt-4">
          <h3 class="text-lg font-semibold">Selected Categories:</h3>
          <ul class="list-disc pl-5">
            <li v-for="category in selectedCategories" :key="category">{{ category }}</li>
          </ul>
        </div>
      </div>
    </div>
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '',
        dropdownOpen: false,
        allCategories: {
          commercial: ['Retail Stores', 'Malls', 'Markets'],
          institutions: ['Schools', 'Universities', 'Hospitals', 'Government Buildings'],
          hospitality: ['Hotels', 'Motels', 'Bed & Breakfasts'],
          dining: ['Restaurants', 'Cafes', 'Bars'],
          religionCulture: ['Churches', 'Temples', 'Mosques', 'Synagogues'],
          nature: ['Beaches', 'Mountains', 'Lakes', 'Forests'],
          recreational: ['Parks', 'Museums', 'Theaters', 'Sports Facilities'],
        },
        selectedCategories: [],
      };
    },
    computed: {
      filteredCategories() {
        if (!this.searchQuery) return this.allCategories;
  
        const lowerSearchQuery = this.searchQuery.toLowerCase();
        const filteredCategories = {};
  
        for (const categoryGroup in this.allCategories) {
          const categories = this.allCategories[categoryGroup].filter(category => 
            category.toLowerCase().includes(lowerSearchQuery)
          );
  
          if (categories.length) {
            filteredCategories[categoryGroup] = categories;
          }
        }
  
        return filteredCategories;
      }
    },
    methods: {
      toggleCategorySelection(category) {
        const index = this.selectedCategories.indexOf(category);
        if (index >= 0) {
          this.selectedCategories.splice(index, 1);
        } else {
          this.selectedCategories.push(category);
        }
      },
      submitSelections() {
        console.log("Selected Categories: ", this.selectedCategories);
        // Here, you can handle the submission logic, such as sending to a server.
      }
    }
  };
  </script>

  <style>

  </style>
