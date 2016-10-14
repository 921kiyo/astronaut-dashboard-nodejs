// TODO: Delete this and merge into diary_entry.js
var NewsItem = function(options){
  this.id = options._id;
  this.title = options.title;
  this.date = options.date;
  this.summary = options.summary;
};

module.exports = NewsItem;