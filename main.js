let map;
//used before attaining the environment variables
let geocoder;
let respondseDiv;
let response;

var bounds, infowindow;

async function initMap() {
  //provides geographical coordinates corresponding to a location -- this is causing google maps platform to not pop up!

  const { Map } = await google.maps.importLibrary("maps");
  map = new Map(document.getElementById("map"), {
    //coordinates of windsor
    center: { lat: 42.3149, lng: -83.0364 },
    zoom: 12,
    mapTypeId: "terrain",

  });
  // geocoder = new google.maps.Geocoder();
  //create markers -- this will be added depending on businesses input of address information
  //will go to the markersOnMap function
  //plan= go through an arraylist which will go through all the elements in the array
  const marker = new google.maps.Marker({
    position: { lat: 42.3149, lng: -83.0364 },
    //which map we want to specify the marker
    map: map,
    label: "S", //possible way to categorize our stores?
    title: "Windsor",
    draggable: false,
    animation: google.maps.Animation.DROP,
    // icon: "maps png" //change the markers by colour (inserting an image)
  });
 //allows us to create infomration windows over the markers
  infowindow = new google.maps.InfoWindow({
  content: "<p>This is an info window</p>",
});
//access window open variable
infowindow.open(map, marker);
}
initMap();

//will go to function if button is clicked
function markersOnMap(){  
  //used to check if button was clicked 
  alert("Button clicked");

  //got address
  // var address = document.getElementById('address').value;
  alert(document.getElementById('address').value);
  // const coordinates = new Array(2);
  //calls the function to convert address to coordinates
  //just write "document.getElementbyId('address').value"
  geocode(document.getElementById('address').value);
  //calls function to find geocode address 
  // const marker = new google.maps.Marker({
  //   position: { lat: coordinates[0], lng: coordinates[1] },
  //   //which map we want to specify the marker
  //   map: map,
  //   label: "S", //possible way to categorize our stores?
  //   title: "New location",
  //   draggable: false,
  //   animation: google.maps.Animation.DROP,
  //   // icon: "maps png" //change the markers by colour (inserting an image)
  // });
  // //allows us to create infomration windows over the markers
  
  // //bring this code to the async function initMap()-- markersOnMap will return "marker"
  // infowindow = new google.maps.InfoWindow({
  //   content: "<p>This is an another window</p>",
  // });
  // infowindow.open(map, marker);
  //add these elements to arrayList

  //add marker based on address inputted
}

//practice address: 2384 Glenwood Ave, Windsor, ON, Canada

//create geocoordinates to system -- modify from stackoverflow file
function geocode(address){ 
  geocoder = new google.maps.Geocoder();
  geocoder.geocode( {'address': address}, function(results, status) {
    //comment this out?
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
          // lat: 42.3149, 
          // lng: -83.0364
        },
        draggable:false,
      });
      alert(lat, lng);
      alert(position);
      //get info typed from text box to popup window
      //infowindow.setContent(currentLocation[0]);
      infowindow = new google.maps.InfoWindow({
        content: "<p>This is another info window</p>",
      });
      infowindow.open(map, marker);
      alert("geocode function accessed");
    }
  else {
    alert("Geocode was not successful for the following reasons" + status);
  }
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