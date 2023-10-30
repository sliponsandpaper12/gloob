<template>
    <div>
      <section class="ui two column centered grid" style="position:relative;z-index:1">
        <div class="column">
          <form class="ui segment large form">
            <div class="ui message red" v-show="error">{{error}}</div>
            <div class="ui segment">
              <div class="field">
                <div class="ui right icon input large" style="display: flex; " :class="{loading:spinner}">
                  <input type="text" v-model="placeName" placeholder="Name of the place" ref="autocompleteName"/>
                  <button class="dot circle link icon" @click.prevent="locatorButtonPressed">My location (replace with icon)</button>
                </div>
                <!-- <select v-model="placeCategory" placeholder="Category of the place" /> -->
                <!-- <select id="category" v-model="location.category" required>
            <option value="restaurant">Restaurant</option>
            <option value="park">Park</option> -->
                <input type="text" placeholder="Enter your address (Include Unit Number)" v-model="address" ref="autocomplete"/>
                <div>
                  <label for="categoryList">Select Categories:</label>
                </div>

                <input type="text" v-model="placeOpeningHours" placeholder="Opening Hours" />
              </div>
              <router-link to="/next">
                <button class="ui button">Go</button>
              </router-link>
            </div>
          </form>
        </div>
      </section>
  
      <section id="map" ref="map"></section>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        error: "",
        spinner: false,
        address: "",
        placeCategory: [],
        placeName: '',
        placeOpeningHours: '',

        allCategories: {
        commercial: ['Retail Stores', 'Malls', 'Markets'],
        institutions: ['Schools', 'Universities', 'Hospitals', 'Government Buildings'],
        hospitality: ['Hotels', 'Motels', 'Bed & Breakfasts'],
        dining: ['Restaurants', 'Cafes', 'Bars'],
        religionCulture: ['Churches', 'Temples', 'Mosques', 'Synagogues'],
        nature: ['Beaches', 'Mountains', 'Lakes', 'Forests'],
        recreational: ['Parks', 'Museums', 'Theaters', 'Sports Facilities'],
      },
      };
    },
  
    mounted() {
      this.initMap();
      // Get a reference to the input element
      const autocompleteInputName = this.$refs["autocompleteName"];
      const autocompleteInput = this.$refs["autocomplete"];

      // Focus on the input element
      autocompleteInputName.focus();
      
      if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var autocomplete = new google.maps.places.Autocomplete(
            autocompleteInputName,
            {
              bounds: new google.maps.LatLngBounds(
                new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
              ),
              types: ['establishment'],
            }
          );
  
          autocomplete.addListener("place_changed", () => {
            var place = autocomplete.getPlace();

            this.address = place.formatted_address;

            this.placeName = place.name || '';

            // this.placeCategory = place.types?.join(', ') || ''; // This will be an array of types
            // console.log(this.placeCategory)
            // Opening hours are a bit more complex as they are an object
            if (place.opening_hours?.weekday_text) {
              this.placeOpeningHours = place.opening_hours
              console.log(this.placeOpeningHours)
            }

            this.showLocationOnTheMap(
              place.geometry.location.lat(),
              place.geometry.location.lng()
            );
          });
        }
      );
    }
    
      
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var autocomplete = new google.maps.places.Autocomplete(
            autocompleteInput,
            {
              bounds: new google.maps.LatLngBounds(
                new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
              ),
              types: ['address'],
            }
          );
  
          autocomplete.addListener("place_changed", () => {
            var place = autocomplete.getPlace();
            
            this.showLocationOnTheMap(
              place.geometry.location.lat(),
              place.geometry.location.lng()
            );
          });
        }
      );
    }
    },
  
    methods: {
      initMap() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.showLocationOnTheMap(
            position.coords.latitude,
            position.coords.longitude
          );
        }, (error) => {
          console.error("Error getting location: ", error);
          // Optionally, handle the case where geolocation is denied
        });
      } else {
        console.error("Geolocation is not supported in this browser.");
      }
    },

      locatorButtonPressed() {
        this.spinner = true;
  
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.getAddressFrom(
                position.coords.latitude,
                position.coords.longitude
              );
  
              this.showLocationOnTheMap(
                position.coords.latitude,
                position.coords.longitude
              );
            },
            (error) => {
              this.error =
                "Locator is unable to find your address. Please type your address manually.";
              this.spinner = false;
              // console.log(error.message);
            }
          );
        } else {
          this.error = error.message;
          this.spinner = false;
          console.log("Your browser does not support geolocation API ");
        }
      },
      getAddressFrom(lat, long) {
        axios
          .get(
            "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
              lat +
              "," +
              long
          )
          .then((response) => {
            if (response.data.error_message) {
              this.error = response.data.error_message;
              console.log(response.data.error_message);
            } else {
              this.address = response.data.results[0].formatted_address;
              console.log(response.data.results[0].formatted_address);
            }
            this.spinner = false;
          })
          .catch((error) => {
            this.error = error.message;
            this.spinner = false;
            console.log(error.message);
          });
      },
  
      showLocationOnTheMap(latitude, longitude) {
        // Show & center the Map based oon
        var map = new google.maps.Map(this.$refs["map"], {
          zoom: 15,
          center: new google.maps.LatLng(latitude, longitude),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        });
  
        new google.maps.Marker({
          position: new google.maps.LatLng(latitude, longitude),
          map: map,
        });
      },

      navigateToNextPage() {
      this.$router.push('/next'); // Navigate to the /next route
    },
    },
  };
  </script>
  
  
  <style>
  .ui.button,
  .dot.circle.icon {
    background-color: #ff5a5f;
    color: white;
  }
  
  .pac-icon {
    display: none;
  }
  
  .pac-item {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .pac-item:hover {
    background-color: #ececec;
  }
  
  .pac-item-query {
    font-size: 16px;
  }
  
  #map {
    height: 250px;
    width: 250px;
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
  </style>