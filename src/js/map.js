(function() {
  function initialize() {
    var mapOptions = {
      disableDefaultUI: true,
      zoom: 15,
      center: new google.maps.LatLng(59.9365, 30.3211)
    }
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    if (!map) {
      return;
    }
    var image = "../img/map-marker.svg"
    var myLatLng = new google.maps.LatLng(59.9362, 30.3211);
    var beachMarket = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon:image
    });
  }
  google.maps.event.addDomListener(window, 'load', initialize);
})();