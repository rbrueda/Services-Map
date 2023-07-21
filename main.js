//TO DO:
// - add marker object and info window object to an array (such that when initMap is called (during startup -- all markers are shown))
// - make it work with multiple addresses
//    - use cookies??
// - find a way to get info window to only display IF marker is clicked

//Features:
// - info window feature displayed above (add image to infowindow?)
// - dropdown menu for with country, depending on which country someone buts on dropdown menu, the coordinaties will be placed accordingly
// - dropdown for user to put which type of service they like and markers will be filtered out

//Problems:
// - adds like a string, is not added as an array of strings (for localstorage)
// - will only add to the array when not refreshed -- ie localStorage will only override the new array (hence why it is not acting like an array)


let map;
let geocoder;
let respondseDiv;
let response;
//global array -- wont stringify?? -- for future purposes, could put all these attributes in one object named place
let locations = [];
let lat = [];
let lng = [];
let businessList = [];
let addressList = [];
let emailList = [];
let phoneList = [];
let serviceList = [];


var bounds, infowindow;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  map = new Map(document.getElementById("map"), {
    //coordinates of windsor
    center: { lat: 42.3149, lng: -83.0364 },
    zoom: 10,
    mapTypeId: "terrain",

  });
  geocoder = new google.maps.Geocoder();
  //create markers -- this will be added depending on businesses input of address information
  //will go to the markersOnMap function
  //plan= go through an arraylist which will go through all the elements in the array

  //problem: array size is reset to 0 when page refreshes
  //To do: find a way to create array that stays constant even after recompiling (local storage array)
  const marker = new google.maps.Marker({
    position: { lat: parseFloat(JSON.parse(localStorage.getItem('lat'))), lng:  parseFloat(JSON.parse(localStorage.getItem('lng')))},
    //which map we want to specify the marker
    map: map,
    label: "S", //possible way to categorize our stores?
    title: "Windsor",
    draggable: false,
    animation: google.maps.Animation.DROP,
    
    // icon: "maps png" //change the markers by colour (inserting an image)
  });
  alert(localStorage.getItem('business'));
  alert(localStorage.getItem('address'));
  alert(localStorage.getItem('email'));
  alert(localStorage.getItem('phone'));


  //gets a specific index from the array of business names
  let businessArray = localStorage.getItem('business');
  let businessName = JSON.parse(businessArray);

  infowindow = new google.maps.InfoWindow({
    content: "<p>" + businessName[0] + "<br />" +
    JSON.parse(localStorage.getItem('address')) + "<br />" + 
    JSON.parse(localStorage.getItem('email')) + "<br /> " + JSON.parse(localStorage.getItem('phone'))
   + "<br />" + "</p>",
  });
  infowindow.open(map, marker);

}
initMap();

//will go to function if button is clicked
function markersOnMap(){  
  //used to check if button was clicked 
  alert("Button clicked");
  geocode(document.getElementById('address').value);
}

//practice address: 3120 Dougall Ave, Windsor, ON, Canada
// 3195 Howard Ave, Windsor, ON, Canada

//create geocoordinates to system -- modify from stackoverflow file
function geocode(address){ 
  //adds marker to base map
  initMap();
  geocoder = new google.maps.Geocoder();
  geocoder.geocode( {'address': address}, function(results, status) {
    //checks if geocode project is good 
    if (status == google.maps.GeocoderStatus.OK) {
      //this is where error occurs
      alert(results[0])
      // map.SetCenter(results[0].geometry.location); 
      //variable is never accessed
      var marker = new google.maps.Marker({
        map: map,
        position: {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        },
        animation: google.maps.Animation.DROP,
        draggable:false,
      });
      //get info typed from text box to popup window
      //infowindow.setContent(currentLocation[0]);
      infowindow = new google.maps.InfoWindow({
        content: "<p>" + document.getElementById('business').value + "<br />" +
         document.getElementById('address').value + "<br />" + 
         document.getElementById('email').value + "<br /> " + document.getElementById('phone').value
        + "<br />" + "</p>",
      });
      infowindow.open(map, marker);
      alert("geocode function accessed");
    }
    else {
      alert("Geocode was not successful for the following reasons" + status);
    }
    lat.push(results[0].geometry.location.lat());
    localStorage.setItem('lat', JSON.stringify(lat));

    lng.push(results[0].geometry.location.lng());
    localStorage.setItem('lng', JSON.stringify(lng));

    businessList.push(document.getElementById('business').value);
    //prints out as a string not a array -- only if you credentals saved in array if page does not refresh
    //if page is refreshed, and user inputs other credential, it will be overriden
    alert(businessList);   
    localStorage.setItem('business', JSON.stringify(businessList));

    alert((document.getElementById('address').value));
    addressList.push((document.getElementById('address').value));
    alert(addressList);
    localStorage.setItem('address', JSON.stringify(addressList));

    emailList.push(document.getElementById('email').value);
    localStorage.setItem('email', JSON.stringify(emailList));

    phoneList.push(document.getElementById('phone').value);
    localStorage.setItem('phone', JSON.stringify(phoneList));

    serviceList.push(document.getElementById('category').value);
    localStorage.setItem('category', JSON.stringify(serviceList));

    
    
  });


}







// const express = require('express');
// const app = express();


//used before attaining the environment variables
// require('dotenv').config();

// var myKey = config.APIKEY;



// // APIKEY = process.env.APIKEY;
// console.log(process.env.APIKEY);

// //require library browserify
// var browserifly = require('browserify');

// //define express framework
// const express = require('express');
// //define cors
// // const cors = require("cors");
// //define app -- express being called in action
// const app = express();
// //port that we are listening on
// // const port = 5500;

// app.listen(5500, ()=> {
//     console.log("started");
// });

//points to the google maps folder --index.js found in google-map folder will launch by default
// const googleMap = require("./google-map");

//enable the json middleware of every route we are listening on
// app.use(express.json());

// app.use(cors());

// //test route
// app.get("/", (req, res) => res.json({ success: "Hello World!" }));

//get the google-map route
// app.use("./google-map", googleMap);

// app.listen(port, () => console.log(`App listening on port ${port}'`));

//set up our api to access our environment file

// let map;

// async function initMap() {
//   const { Map } = await google.maps.importLibrary("maps");
//   map = new Map(document.getElementById("map"), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 8,
//   });
// }

// initMap();