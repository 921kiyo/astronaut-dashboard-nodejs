var Map = require('../client/src/models/map')

var IssPassOverApi = function(){} 

var myDate;
var time; 

IssPassOverApi.prototype = {
  makeRequest: function(position, map){

    url = "http://api.open-notify.org/iss-pass.json?lat=" +position.lat + "&lon=" + position.lng;
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function(){
      if(this.status !== 200) {
        return;
      }
      json = this.responseText;
      var parsedJson = JSON.parse(json);
      time = (parsedJson.response[0].risetime) * 1000;
      myDate = new Date(time);
      var text = document.createElement('p');
      text.innerText = "Next pass over on "+ myDate;
      map.updateWindow(text);
    }
    request.send();
  }
}

module.exports = IssPassOverApi;
