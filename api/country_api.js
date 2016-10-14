var CountryApi = function(country){

};

CountryApi.prototype = {
  makeRequest: function(country, iTunesApi, iTunesUi) {
    var self = this;
    var url = "https://restcountries.eu/rest/v1/name/"+ country + "?fullText=true";
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function(){
      if(this.status != 200){
        return;
      }
      json = this.responseText;
      var parsedJson = JSON.parse(json);
      self.makeCountryCode(parsedJson, iTunesApi, iTunesUi);
    };
    request.send();
  },
  // callback for iTunes API
  makeCountryCode: function(parsedJson, iTunesApi, iTunesUi){
    var countryCode = parsedJson[0].alpha2Code.toLowerCase();
    iTunesApi.makeRequest(countryCode, iTunesUi);
  }

};

module.exports = CountryApi;
