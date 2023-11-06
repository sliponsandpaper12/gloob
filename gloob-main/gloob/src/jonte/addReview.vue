/* global google */

<template>
    <GloobNavbar/>
    <!-- Start of Body Section -->
    <div class="items-center">
        <!-- Body Section Div -->
        <div class="text-center px-10 pt-10 mt-24 sm:px-20 sm:pt-20 ">
            <!-- Header Text -->
            <p id="header" class="mb-5" >Your Words, Their Adventure.</p>
            <p class="mb-10 text-slate-500 text-xs">Gloob is driven by our community of fellow students. <br> Write a review and help other Gloobers experience the awesome hidden gems you've visited!</p>

            
            <div class="px-1 lg:px-24 ">
                <!-- Search Bar -->
                <form>   
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" class="block w-full p-4 pl-10 text-xs sm:text-sm text-gray-900 border-2 border-slate-700 rounded-full bg-gray-100 focus:ring-blue-500 focus:border-blue-500 " placeholder="Which Hidden Gem would you like to review?"
                        @keyup.enter="openModal">

                        <button 
                        @click="openModal"
                        type="submit" 
                        data-modal-target="authentication-modal2" data-modal-toggle="authentication-modal2"
                        class=" sm:visible text-white absolute right-2.5 bottom-2.5 bg-gray-300 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm px-4 py-2 ">Search</button>

                        <!-- Main modal -->
                        <div v-if="isModalOpen" id="authentication-modal2" tabindex="-1" aria-hidden="true" 
                        class=" fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                            <div class="relative w-screen max-w-3xl max-h-full ">
                                <!-- Modal content -->
                                <div class="relative bg-white rounded-lg shadow ">
                                    <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="authentication-modal">
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                        </svg>
                                        <span @click="closeModal" class="sr-only">Close modal</span>
                                    </button>   
                                    test mum bussy
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>



            <div class="my-10 w-full">
                <!-- Add Hidden Gem Button -->
                <button type="button" @click="modalClick" data-modal-target="authentication-modal1" data-modal-toggle="authentication-modal1" class=" w-full sm:w-44 py-3 text-white rounded-full bg-gray-700 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-sm px-4 py-2"> Add a new Hidden Gem! </button>
                <!-- Modal toggle-->
                

                <!-- Main modal -->
                <div id="authentication-modal1" tabindex="-1" aria-hidden="true" class=" fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div class="relative w-screen max-w-3xl max-h-full ">
                        <!-- Modal content -->
                        <div class="relative bg-white rounded-lg shadow ">
                            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="authentication-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>

                            <!-- Form starts -->
                            <div class="px-6 py-6 lg:px-8">
                            <div class="mt-6 mb-12">
                                <p class="mb-4 text-4xl font-semibold text-slate-700 mb-10">Add a Hidden Gem</p>
                            </div>
                            <div>
                                <section class="" style="position:relative;z-index:1">
                                    <div class="column">
                                    <form class="">
                                        <div class="ui message red" v-show="error">{{error}}</div>
                                        <div class="">
                                        <div class="field">
                                            
                                            <div class="text-left">
                                                <label for="email" class="block mb-2 text-sm font-bold text-gray-900 ">Official place name</label>
                                                <input type="text" v-model="placeName" placeholder="Name of the place" ref="autocompleteName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "/>
                                            </div>
                                            
                                            <div class="text-left mt-3">
                                                <label for="email" class="block mb-2 text-sm font-bold text-gray-900 ">Place Address</label>
                                                <div class="flex">
                                                    <input type="text" placeholder="Enter your address (Include Unit Number)" v-model="address" ref="autocomplete" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "/>
                                                    <button class="ml-2 bg-slate-700 text-white text-xs p-2 rounded-lg" @click.prevent="locatorButtonPressed">Current Location</button>
                                                </div>
                                            </div>

                                            <div class="text-left mt-3">
                                                <SelectCategory/>
                                            </div>

                                            <div class="text-center mt-3">
                                                <div style="display: flex; margin: 20px 0px;">
                                                    <div v-for="day in (daysOfWeek.length)" :key="day">
                                                        <span class="font-semibold text-xs text-slate-700">{{ daysOfWeek[day - 1] }}</span>
                                                        <span class="text-xs"><input type="text" v-model="ObjOpeningHours[day - 1]"  placeholder="0800 - 2300" style="text-align: center;" class="placeholder:text-xs"></span> 
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                            <ImgurImage/>
                                            </div>
                                            <!--to be completed--> 
                                            <!-- <div>
                                            <AddPicture :propPlace="propPlace"/>
                                            </div> -->
                                            <div class="text-center mt-8 h-40">
                                                <div id="map" ref="map" class="h-full rounded-lg"></div>
                                            </div>
                                        </div>

                                        <div class="grid justify-items-end mt-4 ">
                                            <button @click="submitSelections" class="mt-4 px-4 py-2 bg-slate-700 text-white rounded-lg shadow">Submit</button>
                                        </div>
                                        </div>
                                    </form>
                                    </div>
                                </section>
                                

                            </div>
                        </div>
                    </div>
                </div> 
            </div>
                <!-- End: Main Modal -->
            </div>
            <!-- End: Add Hidden Gem Button-->

            <!-- Boy image -->
            <div class="w-full flex items-center  justify-center">

                <div class="mt-10 grid place-content-center w-full lg:w-5/12 object-center">
                    <img src="../assets/addreviewsboy.png" alt="" class="">
    
                </div>
            </div>
            <!-- End: Boy image -->
        </div>
        <!-- End: Body Section Div-->



    </div>
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
</template>
    
