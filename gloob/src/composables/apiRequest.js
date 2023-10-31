function apiRequest() {
    fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=restaurant&name=harbour&key=', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer YourAccessToken',
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse response data as JSON
    })
    .then(data => {
        // Handle and use the data
        console.log(data);
    })
    .catch(error => {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
    });
}

// Call the function to initiate the API request
apiRequest();
