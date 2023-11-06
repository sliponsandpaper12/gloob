// import yourLocation from "./yourLocation";
// // Create a reusable function for location search
// export function performLocationSearch(apiKey, searchParams, query='') {
//     // Define the endpoint for the search
//     const endpoint = 'https://places.googleapis.com/v1/places:searchNearby/json';
  
//     // Perform the location search
//     return yourLocation()
//       .then((location) => {
//         const latLng = new google.maps.LatLng(location.lat, location.lng);
  
//         // Define the parameters for your search
//         const params = {
//           location: latLng, // Replace with the desired latitude and longitude
//           radius: 500, // Replace with your desired radius (in meters)
//           ...searchParams,
//         };
  
//         // Create a URL with the query parameters
//         const url = new URL(endpoint);
//         url.search = new URLSearchParams(params).toString();
  
//         // Make the POST request
//         return fetch(url, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           // You can add a request body if required
//         });
//       })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       });
//   }
  
//   // Usage:
//   const apiKey = 'YOUR_GOOGLE_API_KEY'; // Replace with your Google Cloud API Key
//   const searchParams = {
//     key: apiKey, // Your API Key
//     fields: ['place_id', 'geometry', 'name', 'opening_hours', 'formatted_address'],
//   };
  
//   // Example usage of the function
//   performLocationSearch(apiKey, searchParams, 'your_query_here')
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });