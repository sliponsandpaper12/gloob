// Replace 'YOUR_MAPBOX_ACCESS_TOKEN' with your actual Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiY3lydXMtdGFuIiwiYSI6ImNsbzFyYXAyYzAxZGwydmxlOGNwemg0b2IifQ.M-UYow_quPUyahQqecAJGA'; // Your Mapbox access token

var currentMode = 'driving';

// Event listeners for different mode buttons
var transportModesDropdown = document.getElementById('transportModes');

transportModesDropdown.addEventListener('change', function () {
    var selectedMode = transportModesDropdown.value;

    if (currentMode !== selectedMode) {
        updateMode(selectedMode);
    }
});



// Event listener for the "Bring me for a Tour!" button
var tourButton = document.getElementById('tourButton');
tourButton.addEventListener('click', function () {
    initiateTour();
});

function updateMode(newMode) {
    currentMode = newMode;
    if (map.getLayer('route')) {
        map.removeLayer('route');
    }
    if (map.getSource('route')) {
        map.removeSource('route');
    }
    calculateRoute();
}



// Function to add the current location marker
function addCurrentLocationMarker() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var coordinates = [position.coords.longitude, position.coords.latitude];

            var marker = new mapboxgl.Marker({
                color: 'blue',
                draggable: false,
            });

            marker.setLngLat(coordinates).addTo(map);

            var popup = new mapboxgl.Popup({
                closeButton: false,
            })
                .setHTML('Your Current Location');

            marker.getElement().addEventListener('mouseover', function () {
                popup.setLngLat(marker.getLngLat()).addTo(map);
            });

            marker.getElement().addEventListener('mouseout', function () {
                popup.remove();
            });
        });
    } else {
        console.log('Geolocation is not supported by your browser');
    }
}



var mapStyleSet = false;


// Initialize the map
var map = new mapboxgl.Map({
    container: 'map',
    center: [-0.1276, 51.5072],
    zoom: 12,
});


// Call the function to add the current location marker
addCurrentLocationMarker();


// Function to set the light preset based on time of day
function setLightPreset(userLocalTime) {
    var lightPreset = 'day'; // Default preset
    if (userLocalTime >= 5 && userLocalTime < 8) {
        lightPreset = 'dawn';
    } else if (userLocalTime >= 8 && userLocalTime < 18) {
        lightPreset = 'day';
    } else {
        lightPreset = 'dusk';
    }

    // Set the map's light preset based on the time of day
    map.setConfigProperty('basemap', 'lightPreset', lightPreset);
}



// Event listeners for different time of day buttons
var dawnButton = document.getElementById('dawn');
dawnButton.addEventListener('click', function () {
    setLightPreset(6); // Set a specific hour for dawn
});

var dayButton = document.getElementById('day');
dayButton.addEventListener('click', function () {
    setLightPreset(12); // Set a specific hour for daytime
});

var duskButton = document.getElementById('dusk');
duskButton.addEventListener('click', function () {
    setLightPreset(18); // Set a specific hour for dusk
});


// Function to set the map style based on the user's local time
function setMapStyleBasedOnTime() {
    if (mapStyleSet) {
        return;
    }

    // Get the user's local time and set the appropriate style
    var userLocalTime = new Date().getHours();
    setLightPreset(userLocalTime);
    mapStyleSet = true;
}

// When the map is loaded and ready
map.on('style.load', function () {
    setMapStyleBasedOnTime();
});




