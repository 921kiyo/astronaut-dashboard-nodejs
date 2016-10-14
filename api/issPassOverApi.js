var IssPassOverApi = function(){};

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

      requestTime = (parsedJson.request.datetime) * 1000;
      time = (parsedJson.response[0].risetime) * 1000;
      timeDiff = time - requestTime;
      
      var seconds = (timeDiff / 1000).toFixed(0);
      var minutes = Math.floor(seconds / 60);
      var hours = "";
      if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        minutes = minutes - (hours * 60);
      }
      seconds = Math.floor(seconds % 60);

      var passOver = hours + " hrs " + minutes + " mins " + seconds + " seconds";

      if (hours === ""){
        passOver = minutes + " minutes " + seconds + " seconds";
      }

      var text = document.createElement('p');
      text.innerText = "Next pass time is in " + passOver;
      map.updateWindow(text);
    };
    request.send();
  }
};

module.exports = IssPassOverApi;