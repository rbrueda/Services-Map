//TO DO:
// - delete a marker with info window by letting user search up address and create function to search through delete the cooresponding object in storedArray

//Features:
// - info window feature displayed above (add image to infowindow?)
// - dropdown menu for with country, depending on which country someone buts on dropdown menu, the coordinaties will be placed accordingly
// - dropdown for user to put which type of service they like and markers will be filtered out
// - delete a key

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

async function initMap(index) {
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
    
      //will create a new event listener when marker is displayed on screen
      //the event listener will make info window dislay when corresponding marker is clicked
      google.maps.event.addListener(marker, 'click', function(event){
        //finds index that corresponds to the lat and lng
        index = storedArray.findIndex((location)=>(location.lat==event.latLng.lat() && location.lng==event.latLng.lng()));
        alert(index);

        // var inputElement = document.createElement('Button');
        // inputElement.type = "button";

        // inputElement.addEventListener('click', function(){
        //   deleteMarker(index);
        // });

        infowindow = new google.maps.InfoWindow({
          content: "<p>" + storedArray[index].business + "<br />" +
          storedArray[index].address + "<br />" + 
          storedArray[index].email + "<br /> " + storedArray[index].phone
           + "</p>" + "<br />" + '<form method="post"><input type="button" value="Delete" onClick="deleteMarker(\'' + index + '\')" /></form>'

           ,
        });

        infowindow.open(map, marker);
      });
    } 
  }
//calls initMap to create the new google maps interface
initMap();


//will go to function if button is clicked
function markersOnMap(){  
  //calls the method to geocode the address string
  geocode(document.getElementById('address').value);
}

//create geocoordinates to system -- modify from stackoverflow file
function geocode(address){ 
  //create variables for info window contents
  var businessName = document.getElementById('business');
  var addressName = document.getElementById('address');
  var emailName = document.getElementById('email');
  var phoneName = document.getElementById('phone');
  var serviceName = document.getElementById('category');
  //add if statement to check if all value was input before adding error message
  if (businessName && businessName.value && addressName && addressName.value && emailName
    && emailName.value && phoneName && phoneName.value && serviceName && serviceName.value){
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
          map: map,
          position: {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          },
          label: categoryLabel.get(document.getElementById('category').value),
          animation: google.maps.Animation.DROP,
          draggable:false,
        });
        alert("geocode function accessed");
          
        //create a new google maps infowindow object
        infowindow = new google.maps.InfoWindow({
          content: "<p>" + businessName.value + "<br />" +
          addressName.value + "<br />" + 
          emailName.value + "<br /> " + phoneName.value
          + "<br />" + "</p>",
        });
        //opens the new infowindow created with the corresponding map and marker
        infowindow.open(map, marker);

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
          business : businessName.value,
          address : addressName.value,
          email : emailName.value,
          phone : phoneName.value,
          service : serviceName.value,
        };
        console.log(JSON.stringify(location));

        //pushes the contents from location to current "storedArray" 
        storedArray.push(location);
        //sets the new storedArray into localStorage
        localStorage.setItem("storedArray", JSON.stringify(storedArray));
        alert(localStorage.getItem("storedArray"));
      
      }
      //if geocoding was not successful
      else {
        alert("Geocode was not successful for the following reasons" + status);
      }
    });
  }
  //if there were any user inquiries that will filled in
  else{
    alert("Not enough information to add to map");
  }  
}

//function to filter out markers based off service type
async function filterMarkers(){
  //starts with empty array every time
  var filteredArray = [];
  //get array from local storage with all of the objects
  var storedArray = JSON.parse(localStorage.getItem("storedArray"));
  //variable with service trying to search for
  var toSearch = document.getElementById('category2').value;

  //general function to check if object contains same value name
  const valueExists = (obj, value) => Object.keys(obj).some((key) => obj[key] === value);

  //looks through all objects in storedArray
  for (let i = 0; i < storedArray.length; i++){
    //checks if the object has name service name as one selected
    if (valueExists(storedArray[i], toSearch)){
      //push into the new array
      filteredArray.push(storedArray[i]);
    }
  }

  //create a new google maps instance
  const { Map } = await google.maps.importLibrary("maps");
  //creates a new instance of a google map with corresponding coordinates
  map = new Map(document.getElementById("map"), {
    //coordinates of windsor
    center: { lat: 42.3149, lng: -83.0364 },
    zoom: 10,
    mapTypeId: "terrain",

  });

    //loops through each object in filteredArray
    for (let i = 0; i < filteredArray.length; i++){
      const marker = new google.maps.Marker({
        //adds property from object as placeholders for values needed
        position: { lat: filteredArray[i].lat, lng:  filteredArray[i].lng},
        map: map,
        label: categoryLabel.get(filteredArray[i].service),
        title: "Windsor",
        draggable: false,
        animation: google.maps.Animation.DROP,
        
        // icon: "maps png" //change the markers by colour (inserting an image)
      });
    
      //will create a new event listener when marker is displayed on screen
      //the event listener will make info window dislay when corresponding marker is clicked
      google.maps.event.addListener(marker, 'click', function(event){
        //finds index that corresponds to the lat and lng
        index = filteredArray.findIndex((location)=>(location.lat==event.latLng.lat() && location.lng==event.latLng.lng()));
        infowindow = new google.maps.InfoWindow({
          content: "<p>" + filteredArray[index].business + "<br />" +
          filteredArray[index].address + "<br />" + 
          filteredArray[index].email + "<br /> " + filteredArray[index].phone
          + "<br />" + "</p>",
        });

        //to do: track index for storedArray when markers are filtered

        infowindow.open(map, marker);
      });
    } 
}

//find a way to validate through email address before deleting
async function deleteMarker(index){
  var storedArray = JSON.parse(localStorage.getItem("storedArray"));
  alert("button clicked on delete marker");
  //see if the gmail address gets transferred -- index is tranferred correctly!
  alert(index);
  alert(storedArray[index].email);
  //email is not sending-- figure out problem
  Email.send({
    //can use username and password-- however, this way is more secure
    SecureToken : "e530db2a-b166-4eba-ab25-fcf4021974d7",
    //add email for who you are sending it to
    To : 'mariatutoring3@gmail.com',
    From : 'servicemap418@gmail.com',
    Subject : "Verification for Deleting Service",
    Body : "This is a another test email!!",
})
    .then(function(message){
    alert("Email has been sent for verification! Please check spam folder");
    });


  
}


