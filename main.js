//TO DO:
// - find a way to get info window to only display IF marker is clicked
//  -- do research on properties of info window on google maps
// - find a way to filter out certain services -- in other words create a function to search for service key and add the object into a new 
// variable to will temporaily hide storedArrays contents displayed on google maps and instead the new array of objects (idea: map a new map instance -- since it will be changed back to original during page refresh)
// - delete a marker with info window by letting user search up address and create function to search through delete the cooresponding object in storedArray

//Features:
// - info window feature displayed above (add image to infowindow?)
// - dropdown menu for with country, depending on which country someone buts on dropdown menu, the coordinaties will be placed accordingly
// - dropdown for user to put which type of service they like and markers will be filtered out

//Problems:



let map;
let geocoder;
let respondseDiv;
let response;

//create a hashmap to target service values to characters
//C = Cleaning
//F = Food 
//H = Hair
//IT = IT
//L = Legal
//Pe = Pests
//Pl = Plumbing
//R = Real Estate
//S = Security 
//Tl = Translation
//Tp = Transportation
//Tv = Travel
//Tu = Tutoring
//Y = Yardwork

//new hashmap that adds marker labels based on category
let categoryLabel = new Map([
  ["Cleaning", "C"],
  ["Food", "F"],
  ["Hair", "H"],
  ["IT", "IT"],
  ["Legal", "L"],
  ["Pests", "Pe"],
  ["Plumbing", "Pl"],
  ["Real Estate", "R"],
  ["Security", "S"],
  ["Translation", "Tl"],
  ["Transportation", "Tp"],
  ["Travel", "Tv"],
  ["Tutoring", "Tu"],
  ["Yardwork", "Y"]
]);

var bounds, infowindow;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  //creates a new instance of a google map with corresponding coordinates
  map = new Map(document.getElementById("map"), {
    //coordinates of windsor
    center: { lat: 42.3149, lng: -83.0364 },
    zoom: 10,
    mapTypeId: "terrain",

  });
  
    //parses the storedArray built through user credentials into an array of objects
    var storedArray = JSON.parse(localStorage.getItem("storedArray"));
    alert(localStorage.getItem("storedArray"));

    //loops through each object in storage array
    for (let i = 0; i < storedArray.length; i++){
      const marker = new google.maps.Marker({
        //adds property from object as placeholders for values needed
        position: { lat: storedArray[i].lat, lng:  storedArray[i].lng},
        map: map,
        label: categoryLabel.get(storedArray[i].service),
        title: "Windsor",
        draggable: false,
        animation: google.maps.Animation.DROP,
        
        // icon: "maps png" //change the markers by colour (inserting an image)
      });
    
      infowindow = new google.maps.InfoWindow({
        content: "<p>" + storedArray[i].business + "<br />" +
        storedArray[i].address + "<br />" + 
       storedArray[i].email + "<br /> " + storedArray[i].phone
       + "<br />" + "</p>",
      });
      //opens marker with its corresponding infowindow from object each time storedArray is iterated
      infowindow.open(map, marker);
    }
  
  }
//calls initMap to create the new google maps interface
initMap();


//for the future, make a function that will search for a certain category, such that will be what will be displayed on the screen

//will go to function if button is clicked
function markersOnMap(){  
  //calls the method to geocode the address string
  geocode(document.getElementById('address').value);
}

//create geocoordinates to system -- modify from stackoverflow file
function geocode(address){ 

  //adds marker to base map
  initMap();
  //calls the google maps geocoder method
  geocoder = new google.maps.Geocoder();
  //makes the request
  geocoder.geocode( {'address': address}, function(results, status) {
    //checks if geocoding status is valid (ie if address was able to geocode)
    if (status == google.maps.GeocoderStatus.OK) {
      //create a new google maps marker object
      var marker = new google.maps.Marker({
        //adds corresponding elements comprised for the marker
        //for the future -- add marker label based on category
        map: map,
        position: {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        },
        animation: google.maps.Animation.DROP,
        draggable:false,
      });
      //create a new google maps infowindow object
      infowindow = new google.maps.InfoWindow({
        content: "<p>" + document.getElementById('business').value + "<br />" +
         document.getElementById('address').value + "<br />" + 
         document.getElementById('email').value + "<br /> " + document.getElementById('phone').value
        + "<br />" + "</p>",
      });
      //opens the new infowindow created with the corresponding map and marker
      infowindow.open(map, marker);
      alert("geocode function accessed");
    }
    //if geocoding was not successful
    else {
      alert("Geocode was not successful for the following reasons" + status);
    }
  
    //gets the current localStorage contents for "storedArray" and assigns it to storedArray
    //use JSON.parse to parse to original format of object assigned to it
    var storedArray = JSON.parse(localStorage.getItem("storedArray"));
    //if there are no contents found in "storedArray"
    if (storedArray === null){
      storedArray = [];
    }

    //creates a location object that stores the attributes credentials inputted from user
    var location = {
      lat : results[0].geometry.location.lat(),
      lng : results[0].geometry.location.lng(),
      business : document.getElementById('business').value,
      address : document.getElementById('address').value,
      email : document.getElementById('email').value,
      phone : document.getElementById('phone').value,
      service : document.getElementById('category').value,
    };
    console.log(JSON.stringify(location));

    //pushes the contents from location to current "storedArray" 
    storedArray.push(location);
    //sets the new storedArray into localStorage
    localStorage.setItem("storedArray", JSON.stringify(storedArray));
    alert(localStorage.getItem("storedArray"));

  });
  
}