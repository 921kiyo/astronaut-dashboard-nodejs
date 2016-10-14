var IssPassOverApi = require('../../../api/issPassOverApi');

var Map =  function( container, centre, zoom ){

  this.googleMap = new google.maps.Map( container, {
    center: centre,
    zoom: zoom
  });

  var marker;
  // TODO: pass addFancyMarker into createMarker function
  // This is to create marker for a country
  this.createMarker = function(){
    marker = new google.maps.Marker({
      map: this.googleMap,
      position: this.googleMap.center,
      animation: google.maps.Animation.DROP
    });
  };
  // This is for ISS marker
  this.addFancyMarker = function(image){
    marker.setIcon("http://localhost:3000/public/ISS-white.jpg");
  };


  this.addClickListener = function(){
    var self = this;
    google.maps.event.addListener(this.googleMap, "click", function( event ){
      var newCoords = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      marker.setPosition(newCoords);

      self.geocodeLatLng();

    });
  };


  var info_window;  
  // This is for ISS Location
  this.addMarker = function(coordinates) {   
      var marker2 = new google.maps.Marker({map: this.googleMap, position: coordinates, animation: google.maps.Animation.DROP});
        info_window = new google.maps.InfoWindow({});
        info_window.open(this.googleMap, marker2);      
  };

  // This is for ISS Location
  this.updateWindow = function(content){
    console.log("update window called");
    info_window.setContent(content);
  };


  // this function if for ISS location
  this.addClickEvent = function(){
    var self = this; // self is map
    google.maps.event.addListener(this.googleMap, 'click', function(event){
      var position = { lat: event.latLng.lat() , lng: event.latLng.lng()};
      this.addMarker(position);
      var issPassOverApi = new IssPassOverApi();
      var issPassOver = issPassOverApi.makeRequest(position, self);
    }.bind(this));
  };

  


  this.markerPosition = function(){
    return marker.position;
  };

  // Get country name based on latitute and longitute
  this.geocodeLatLng = function(){
    
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({"location": marker.position}, function( results, status ){
      console.log(results);
      localStorage.setItem("country", results[results.length -1 ].formatted_address);
      localStorage.setItem("region and country", results[results.length -2 ].formatted_address);
      console.log(localStorage.getItem("country"));
    });
  };

  this.setMarker = function(coords){
    marker.setPosition(coords);
  };
};

module.exports = Map;