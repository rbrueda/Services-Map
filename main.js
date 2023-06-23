// require('dotenv').config();
// console.log(process.env.APIKEY);

let map;
//used before attaining the environment variables


async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  map = new Map(document.getElementById("map"), {
    //coordinates of windsor
    center: { lat: 42.3149, lng: -83.0364 },
    zoom: 12,
    mapTypeId: "terrain",

  });
  //create markers
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
const infoWindow = new google.maps.InfoWindow({
  content: "<p>This is an info window</p>",
});
//access window open variable
infoWindow.open(map, marker);
}
initMap();



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