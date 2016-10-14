var Key = require('../client/src/models/keys');
var key = new Key();

var DarkSky = function(){

};

DarkSky.prototype = {
  makeRequest: function(latlng, Clock, callback){
    var request = new XMLHttpRequest();
    var url = "https://api.darksky.net/forecast/"+key.darkSkyKey+"/"+latlng.lat()+","+latlng.lng()+"?units=uk2";
    request.open("GET", url);
    request.onload = function(){
       var weatherData = JSON.parse( this.responseText );
       localStorage.setItem("offset", weatherData.offset);
       var clock = new Clock();
       clock.startClock();
       callback(weatherData);
      };
    request.send();
  }
  
};

module.exports = DarkSky;