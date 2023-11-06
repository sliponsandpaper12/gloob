<template>
  <div>
    <input type="text" id="searchBar" placeholder="Enter a Place" v-model="addressInput">
  </div>
</template>


<script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC86wNEin5X8Bjw46DglKKCOf3E-ju0CTY">
</script>
<script>
import { onMounted } from "vue";
export default {
  data() {
    return {
      addressInput: '',
    };
  },
  setup() {
    // Initialize Google Maps Autocomplete when the component is mounted
    const initAutocomplete = () => {
      let lat = 0;
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          lat = position.coords.latitude;
          const long = position.coords.longitude;
          createAutocomplete(lat, long);
        });
      }
    };

    const createAutocomplete = (lat, long) => {
      const searchBar = new google.maps.places.Autocomplete(
        document.getElementById('searchBar'),
        {
          types: ['establishment'],
          componentRestrictions: {},
          fields: ['place_id', 'geometry', 'name'],
          rankBy: google.maps.places.RankBy.DISTANCE,
          location: new google.maps.LatLng(lat, long),
        }
      );

      searchBar.addListener('place_changed', function () {
        var place = searchBar.getPlace();
        console.log(place.name);
      });
    };

    // Trigger the Autocomplete initialization when the component is mounted
    onMounted(initAutocomplete);
    if(addressInput){
      return {
        addressInput: this.addressInput,
      };
    }
  },
};
</script>
