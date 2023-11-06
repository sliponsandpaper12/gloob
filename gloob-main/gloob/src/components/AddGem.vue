/* global google */

<template>
    <div>
      <section class="" style="position:relative;z-index:1">
        <div class="column">
          <form class="">
            <div class="ui message red" v-show="error">{{error}}</div>
            <div class="">
              <div class="field">
                <div class="ui right icon input large" style="display: flex; " :class="{loading:spinner}">
                  <input type="text" v-model="placeName" placeholder="Name of the place" ref="autocompleteName"/>
                  <button class="dot circle link icon" @click.prevent="locatorButtonPressed">My location (replace with icon)</button>
                </div>

                <input type="text" placeholder="Enter your address (Include Unit Number)" v-model="address" ref="autocomplete"/>
                
                <div>
                  <SelectCategory/>
                </div>

                <div style="display: flex; margin: 20px 0px;">
                  <div v-for="day in (daysOfWeek.length)" :key="day">
                    <span>{{ daysOfWeek[day - 1] }}</span>
                    <span><input type="text" v-model="ObjOpeningHours[day - 1]" placeholder="0800 - 2300" style="text-align: center;"></span>
                  </div>
                </div>

                <div>
                  <ImgurImage/>
                </div>
                <!--to be completed--> 
                <!-- <div>
                  <AddPicture :propPlace="propPlace"/>
                </div> -->

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
  import SelectCategory from "./selectCategory.vue"
  // import AddPicture from "./AddPicture.vue"
  import ImgurImage from "./ImgurImage.vue";
  
  export default {
    /* global google */
    components:{
      SelectCategory,
      // AddPicture,
      ImgurImage,
    },

    data() {
      return {
        error: "",
        spinner: false,
        address: "",
        placeName: '',
        placeOpeningHours: '',
        propPlace:{},

        ObjOpeningHours:{
          0: '',
          1:'',
          2: '',
          3:'',
          4:'',
          5:'',
          6:'',
        },

        daysOfWeek: [ 'Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

        
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
      this.resetOpeningHours();
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

            this.propPlace = place;
            console.log(this.propPlace)
            console.log(this.propPlace.photos)
            console.log('lolll')

            if (place.opening_hours?.weekday_text) {
              this.resetOpeningHours();
              this.placeOpeningHours = place.opening_hours.weekday_text
              console.log(this.placeOpeningHours)
              console.log(place.opening_hours.periods)
              let periods = place.opening_hours.periods
              for(let period in periods){
                let day = periods[period].open["day"]; // 0-6
                let open = periods[period].open["time"];
                let close = periods[period].close["time"] || "Open 24 Hours"; // no value means not closed
                this.ObjOpeningHours[day] = [open,close] // 0: 9am to 9pm , will not have all days
              }
              for(let key in this.ObjOpeningHours){ // 0-6
                if(this.ObjOpeningHours[key]== ''){ // if didnt appear in periods means it's close
                  this.ObjOpeningHours[key] = 'Closed'
                }else if(Array.isArray(this.ObjOpeningHours[key]) && this.ObjOpeningHours[key][1] == "Open 24 Hours"){
                  this.ObjOpeningHours[key] = 'Open 24 Hours';
                }else if(Array.isArray(this.ObjOpeningHours[key])){
                  this.ObjOpeningHours[key] = this.ObjOpeningHours[key].join(' - '); // format the time
                }
                // else nothing happens and it stays at 0900 to 2100
              }
              // this.ObjOpeningHours =this.useFormatTime(this.placeOpeningHours);
              // console.log(this.ObjOpeningHours);
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
        this.placeName = '';
        this.placeOpeningHours = '';
        this.resetOpeningHours()
  
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
              console.log(error.message);
            }
          );
        } else {
          this.error = "Your browser does not support the geolocation API.";
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
              long +
              "&key=AIzaSyC86wNEin5X8Bjw46DglKKCOf3E-ju0CTY"
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

      // useFormatTime(placeOpeningHours){
      //   FormatGogTime(placeOpeningHours);
      // },

      resetOpeningHours() {
      // Loop through each day and set the value to an empty string
        for (let key in this.ObjOpeningHours) {
          this.ObjOpeningHours[key] = '';
        }
      },

      navigateToNextPage(pagePath) { // currently not in use
      this.$router.push(pagePath); // Navigate to the /next route
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
  

  </style>