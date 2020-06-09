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
    zoom: 8
  });
};

// Append the 'script' element to 'head'.
document.head.appendChild(script);
      