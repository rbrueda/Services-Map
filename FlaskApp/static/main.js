//Features:
// - input boxes where users can input credentials and click "submit" when done
// - info window pop up when marker is clicked
// - info window containing information such as, name of business, phone number, address, email, type of service, website url, image of business,..
// - Users can also search for services using the drop-down button and clicking "find" button
// - Users can delete a key by clicking on a marker to get the info window and clicking the "delete" button
//    - to ensure that the marker was not deleted by someone else, a 2-step verification is used that sends an verification code to the service email
// - help button is displayed on the top of page if users have any concerns or want to know more about the service-map platform
// - incorportated the use of regular expressions to ensure correct format of email, phone and address are being used when user inputs credentials
// - when user clicks "Credentials Shortcut" button after inserting url link in website input field, some of credentials (such as email, phone number, address) may get autofilled

//Problems (if occur):
// - if problem happens with local storage (ie., objects stored in browser cache are not correctly displaying as markers on the screen)- clear it!
// - if you need to delete a specific marker search for a specific attribute iterating through hte list of objects (for example iterating through to check for the email),
//    return the index and use storedArray.splice(index, 1)

//Things to better improve program (not using though):
// - translation api -- other machine learning apis --need to pay for google translation api and/or a public domain
// - auto typing with google contacts -- need validation from google
// - asking user which region you live in which will redirect you to a server with the services in that region
// - add image to info post -- causes a security issues with accessing file path on users computer

// Important notes:
//  - the regular expressions used in "main.js" and "app.py" only work for limitted test cases (for example may not validate phone numbers in some formats), if new restrictions or add-ons are needed, feel free to alter them

//Creator: Rocio Rueda, 2023

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

        // var inputElement = document.createElement('Button');
        // inputElement.type = "button";

        // inputElement.addEventListener('click', function(){
        //   deleteMarker(index);
        // });

        //use ternary operator to check if object has url or if it is undefined (ie., wont be added to info window)
        //used a href tags to display links where needed in the info window
        infowindow = new google.maps.InfoWindow({
          content: "<p>" + (storedArray[index].url != undefined ? storedArray[index].business + "<br />" + "<br />" + "Website: " + '<a href="' + storedArray[index].url + '">' + storedArray[index].url +'</a>' + "<br />" + 
          storedArray[index].address + "<br />" + 
          '<a href="mailto:' + storedArray[index].email + '">' + storedArray[index].email +'</a>' + "<br /> " + '<a href="tel:' + storedArray[index].phone + '">' + storedArray[index].phone +'</a>'
           + "</p>" + "<br />" + '<form method="post"><input type="button" value="Delete" onClick="deleteMarker(\'' + index + '\')" /></form>'
           + "<br />" + 'Verification Code: <input type="text" name="verication_code" id="verication" + >' + '<form method="post"><input type="button" value="Verify" id="verifybtn" /></form>' : 
           storedArray[index].business + "<br />" + "<br />" + 
          storedArray[index].address + "<br />" + 
          '<a href="mailto:' + storedArray[index].email + '">' + storedArray[index].email +'</a>' + "<br /> " + '<a href="tel:' + storedArray[index].phone + '">' + storedArray[index].phone +'</a>'
           + "</p>" + "<br />" + '<form method="post"><input type="button" value="Delete" onClick="deleteMarker(\'' + index + '\')" /></form>'
           + "<br />" + 'Verification Code: <input type="text" name="verication_code" id="verication" + >' + '<form method="post"><input type="button" value="Verify" id="verifybtn" /></form>' ) 

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
     if (confirm("Are you sure? You can't go back!") == true) {
         geocode(document.getElementById('address').value);
     } else {
      
     }
}

//create geocoordinates to system -- modify from stackoverflow file
function geocode(address){ 
  //create variables for info window contents
  var businessName = document.getElementById('business');
  var addressName = document.getElementById('address');
  var emailName = document.getElementById('email');
  var phoneName = document.getElementById('phone');
  var serviceName = document.getElementById('category');
  var urlName = document.getElementById('name');

   //validate email name
 //+ : means one or more occurences of that character
 var regx = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/
 //validate phone number
 var regx2 = /^[\+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s\.]?)[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
 //add if statement to check if all value was input before adding error message
 if (businessName && businessName.value && addressName && addressName.value && regx.test(emailName.value) && emailName
   && emailName.value && regx2.test(phoneName.value) && phoneName && phoneName.value && serviceName && serviceName.value){

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
          
        //create a new google maps infowindow object
        infowindow = new google.maps.InfoWindow({
          content: "<p>" + (urlName.value != undefined ? businessName.value + "<br />" + "<br />" + "Website: " + '<a href="' + urlName.value + '">' + urlName.value +'</a>' + "<br />" + 
          addressName.value + "<br />" + 
          '<a href="mailto:' + emailName.value + '">' + emailName.value +'</a>' + "<br /> " + '<a href="tel:' + phoneName.value + '">' + phoneName.value +'</a>'
           + "</p>" : 
           businessName.value + "<br />" + "<br />" + 
          addressName.value + "<br />" + 
          '<a href="mailto:' + emailName.value + '">' + emailName.value +'</a>' + "<br /> " + '<a href="tel:' + phoneName.value + '">' + phoneName.value +'</a>' +
           "</p>")
           ,
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
          url : urlName.value,
          business : businessName.value,
          address : addressName.value,
          email : emailName.value,
          phone : phoneName.value,
          service : serviceName.value,
        };

        //pushes the contents from location to current "storedArray" 
        storedArray.push(location);
        //sets the new storedArray into localStorage
        localStorage.setItem("storedArray", JSON.stringify(storedArray));
      
      }
      //if geocoding was not successful
      else {
        alert("Geocode was not successful for the following reasons" + status);
      }
    });
  }
  //if there were any user inquiries that will filled in
  else{
    if (!regx.test(emailName.value)){
      alert("Invalid email");
    }
    if (!regx2.test(phoneName.value)){
      alert("Invalid phone number/format");
    }
    if (!businessName || !businessName.value || !addressName || !addressName.value || !emailName
    || !emailName.value || !phoneName || !phoneName.value || !serviceName || !serviceName.value){
      alert("Not enough information to add to map");
    }
    
  }  
}

