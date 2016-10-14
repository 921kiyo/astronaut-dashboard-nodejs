var DiaryEntry = require('./diary_entry');
var Ajax = require('./ajax');

var Diary = function(){};

Diary.prototype = {
  all: function(callback){
    var ajax = new Ajax();
    var self = this;
    ajax.makeGetRequest('http://localhost:3000/api/diary', function(){
      if (this.status != 200) return;
      var jsonString = this.responseText;
      var results = JSON.parse(jsonString);

      var diary = self.populateDiary(results);
      callback(diary);
    });
  },
  populateDiary: function(results){
    var diary = [];

    for (var result of results){
      
      var diaryEntry = new DiaryEntry(result);
      diary.push(diaryEntry);
    }
    diary1 = diary.reverse();
    return diary1;
  },

  deleteDiaryEntry: function(title){
    var ajax = new Ajax();
    ajax.makeDeleteRequest("http://localhost:3000/api/diary", title);
  }
};

module.exports = Diary;