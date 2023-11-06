// function placeDetails(){
//     var request = {
//         placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
//         fields: ['name', 'formatted_phone_number', 'geometry','photo', 'type', 'formatted_address', 'opening_hours']
//       };
      
//       service = new google.maps.places.PlacesService(map);
//       service.getDetails(request, callback);
      
//       function callback(place, status) {
//         if (status == google.maps.places.PlacesServiceStatus.OK) {
//           const placeName = place.name;
//           const formattedPhoneNumber = place.formatted_phone_number;
//           const geometry = place.geometry;
//           const photo = place.photos[0]; // [CHARGEABLE!] Access the first photo, if available
//           const types = place.types; // An array of types
//           const formattedAddress = place.formatted_address; // [CHARGEABLE!]
//           const openingHours = place.opening_hours;
//           createMarker(place); // not sone yet
//         }
//       }
// }




// var request = {
//   formattedAddress: 
// }
// service = new google.maps.places.PlacesService(map);
// service.getDetails(request, callback);

// function callback(place, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     const placeName = place.name;
//     const formattedPhoneNumber = place.formatted_phone_number;
//     const geometry = place.geometry;
//     const photo = place.photos[0]; // [CHARGEABLE!] Access the first photo, if available
//     const types = place.types; // An array of types
//     const formattedAddress = place.formatted_address; // [CHARGEABLE!]
//     const openingHours = place.opening_hours;
//     createMarker(place); // not done yet
//   }
// }
