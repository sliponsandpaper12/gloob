<template>
    <div>
      <nav class="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div class="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <a href="landingpage_loggedin.html" class="flex items-center">
            <img src="../assets/gloob_logo.png" class="h-8 mr-3" alt="Gloob" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap">Gloob!</span>
          </a>
  
          <div class="items-center justify-between hidden w-full md:flex md:w-auto">
            <ul class="flex flex-col p-4 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
              <li>
                <a href="#"
                   class="block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 hover:font-bold hover:text-slate-700">
                  Discover
                </a>
              </li>
              <li>
                <a href="./addreviewspage.html"
                   class="block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 hover:font-bold hover:text-slate-700">
                  Add Reviews
                </a>
              </li>
              <li>
                <a href="./itinerarypage.html"
                   class="block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 hover:font-bold hover:text-slate-700">
                  Plan Itineraries
                </a>
              </li>
            </ul>
          </div>
  
          <div class="flex items-center">
            <div class="relative" @click="toggleProfileDropdown" @blur="closeProfileDropdown">
              <button type="button" class="flex items-center space-x-4">
                <img class="w-10 h-10 rounded-full" src="../assets/profile_pic.png" alt="user photo">
                <div class="font-medium text-start hidden md:block">
                  <div>Marcus Jae</div>
                  <div class="text-sm text-gray-500">University of London</div>
                </div>
              </button>
              <div v-show="showProfileDropdown" class="custom_profile_dropdown absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-50">
                <ul class="text-gray-700">
                  <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100">Profile</a>
                  </li>
                  <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100">Setting</a>
                  </li>
                  <li>
                    <a href="#" class="block px-4 py-2 text-red-600 hover:bg-red-100">Logout</a>
                  </li>
                </ul>
              </div>
            </div>
  
            <button
              @click="toggleMenu"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-expanded="isExpanded"
            >
              <span class="sr-only">Open main menu</span>
              <svg class="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
  
          <div v-show="isExpanded" class="absolute top-full left-0 w-full bg-white md:hidden">
            <ul class="py-4">
              <li class="py-2 px-4">
                <input type="text" class="w-full p-2 border border-gray-300 rounded-full" placeholder="Search...">
              </li>
              <li>
                <a href="./landingpage_loggedin.html" class="block py-2 px-4 hover:bg-gray-50">Home</a>
              </li>
              <li>
                <a href="#" class="block py-2 px-4 hover:bg-gray-50">Discover</a>
              </li>
              <li>
                <a href="./addreviewspage.html" class="block py-2 px-4 hover:bg-gray-50">Add Reviews</a>
              </li>
              <li>
                <a href="./itinerarypage.html" class="block py-2 px-4 hover:bg-gray-50">Plan Itineraries</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isExpanded: false,
        showProfileDropdown: false,
      };
    },
    methods: {
      toggleMenu() {
        this.isExpanded = !this.isExpanded;
      },
      toggleProfileDropdown() {
        this.showProfileDropdown = !this.showProfileDropdown;
      },
      closeProfileDropdown() {
        this.showProfileDropdown = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .custom_profile_dropdown {
    display: none;
  }
  
  @media (min-width: 768px) {
    .custom_profile_dropdown {
      display: block;
    }
  }
  </style>
  