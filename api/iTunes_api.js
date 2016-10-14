var ITunesApi = function(countryCode){
};

ITunesApi.prototype = {
  makeRequest: function(countryCode, callback){
    var self = this;
    var url = "https://itunes.apple.com/"+countryCode+"/rss/topsongs/limit=10/json";
    var request = new XMLHttpRequest();
    request.open("GET", url);
    
    request.onload = function(){
      if(this.status !== 200) {
        var iTunesDiv = document.getElementById("iTunes-music");
        iTunesDiv.style.display = "none";
      }
      json = this.responseText;
      var parsedJson = JSON.parse(json);
      callback(parsedJson);
    };
    request.send();
  }
  
};

module.exports = ITunesApi;