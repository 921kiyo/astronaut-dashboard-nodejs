var FlickrUi = function(){};

FlickrUi.prototype = {
  makeFlickrUrl: function(parsedJson){
    var container = document.getElementById('flickrimages');
    var ul = document.createElement('ul');
    ul.setAttribute('id', 'flickr-ul');
    for (var i = 0; i < parsedJson.photos.photo.length; i++){
      var src = "https://farm" + parsedJson.photos.photo[i].farm + ".staticflickr.com/" + parsedJson.photos.photo[i].server + "/" + parsedJson.photos.photo[i].id + "_" + parsedJson.photos.photo[i].secret + "_n.jpg";
      var li = document.createElement('li');
      var img = document.createElement('img');
      img.setAttribute('src', src);
      li.appendChild(img);
      ul.appendChild(li);
    }
    container.appendChild(ul);
  }
};

module.exports = FlickrUi;