// Helper function to calculate distance between two points
function calculateDistance(coord1, coord2) {
    const [x1, y1] = coord1;
    const [x2, y2] = coord2;
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Function to calculate the optimal route
async function calculateOptimalRoute() {
    const coordinates = locations.map(location => location.coordinates);

    const sequence = [0]; // Start with the first location as a seed

    while (sequence.length < coordinates.length) {
        let currentCoord = coordinates[sequence[sequence.length - 1]];
        let nearest = null;
        let minDistance = Number.MAX_VALUE;

        for (let i = 0; i < coordinates.length; i++) {
            if (!sequence.includes(i)) {
                const dist = calculateDistance(currentCoord, coordinates[i]);
                if (dist < minDistance) {
                    minDistance = dist;
                    nearest = i;
                }
            }
        }

        sequence.push(nearest);
    }

    const routeCoordinates = sequence.map(idx => coordinates[idx]);

    const waypoints = routeCoordinates.map(coord => ({
        coordinates: coord.join(','),
    }));

    const waypointsString = waypoints.map(waypoint => waypoint.coordinates).join(';');

    try {
        const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/${currentMode}/${waypointsString}?geometries=geojson&access_token=${mapboxgl.accessToken}`);
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
            const route = data.routes[0];
            const routeGeometry = route.geometry.coordinates;
            const distance = route.distance;
            const duration = route.duration;

            // Clear old route
            if (map.getLayer('route')) {
                map.removeLayer('route');
            }
            if (map.getSource('route')) {
                map.removeSource('route');
            }


            
            if (map.getLayer('optimizedRoute')) {
                map.removeLayer('optimizedRoute');
            }
            if (map.getSource('optimizedRoute')) {
                map.removeSource('optimizedRoute');
            }





            map.addLayer({
                id: 'optimizedRoute',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: routeGeometry,
                        },
                    },
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    'line-color': 'blue',
                    'line-width': 5,
                },
            });

            map.on('mouseenter', 'optimizedRoute', function (e) {
                const totalDistance = (distance / 1000).toFixed(2); // Convert meters to kilometers
                const totalTime = (duration / 60).toFixed(1); // Convert seconds to minutes
        
                const coordinates = e.features[0].geometry.coordinates[0];
        
                const popup = new mapboxgl.Popup({
                    closeButton: false,
                })
                    .setLngLat(coordinates)
                    .setHTML(`<strong>Distance:</strong> ${totalDistance} km<br><strong>Time:</strong> ${totalTime} minutes`)
                    .addTo(map);
        
                map.on('mouseleave', 'optimizedRoute', function () {
                    popup.remove();
                });
            });
        }
    }
    catch (error) {
        console.error('Error calculating optimal route:', error);
        showErrorPopup('An error occurred while calculating the optimal route.');
    }
}


// var optimizeRouteButton = document.getElementById('optimizeRouteButton');

// optimizeRouteButton.addEventListener('click', function () {
//     calculateOptimalRoute();
// });


var locations = [];

function geocodeAndAddWaypoint(locationName) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${locationName}.json?access_token=${mapboxgl.accessToken}`)
            .then(response => response.json())
            .then(data => {
                if (data.features && data.features.length > 0) {
                    var feature = data.features[0];
                    var coordinates = feature.center;

                    var marker = new mapboxgl.Marker({
                        color: 'red',
                        draggable: false,
                    });

                    // Create a unique label for the waypoint
                    var label = document.createElement('div');
                    label.className = 'marker-label';
                    label.textContent = locations.length + 1;

                    // Add the label to the marker
                    marker.getElement().appendChild(label);

                    marker.setLngLat(coordinates).addTo(map);

                    var popup = new mapboxgl.Popup({
                        closeButton: false,
                    })
                        .setHTML(locationName);

                    marker.getElement().addEventListener('mouseover', function () {
                        popup.setLngLat(marker.getLngLat()).addTo(map);
                    });

                    marker.getElement().addEventListener('mouseout', function () {
                        popup.remove();
                    });

                    locations.push({
                        name: locationName,
                        coordinates: coordinates,
                        marker: marker,
                    });

                    resolve();
                } else {
                    console.error(`Location '${locationName}' not found.`);
                    reject();
                }
            })
            .catch(error => {
                console.error('Error geocoding location:', error);
                reject();
            });
    });
}


