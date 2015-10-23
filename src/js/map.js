function initialize() {
  var mapOptions = {
    zoom: 15,
    center: new google.maps.LatLng(59.9362, 30.3211)
  }
  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  var image = "../img/map-marker.svg"
  var myLatLng = new google.maps.LatLng(59.9362, 30.3211);
  var beachMarket = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon:image
  });
}
google.maps.event.addDomListener(window, 'load', initialize);