var FaveNews = require('../models/faveNews');
var faveNews = new FaveNews();

var self;

var NYTui = function(){
  self = this;
};

NYTui.prototype = {

  makeElement: function(element, text){
    var tag = document.createElement(element);
    tag.innerText = text;
    return tag;
  },

  handleFaveButtonClick: function(){
    faveNews.addNewsItem(this.value);
    window.alert("Saved to favourite articles");
  },
  

  makeArticle: function(parsedJson){
    var container = document.getElementById('news_info'); 
    var ul = document.createElement('ul');
    for(article of parsedJson.response.docs){
      var li = document.createElement('li');
      li.setAttribute('class', 'nyt-li');
      var heading = self.makeElement('h3', article.headline.print_headline);

      var summary = self.makeElement('p', article.snippet);

      var date = self.makeElement('p', article.pub_date);

      var newsValue = {
        title: article.headline.print_headline,
        summary: article.snippet,
        date: article.pub_date
      };

      var faveButton = document.createElement("button");
      faveButton.id = "newsFaveButton";
      faveButton.innerText = "Favourite";
      faveButton.value = JSON.stringify(newsValue);
      faveButton.onclick = self.handleFaveButtonClick;

      li.appendChild(heading);
      li.appendChild(summary);
      li.appendChild(date);
      li.appendChild(faveButton);
      ul.appendChild(li);
      
    }
    container.appendChild(ul);
  }
};

module.exports = NYTui;