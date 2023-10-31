<template>
  <h3 class="text-lg font-medium">{{ label }}</h3>
  <div class="grid grid-cols-3 gap-5">
    <label class="">
      Place Name
      <input
        class="form-group"
        type="text"
        @input="$emit('update:country', $event.target.value)"
        :value="country"
        ref="placeNameRef"
        placeholder="Place Name"
      />
    </label>

    <label class="">
      Address
      <input
        class="form-group"
        type="text"
        @input="$emit('update:address', $event.target.value)"
        :value="address"
        ref="addressRef"
        placeholder="Address"
      />
    </label>
  </div>
</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script 
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC86wNEin5X8Bjw46DglKKCOf3E-ju0CTY">
</script>
<script>
import axios from 'axios';
import { onMounted, onUnmounted, ref } from "vue";
import yourLocation from "@/composables/yourLocation";

export default {
  props: {
    label: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    const placeNameRef = ref();
    const addressRef = ref();
    let autocomplete;

    onMounted(() => {
      yourLocation()
        .then((location) => {
          console.log(location.lat)
          console.log(location.lng)
          autocomplete = new google.maps.places.Autocomplete(addressRef.value, {
            types: ["establishment"],
            bounds: new google.maps.LatLngBounds(
              new google.maps.latlng(location.lat, location.lng),
            )
            radius: 1000,
            fields: ['formatted_address'],
          });

          google.maps.event.addListener(autocomplete, "place_changed", () => {
            const mapping = {
              street_number: "update:streetNumber",
              route: "update:street",
              locality: "update:city",
              postal_code: "update:postcode",
              address: "update:address",
            };

            for (const type in mapping) {
              context.emit(mapping[type], "");
            }

            let place = {
              address_components: [],
              ...autocomplete.getPlace(),
            };

            place.address_components.forEach((component) => {
              component.types.forEach((type) => {
                if (mapping.hasOwnProperty(type)) {
                  context.emit(mapping[type], component.long_name);
                }
              });
            });
          });
        })
        .catch((error) => {
          console.error("Error getting user location:", error);
        });
    });

    onUnmounted(() => {
      if (autocomplete) {
        google.maps.event.clearInstanceListeners(autocomplete);
      }
    });

    return { placeNameRef, addressRef };
  },
};
</script>
