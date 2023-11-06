<template>
<input type="text" id="searchBar" placeholder="Enter a Place">
<button id="searchButton">Search</button>
<div id="searchResults"></div>
</template>

<script>

const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');

// Add a click event listener to the search button
searchButton.addEventListener('click', () => {
  performLocationSearch(searchBar.value);
});

// Add a keyup event listener to the search input to trigger the search on Enter key press
searchBar.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    performLocationSearch(searchBar.value);
  }
});

import {performLocationSearch} from '../composables/nearbySearch'
const apiKey = 'AIzaSyC86wNEin5X8Bjw46DglKKCOf3E-ju0CTY'; 
  const searchParams = {
    key: apiKey, // Your API Key
    fields: ['place_id', 'geometry', 'name', 'opening_hours', 'formatted_address'],
  };
performLocationSearh(apiKey,searchParams)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
</script>






