var self;
var ITunesUi = function(){
  self = this;
};

ITunesUi.prototype = {

  makePTag: function(text){
    var ptag = document.createElement('p');
    ptag.innerText = text;
    return ptag;
  },

  makeElement: function(element, attr1, attr2){
    var newElement = document.createElement(element);
    newElement.setAttribute(attr1, attr2);
    return newElement;
  },

  appendToContainer: function(container, element){
    container.appendChild(element);
  },
  
  makeITunesUrl: function(parsedJson){
    var container = document.getElementById('iTunes-music');
    var ul = document.createElement('ul'); 
    ul.setAttribute('id', 'iTunes-ul');
      if (parsedJson.feed.entry === undefined){
        var iTunesDiv = document.getElementById("iTunes-music");
        iTunesDiv.style.display = "none";
        return;
      }
      for (var i = 0; i < parsedJson.feed.entry.length; i++){
        // Getting elements form json   
        var songName = parsedJson.feed.entry[i]['im:artist'].label;
        var artist = parsedJson.feed.entry[i]['im:collection']['im:name'].label;
        var image = parsedJson.feed.entry[i]['im:image'][2].label;
        
        // Creating tags and passing text 
        var div = document.createElement('div');
        var songNameParagraph = self.makePTag("Song Name: " + songName);
        songNameParagraph.setAttribute('id', 'songNameP');
        var artistParagraph = self.makePTag("Artist: " + artist);
        artistParagraph.setAttribute('id', 'artistP');
        
        var img = self.makeElement('img', 'src', image);
        img.setAttribute('id', 'iTunes-img');    
        // Creating tags for audio
        var mp4 = parsedJson.feed.entry[i].link[1].attributes.href;
        var li = document.createElement('li');
        li.setAttribute('id', 'iTunes-li');
        var audio = self.makeElement("audio", 'controls', true);
        audio.setAttribute('id', 'audio');
        var source = document.createElement('source');
        source.setAttribute('src', mp4);
        source.setAttribute('type', 'audio/mp4');

        // Creating DOM
        self.appendToContainer(audio, source);
        self.appendToContainer(li, img);
        self.appendToContainer(li, songNameParagraph);
        self.appendToContainer(li, artistParagraph);
        self.appendToContainer(li, audio);
        self.appendToContainer(ul, li);
      }
      self.appendToContainer(container, ul);
    }
};

module.exports = ITunesUi;