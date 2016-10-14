var FaveNews = require('../models/faveNews');
var faveNews = new FaveNews();

var NewsFaveUI = function() {
  faveNews.all(function(result) {
    this.render(result);
  }.bind(this));
};


NewsFaveUI.prototype = {
  createText: function(text) {
    var p = document.createElement("p");
    p.innerText = text;
    return p;
  },

  appendText: function(element, text) {
    var pTag = this.createText(text);
    element.appendChild(pTag);
  },

  handleNewsDelButton: function(){
    console.log(this.value);
    faveNews.deleteNewsItem(this.value);
    location.reload();
  },

  render: function(results) {
    console.log(results);
    var container = document.getElementById("container_for_saved_news");
    var ul = document.getElementById("saved_news");
    ul.setAttribute('id', 'saved-news-ul');
    for(var result of results) {
      var li = document.createElement("li");
      li.setAttribute('id', 'saved-news-li');
      
      var newsDelButton = document.createElement("button");
      newsDelButton.id = "newsDelButton";
      newsDelButton.value = result.title;
      newsDelButton.onclick = this.handleNewsDelButton;
      this.appendText(li, result.title);
      this.appendText(li, result.summary);
      this.appendText(li, result.date);
      newsDelButton.innerText = "Delete";
      li.appendChild(newsDelButton);
      ul.appendChild(li);
      container.appendChild(ul);
    }
  }
};

module.exports = NewsFaveUI;