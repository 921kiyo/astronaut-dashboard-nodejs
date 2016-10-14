var Key = require('../client/src/models/keys');
var key = new Key();

var FlickrApi = function(country){
};

FlickrApi.prototype = {
  makeRequest: function( country, callback ){
    var url = "https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key="+key.flickrKey+"&tags="+country+"&format=json&per_page=10&accuacy=3&sort=relevance&content_type=1&safe_search=1&nojsoncallback=1";
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function(){
      if(this.status !== 200) {
        return;
      }
      json = this.responseText;
      var parsedJson = JSON.parse(json);
      callback(parsedJson);
    };
    request.send();
  }
};

module.exports = FlickrApi;