var Ajax= function(){};

Ajax.prototype = {
  makeGetRequest: function(url, callback){
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = callback;
    request.send();
  },

  makePostRequest: function(url, diaryInput){
    var request = new XMLHttpRequest();
    console.log(diaryInput);
    request.open('POST', url);
    console.log(request);
    request.setRequestHeader('Content-Type', 'application/json');
    console.log("diaryInput2", diaryInput);
    request.onload = function(){
      console.log("Make post request on load call back");
    };
    request.send(diaryInput);
  },

  makeDeleteRequest: function( url, title ){
    var request = new XMLHttpRequest();
    request.open('DELETE', url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({"title": title}));
  }

};

module.exports = Ajax;