//function to filter out markers based off service type
async function filterMarkers(){
  var indexes = []
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
      indexes.push(i);
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
          content: "<p>" + (filteredArray[index].url != undefined ? filteredArray[index].business + "<br />" + "<br />" + "Website: " + '<a href="' + filteredArray[index].url + '">' + filteredArray[index].url +'</a>' + "<br />" +
          filteredArray[index].address + "<br />" + 
          '<a href="mailto:' + filteredArray[index].email + '">' + filteredArray[index].email +'</a>' + "<br /> " + '<a href="tel:' + filteredArray[index].phone + '">' + filteredArray[index].phone +'</a>'
           + "</p>" + "<br />" + '<form method="post"><input type="button" value="Delete" onClick="deleteMarker(\'' + index + '\')" /></form>'
           + "<br />" + 'Verification Code: <input type="text" name="verication_code" id="verication" + >' + '<form method="post"><input type="button" value="Verify" id="verifybtn" /></form>' : 
           filteredArray[index].business + "<br />" + "<br />" + 
           filteredArray[index].address + "<br />" + 
           '<a href="mailto:' + filteredArray[index].email + '">' + filteredArray[index].email +'</a>' + "<br /> " + '<a href="tel:' + filteredArray[index].phone + '">' + filteredArray[index].phone +'</a>'
           + "</p>" + "<br />" + '<form method="post"><input type="button" value="Delete" onClick="deleteMarker(\'' + index + '\')" /></form>'
           + "<br />" + 'Verification Code: <input type="text" name="verication_code" id="verication" + >' + '<form method="post"><input type="button" value="Verify" id="verifybtn" /></form>' )  + '</p>'

           ,
        });


        //to do: track index for storedArray when markers are filtered

        infowindow.open(map, marker);
      });
    } 
}

//find a way to validate through email address before deleting
async function deleteMarker(index){
  var storedArray = JSON.parse(localStorage.getItem("storedArray"));
  
  let otp_val = Math.floor(Math.random()*10000);

  let emailBody = `
    <h1>Hi there! A request has been sent to delete service. Here is verification code:</h1> </br>
    <h2>Your OTP is </h2>${otp_val}
  `

  Email.send({
    //can use username and password-- however, this way is more secure
    SecureToken : "e530db2a-b166-4eba-ab25-fcf4021974d7",
    //add email for who you are sending it to
    To : storedArray[index].email,
    From : 'servicemap418@gmail.com',
    Subject : "Verification for Deleting Service",
    Body : emailBody,
})
//if success returns ok
    .then(function(message){
    alert("Email has been sent with verification code! Please check spam folder");

    //now making otp input visible
      const otp_inp = document.getElementById('verication');
      const otp_btn = document.getElementById('verifybtn');


      otp_btn.addEventListener('click', ()=>{
        //check whether sent email is valid
        if (otp_inp.value == otp_val){
          alert("Verification worked! Service is deleted from map!");
          //takes aways that object from storedArray and updates localstorage
          //removing object form array is causing issues - fix tomorrow
          storedArray.splice(index, 1);
          localStorage.setItem("storedArray", JSON.stringify(storedArray));


          //updates map to screen
          initMap();
        }
        else{
          alert("Invalid verification code");
        }
      })

    });

//     if(document.getElementById('button').clicked == true)
// {
//    alert("button was clicked");
// }


  
}

//opens the pop up window in the many ways in which pop up window is activated
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
//get the content from overlay
const overlay = document.getElementById('overlay');

//listener when help button is clicked
openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    //get content from modal
    const modal = document.querySelector(button.dataset.modalTarget);
    //creates the function that is going to pass modal as parameter
    openModal(modal);
  })
})

overlay.addEventListener('click', () => {
  //get all of the modals open at are active
  const modals = document.querySelectorAll('.modal.active');
  //close all the active modals
  modals.forEach(modal => {
    closeModal(modal);
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    //closest parent element of this modal -- in this class is will search for classname "modal" and return it
    const modal = button.closest('.modal');
    closeModal(modal);
  })
})

function openModal(modal) {
  //if there is nothing in modal
  if (modal == null) return;
  //add a class to modal -- add the active class
  modal.classList.add('active');
  //add a class to overlay -- add the active class
  overlay.classList.add('active');
}

function closeModal(modal) {
  if (modal == null) return;
  //same thing as openModal except it removes the class
  modal.classList.remove('active');
  overlay.classList.remove('active');
}