<script>
/* global google */
import GloobNavbar from './gloobNavbar.vue';
// import AddGem from '../components/AddGem.vue';
import axios from "axios";
import SelectCategory from "../components/selectCategory.vue"
// import AddPicture from "./AddPicture.vue"
// import ImgurImage from "./ImgurImage.vue";
  
export default {
  components: {
    GloobNavbar,
    SelectCategory,
    // ImgurImage,
    // AddGem,
  },

  data() {
    return {
      autocomplete: null,
      isModalOpen: false,


      //add gem mounted
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

        daysOfWeek: [ 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

        
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
    this.loadGoogleMapsApi().then(() => {
      this.initializeAutocomplete();
    });
  },



  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    navigateToAddReview() {
      this.$router.push('/review'); // Use `this.$router.replace` if you don't want to keep history.
    },

    loadGoogleMapsApi() {
      // This function would return a Promise that resolves when the Google Maps API is loaded.
      // You can dynamically load the API using a script tag or use a package that handles it.
    },

    initializeAutocomplete() {
      // Assuming your search input has a reference called "autocompleteInput"
      this.autocomplete = new google.maps.places.Autocomplete(
        this.$refs.autocompleteInput,
        { types: ['establishment'] }
      );
      this.autocomplete.addListener('place_changed', this.onPlaceChanged);
    },

    onPlaceChanged() {
      const place = this.autocomplete.getPlace();
      // Extract the address and opening hours from the place details.
      // Then set them to your form inputs or data properties.
      this.fillInAddress(place);
    },

    // fillInAddress(place) {
      // Here you'll update your data properties or directly set the value of the inputs
      // with the address and opening hours from the place object.
    // },

    // methods of addGem
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

    modalClick(){
    //addGem mounted()
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
    },

  };
  </script>


















<style>
    body {
        background: url("../assets/background_image.png");
        max-width: 100%;
        overflow-x: hidden;
        background-repeat: no-repeat;
        background-size: cover;
    }


    #header{
        font-size: 50px;
        font-weight: 600;
        color: darkslategray;
    }
</style>






<!-- 

<AddGem/>
                            <div class="px-6 py-6 lg:px-8">
                                <div class="mt-6 mb-12">
                                    <p class="mb-4 text-4xl font-semibold text-slate-700 mb-10">Add a Hidden Gem</p>
                                </div>
                                <form class="space-y-6" action="#">
                                    <div class="text-left">
                                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Official place name</label>
                                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@company.com" required>
                                    </div>
                                    <hr>
                                    <div class="text-left">
                                        <label for="address" class="block mb-2 text-sm font-medium text-gray-900 ">Street Address</label>
                                        <input type="text" name="address" id="address" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required>
                                    </div>
                                    <div class="text-left">
                                        <label for="country" class="block mb-2 text-sm font-medium text-gray-900 ">Country</label>
                                        <input type="text" name="country" id="country" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required>
                                    </div>
                                    <div class="text-left">
                                        <label for="postalcode" class="block mb-2 text-sm font-medium text-gray-900 ">Postal Code</label>
                                        <input type="text" name="postalcode" id="postalcode" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required>
                                    </div>
                                    <hr>
                                    <div class="text-left">
                                        <label for="telephone" class="block mb-2 text-sm font-medium text-gray-900 ">Telephone Contact</label>
                                        <input type="number" name="telephone" id="telephone" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required>
                                    </div>
                                    <div class="flex justify-between">
                                        <div class="flex items-start">
                                            <div class="flex items-center h-5">
                                                <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 " required>
                                            </div>
                                            <label for="remember" class="ml-2 text-sm font-medium text-gray-900 ">Remember me</label>
                                        </div>
                                        <a href="#" class="text-sm text-blue-700 hover:underline ">Lost Password?</a>
                                    </div>
                                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Login to your account</button>
                                    <div class="text-sm font-medium text-gray-500 ">
                                        Not registered? <a href="#" class="text-blue-700 hover:underline ">Create account</a>
                                    </div>
                                </form>
                            </div> -->