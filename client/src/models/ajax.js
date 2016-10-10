var Ajax= function(){}

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
    request.setRequestHeader('Content-Type', 'application/json');
    console.log("diaryInput2", diaryInput)
    request.onload = function(){
      // if(Ajax.request = 200){
      //   console.log("success");
      // }
      console.log("Make post request on load call back");
    };

    request.send(JSON.stringify(diaryInput));
  },

  makeDeleteRequest: function( url, id ){
    var request = new XMLHttpRequest();
    request.open('DELETE', url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function(){
      console.log("delete request on load firing")
    }
    var diaryId = {_id: id};
    console.log(diaryId);
    request.send(JSON.stringify(diaryId));
  }

}

module.exports = Ajax;