// Initialize event listeners for 'mouseenter' and 'mouseleave' for the route
map.on('mouseenter', 'route', function (e) {
    var coordinates = e.features[0].geometry.coordinates;
    var totalDistance = (distance / 1000).toFixed(2); // Convert meters to kilometers
    var totalTime = (duration / 60).toFixed(1); // Convert seconds to minutes

    var popup = new mapboxgl.Popup()
        .setLngLat(coordinates[0]) // Show popup on the first coordinate
        .setHTML(`<strong>Distance:</strong> ${totalDistance} km<br><strong>Time:</strong> ${totalTime} minutes`)
        .addTo(map);

    map.on('mouseleave', 'route', function () {
        popup.remove();
    });
});


function calculateRoute() {
    var coordinates = locations.map(location => location.coordinates);
    var formattedCoordinates = coordinates.map(coords => coords.join(','));

    fetch(`https://api.mapbox.com/directions-matrix/v1/mapbox/${currentMode}/${formattedCoordinates.join(';')}?access_token=${mapboxgl.accessToken}`)
        .then(response => response.json())
        .then(data => {
            if (data.code === 'Ok') {
                var waypointsOrder = data.durations[0].reduce((order, _, index) => {
                    order[index] = locations[index];
                    return order;
                }, []);

                var orderedCoordinates = waypointsOrder.map(location => location.coordinates);

                fetch(`https://api.mapbox.com/directions/v5/mapbox/${currentMode}/${orderedCoordinates.join(';')}?geometries=geojson&access_token=${mapboxgl.accessToken}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.routes && data.routes.length > 0) {
                            var route = data.routes[0];
                            var routeCoordinates = route.geometry.coordinates;


                            var distance = route.distance;
                            var duration = route.duration;


                            map.addLayer({
                                id: 'route',
                                type: 'line',
                                source: {
                                    type: 'geojson',
                                    data: {
                                        type: 'Feature',
                                        properties: {},
                                        geometry: {
                                            type: 'LineString',
                                            coordinates: routeCoordinates,
                                        },
                                    },
                                },
                                layout: {
                                    'line-join': 'round',
                                    'line-cap': 'round',
                                },
                                paint: {
                                    'line-color': 'red',
                                    'line-width': 5,
                                },
                            });


                            // Event listener for showing route information on hover
                            map.on('mouseenter', 'route', function (e) {
                                var coordinates = e.features[0].geometry.coordinates;
                                var totalDistance = (distance / 1000).toFixed(2); // Convert meters to kilometers
                                var totalTime = (duration / 60).toFixed(1); // Convert seconds to minutes

                                var popup = new mapboxgl.Popup({
                                    closeButton: false,
                                })
                                    .setLngLat(coordinates[0]) // Show popup on the first coordinate
                                    .setHTML(`<strong>Distance:</strong> ${totalDistance} km<br><strong>Time:</strong> ${totalTime} minutes`)
                                    .addTo(map);

                                map.on('mouseleave', 'route', function () {
                                    popup.remove();
                                });
                            });


                        } else {
                            // Handle the case where no route is found
                            showErrorPopup('No route found for the selected mode.');
                            currentMode = 'driving'; // Set mode to 'driving' on error
                            calculateRoute();
                            setMapBounds();
                        }
                    })
                    .catch(error => {
                        console.error('Error calculating route:', error);
                        showErrorPopup('An error occurred while calculating the route.');
                        currentMode = 'driving'; // Set mode to 'driving' on error
                        calculateRoute();
                        setMapBounds();
                    });
            } else {
                console.error('Error calculating optimal waypoints order:', data.message);
                showErrorPopup('An error occurred while calculating waypoints order.');
                currentMode = 'driving'; // Set mode to 'driving' on error
                calculateRoute();
                setMapBounds();
            }
        })
        .catch(error => {
            console.error('Error calculating waypoints order:', error);
            showErrorPopup('An error occurred while calculating waypoints order.');
            currentMode = 'driving'; // Set mode to 'driving' on error
            calculateRoute();
            setMapBounds();
        });
}

// Function to show an error popup
function showErrorPopup(errorMessage) {
    // Get the current map center
    var center = map.getCenter();

    // Display the error popup at the current center
    new mapboxgl.Popup()
        .setLngLat(center)
        .setHTML(errorMessage)
        .addTo(map);
}

// Function to set map's bounds to fit all locations and routes
function setMapBounds() {
    if (locations.length === 0) {
        return;
    }

    var bounds = new mapboxgl.LngLatBounds();

    locations.forEach(location => {
        bounds.extend(location.coordinates);
    });

    map.fitBounds(bounds, {
        padding: 100,
        maxZoom: 15,
    });
}

// Function to remove old route and waypoints markers
function removeOldMarkersAndRoute() {
    // Remove old route line
    if (map.getLayer('route')) {
        map.removeLayer('route');
    }
    if (map.getSource('route')) {
        map.removeSource('route');
    }


    // Remove optimized route if it exists
    if (map.getLayer('optimizedRoute')) {
        map.removeLayer('optimizedRoute');
    }
    if (map.getSource('optimizedRoute')) {
        map.removeSource('optimizedRoute');
    }


    // Remove old waypoint markers
    locations.forEach(location => {
        location.marker.remove();
    });
    locations = [];
}


var defaultZoom = 12; // Define the default zoom level

// Function to initiate the tour
function initiateTour() {
    var locationsCoordinates = locations.map(location => location.coordinates);


    // Zoom and flyover to the first location
    map.flyTo({
        center: locationsCoordinates[0],
        zoom: 22,
        bearing: 0,
        pitch: 60,
        speed: 0.6, // Speed of the flyover
        essential: true
    });

    // Fly to the remaining locations one by one with a time delay between transitions
    for (let i = 1; i < locationsCoordinates.length; i++) {
        setTimeout(() => {
            map.flyTo({
                center: locationsCoordinates[i],
                zoom: 22,
                bearing: 0,
                pitch: 60,
                speed: 0.6,
                essential: true
            });

            if (i === locationsCoordinates.length - 1) {
                // After the last location, initiate the zoom-out to the default zoom level
                setTimeout(() => {
                    map.flyTo({
                        center: locationsCoordinates[i],
                        zoom: defaultZoom,
                        bearing: 0,
                        pitch: 20,
                        speed: 0.6,
                        essential: true
                    });
                }, 6000); // Adjust time delay before zooming out (6 seconds in this example)
            }

        }, i * 7000); // Time delay between transitions (7 seconds in this example)
    }
}





// Add event listener for automatic addition of waypoints when users input a location
document.getElementById('locationInputs').addEventListener('change', async function (e) {
    if (e.target.tagName === 'INPUT' && e.target.name === 'location' && e.target.value.trim() !== '') {
        try {
            await geocodeAndAddWaypoint(e.target.value);
            setMapBounds(); // Set bounds based on new locations
        } catch (error) {
            // Handle errors here
        }
    }
});



document.getElementById('locationForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    // Clear old markers and route before adding new ones
    removeOldMarkersAndRoute();

    // Always set the mode to "driving"
    currentMode = "driving";

    var locationInputs = document.querySelectorAll('input[name="location"]');

    try {
        for (let i = 0; i < locationInputs.length; i++) {
            if (locationInputs[i].value.trim() !== '') {
                await geocodeAndAddWaypoint(locationInputs[i].value);
            }
        }
        setMapBounds(); // Set bounds based on new locations

        calculateRoute();
    } catch (error) {
        // Handle errors here
    }
});


var optimizeRouteButton = document.getElementById('optimizeRouteButton');

optimizeRouteButton.addEventListener('click', function () {
    calculateOptimalRoute();
});




var customMarker = map.loadImage(
    'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
    function (error, image) {
        if (error) throw error;
        map.addImage('custom-marker', image);
    }
);
