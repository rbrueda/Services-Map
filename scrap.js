function mapAddress(currentLocation, bounds) {
    var geocoder = new google.maps.Geocoder();
    var address = currentLocation[1];
  
    geocoder.geocode({
      "address": address
    }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
          draggable: false
        });
  
        bounds.extend(marker.position);
        map.fitBounds(bounds);
  
        //do we need this?
        google.maps.event.addListener(marker, "click", function() {
          infowindow.setContent(currentLocation[0]);
          infowindow.open(map, marker);
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }


  function geocode(address){
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode( {'address': address}, function(results, status) {
    //comment this out?
    // if (status == google.maps.GeocoderStatus.OK) {
      map.SetCenter(results[0].geometry.location);
      //variable is never accessed
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        dragabble:false,
      });
    });
  // });
  // //returns the longitude and laitude coordinates
  // return [latitude, longitude];
  alert("geocode function accessed"); 
  infowindow = new google.maps.InfoWindow({
    content: "<p>This is another info window</p>",
  });
  infowindow.open(map, marker);

}


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
    alert(localStorage.getItem('lat'));
    let latArray = parseString(localStorage.getItem('lat'));
    alert(latArray);
    let lngArray = parseString(localStorage.getItem('lng'));
    let businessArray = parseString(localStorage.getItem('business'));
    let addressArray = parseString(localStorage.getItem('address'));
    let emailArray = parseString(localStorage.getItem('email'));
    let phoneArray = parseString(localStorage.getItem('phone'));
    let categoryArray = parseString(localStorage.getItem('category'));
  
    for (let i = 0; i < latArray.length; i++){
      const marker = new google.maps.Marker({
        position: { lat: parseFloat(latArray[i]), lng:  parseFloat(lngArray[i])},
        //which map we want to specify the marker
        map: map,
        label: "Sl", //possible way to categorize our stores?
        title: "Windsor",
        draggable: false,
        animation: google.maps.Animation.DROP,
        
        // icon: "maps png" //change the markers by colour (inserting an image)
      });
      //contents for each location
      alert(localStorage.getItem('category'));
    
    
      //gets a specific index from the array of business names
      // let businessArray = localStorage.getItem('business');
      // let businessName = JSON.parse(businessArray);
    
      infowindow = new google.maps.InfoWindow({
        content: "<p>" + businessArray[i] + "<br />" +
        addressArray[i] + "<br />" + 
       emailArray[i] + "<br /> " + phoneArray[i]
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
  let lat = [];
  let lng = [];
  let businessList = [];
  let addressList = [];
  let emailList = [];
  let phoneList = [];
  let serviceList = [];
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
    lat.push(results[0].geometry.location.lat());
    localStorage.setItem('lat', JSON.parse(localStorage.getItem('lat')) + '/' + lat.toString());
    alert(localStorage.getItem('lat'));

    lng.push(results[0].geometry.location.lng());
    localStorage.setItem('lng', JSON.parse(localStorage.getItem('lng')) + '/' + lng.toString());
    alert(localStorage.getItem('lng'));

    businessList.push(document.getElementById('business').value);
    //prints out as a string not a array -- only if you credentals saved in array if page does not refresh
    //if page is refreshed, and user inputs other credential, it will be overriden
    //try JSON.parse
    localStorage.setItem('business', JSON.parse(localStorage.getItem('business')) + '/' + JSON.string(businessList);
    alert(localStorage.getItem('business'));

    addressList.push(document.getElementById('address').value);
    localStorage.setItem('address', JSON.parse(localStorage.getItem('address')) + '/' + addressList.toString());
    alert(localStorage.getItem('address'));

    emailList.push(document.getElementById('email').value);
    localStorage.setItem('email', JSON.parse(localStorage.getItem('email')) + '/' + emailList.toString());
    alert(localStorage.getItem('email'));

    phoneList.push(document.getElementById('phone').value);
    localStorage.setItem('phone', JSON.parse(localStorage.getItem('phone')) + '/' + phoneList.toString());
    alert(localStorage.getItem('phone'));

    serviceList.push(document.getElementById('category').value);
    localStorage.setItem('category', JSON.parse(localStorage.getItem('category')) + '/' + serviceList.toString());
    alert(localStorage.getItem('service'));

  });

}