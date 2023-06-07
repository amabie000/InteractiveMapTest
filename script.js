// Template conceptualized by Lizhi Peng, University of Washington
// Initialize your map with Leaflet.js and set it to University of Washington, Seattle
var map = L.map('map').setView([47.655548, -122.303200], 13);


// Add a tile layer to the map (Mapbox Streets layer)
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; OpenStreetMap contributors, CC-BY-SA, Imagery © Mapbox',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYW1hYmllIiwiYSI6ImNsaWxhZGZ2NDA2c2szcnFwM3M4cndwNWkifQ.c-3RpmSd7TY5cLbS_KF1zQ' // replace with your Mapbox access token
}).addTo(map);


// Add a contextmenu event listener (right-click)
map.on('contextmenu', function(e) {
    // Get the geographic coordinates from the event
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;


    // Construct the prefilled form URL
    var formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfSHBM_HSUU5kR--wH2Gbqd2nYaHJ5sdoAgUr1awYZdQ8hWeg/viewform?usp=pp_url';
    formUrl += '&entry.1381225094=' + lat;
    formUrl += '&entry.102830186=' + lng;


    // Create a popup at the clicked location with a link to the form
    var popup = L.popup()
        .setLatLng(e.latlng)
        .setContent('<a href="' + formUrl + '" target="_blank">Submit a Contribution</a>')
        .openOn(map);
});

// Fetch data from Google Spreadsheet
fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRuOsnWzOa4supR892usPTIQZA4bw5twX8IQD-_y1PPQgxsiQ_veDHXkf7RTKsFUBVUFllcZ16L_CJ_/pub?output=csv')
    .then(response => response.text())
    .then(data => {
        // Parse the CSV data
        let csvData = Papa.parse(data, {header: true}).data;


        // Iterate over each row in the data
        for (let row of csvData) {
            // Get the latitude and longitude from the row
            let lat = row['Lat'];
            let lng = row['Long'];
            let name = row['Name'];
            let experience = row['What Happened Here'];


            // Add a marker to the map at the latitude and longitude
            L.marker([lat, lng]).addTo(map)
                .bindPopup(`<b>${name}</b><br>${experience}`);
        }
    });
