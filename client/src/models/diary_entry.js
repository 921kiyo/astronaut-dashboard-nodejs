var DiaryEntry = function(options){
  this.id = options._id;
  this.title = options.title;
  this.date = options.date;
  this.text = options.text;
};

module.exports = DiaryEntry;