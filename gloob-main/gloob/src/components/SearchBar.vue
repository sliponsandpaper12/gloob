<template>
    <div>
        <input type="text" id="searchBar" placeholder="Enter a Place">
    </div>
</template>

<script>
function initAutocomplete() {
    let lat = 0;
    let long = 0;
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude; // Assign the latitude to the lat variable
            long = position.coords.longitude; // Assign the longitude to the long variable
            createAutocomplete(lat, long);
        });
    }
}
initAutocomplete();

let searchBar;

function createAutocomplete(lat, long) {
searchBar = new google.maps.places.Autocomplete(
document.getElementById('searchBar'),
{
types: [],
componentRestrictions: {},
fields: ['place_id', 'geometry', 'name', 'opening_hours', 'formatted_address'],
strictBounds: true,
location: new google.maps.LatLng(lat, long),
radius: 500
}
);

searchBar.addListener('place_changed', function () {
var place = searchBar.getPlace();
console.log(place.formatted_address);
});
}

</script>
<script src="https://maps.googleapis.com/maps/api/js?key=
AIzaSyC86wNEin5X8Bjw46DglKKCOf3E-ju0CTY
&libraries=places&callback=initAutocomplete" async defer></script>