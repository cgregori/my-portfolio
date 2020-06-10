// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Create the script tag, set the appropriate attributes.
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBZEIox0K6Zue0NCKBdl9FnaknqcBGd4Z4&callback=initMap';
script.defer = true;
script.async = true;

// Attach your callback function to the `window` object.
window.initMap = function() {
  // JS API is loaded and available.
  map = new google.maps.Map(document.getElementById('map'), {
    // Centered on New York.
    center: {lat: 40.7128, lng: -74.0060},
    zoom: 14,
    // Retro styled map.
    styles: [
      {"elementType": "geometry", "stylers": [{"color": "#ebe3cd"}]},
      {"elementType": "labels.text.fill", "stylers": [{"color": "#523735"}]},
      {"elementType": "labels.text.stroke", "stylers": [{"color": "#f5f1e6"}]},
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#c9b2a6"}]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#dcd2be"}]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#ae9e90"}]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [{"color": "#dfd2ae"}]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{"color": "#dfd2ae"}]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#93817c"}]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#a5b076"}]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#447530"}]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{"color": "#f5f1e6"}]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{"color": "#fdfcf8"}]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{"color": "#f8c967"}]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#e9bc62"}]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [{"color": "#e98d58"}]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#db8555"}]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#806b63"}]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{"color": "#dfd2ae"}]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#8f7d77"}]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [{"color": "#ebe3cd"}]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{"color": "#dfd2ae"}]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#b9d3c2"}]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#92998d"}]
      }
    ]
  });

  var sobaIcon = {
    url: 'https://www.pngkey.com/png/detail/18-184183_clip-art-royalty-free-stock-ramen-chinese-cuisine.png',
    scaledSize: new google.maps.Size(40,30)
  };
  // Centered on Oh! Taisho restaurant
  var marker = new google.maps.Marker({
    position: {lat: 40.729383, lng: -73.989111},
    icon: sobaIcon, 
    title: "Oh! Taisho",
    map: map
  });

  //TODO(cgregori): Add more markers to good restaurants in NYC 

};

// Append the 'script' element to 'head'.
document.head.appendChild(script);

/** Gets Maps API key from Datastore */
function retrieveApiKey() {
  //TODO(cgregori): Secure api key using Datastore entity
}