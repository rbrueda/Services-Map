//TO DO:
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
//global arrays -- make local of otehr thing works

//create a hashmap to target service values to characters
//C = cleaning
//F = food 
//H = hair
//IT = it consulting
//L = legal services
//Pe = pest control
//Pl = plumbing
//R = real estate
//S = security 
//Tp = transportation
//Tv = travel
//Tu = tutoring
//Y = yard

//created a dictionary -- do make the information more neatly displayed
function Dictionary(){
  this.datastore = []; 

  this.add = function(lat, lng, businessList, addressList, emailList, phoneList, serviceList){
    
  };
  //might use this method -- to add a feature to delete a key (based on address) -- user types the address in a textbox
  this.removeAt = function(addressList){
    for (var i = 0; i < this.datastore.length; i++){
      if (this.datastore[i].address === addressList){
        this.datastore.splice(this.dataStore[i], 1);
        return this.datastore;
      }
    }
    return this.datastore;
  }

  //might be good for hidding certain markers
  this.findAt = function(serviceList){
    for (var i = 0; i < this.datastore.length; i++){
      if (this.datastore[i].service === serviceList){
        hiddenIndexes.push(i);
      }
    }
  }

  this.size = function(){
    return this.datastore.length;
  };
}

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
    // alert(localStorage.getItem('lat'));
    // let latArray = parseString(localStorage.getItem('lat'));
    // alert(latArray);
    // let lngArray = parseString(localStorage.getItem('lng'));
    // let businessArray = parseString(localStorage.getItem('business'));
    // let addressArray = parseString(localStorage.getItem('address'));
    // let emailArray = parseString(localStorage.getItem('email'));
    // let phoneArray = parseString(localStorage.getItem('phone'));
    // let categoryArray = parseString(localStorage.getItem('category'));
    var storedArray = JSON.parse(localStorage.getItem("storedArray"));

    for (let i = 0; i < storedArray.length; i++){
      const marker = new google.maps.Marker({
        position: { lat: storedArray[i].lat, lng:  storedArray[i].lng},
        //which map we want to specify the marker
        map: map,
        label: "Sl", //possible way to categorize our stores?
        title: "Windsor",
        draggable: false,
        animation: google.maps.Animation.DROP,
        
        // icon: "maps png" //change the markers by colour (inserting an image)
      });
      //contents for each location
    
    
      //gets a specific index from the array of business names
      // let businessArray = localStorage.getItem('business');
      // let businessName = JSON.parse(businessArray);
    
      infowindow = new google.maps.InfoWindow({
        content: "<p>" + storedArray[i].business + "<br />" +
        storedArray[i].address + "<br />" + 
       storedArray[i].email + "<br /> " + storedArray[i].phone
       + "<br />" + "</p>",
      });
      infowindow.open(map, marker);
    }
  
  }


initMap();

//will parse string from local storage into an array
function parseString(str){
  alert(str);
  let array = str;
  alert(str.includes("/"));
  if (str.includes("/")){
    array = str.split("/");
  }
  let parse = JSON.parse(array);
  alert(parse);
  return parse;
}

//for the future, make a function that will search for a certain category, such that will be what will be displayed on the screen

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
      var marker = new google.maps.Marker({
        map: map,
        position: {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        },
        animation: google.maps.Animation.DROP,
        draggable:false,
      });
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
    //clear original contets from the array

    var storedArray = JSON.parse(localStorage.getItem("storedArray"));
  alert(storedArray == null);
    if (storedArray === null){
      storedArray = [];
    }

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


    storedArray.push(location);
    localStorage.setItem("storedArray", JSON.stringify(storedArray));
    alert(localStorage.getItem("storedArray"));

  });
  
}