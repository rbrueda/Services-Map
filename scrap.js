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