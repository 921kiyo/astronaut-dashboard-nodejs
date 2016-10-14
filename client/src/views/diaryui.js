var Diary = require('../models/diary');
var diary = new Diary();

var DiaryUI = function() {
  diary.all(function(result) {
    this.render(result);
  }.bind(this));
};

DiaryUI.prototype = {
  createText: function(text) {
    var p = document.createElement("p");
    p.innerText = text;
    return p;
  },

  appendText: function(element, text) {
    var pTag = this.createText(text);
    element.appendChild(pTag);
  },

  handleDelButton: function(){
    console.log(this.value);
    diary.deleteDiaryEntry(this.value);
    location.reload();
  },

  render: function(results) {
    var container = document.getElementById("diary_entries");

    for(var result of results) {
      var li = document.createElement("li");
      li.setAttribute('id','diary-result-li');
      var delButton = document.createElement("button");
      delButton.id = "diaryDelButton";
      console.log(result);
      delButton.value = result.title;
      delButton.onclick = this.handleDelButton;
      this.appendText(li, result.title);
      this.appendText(li, result.text);
      this.appendText(li, result.date);
      delButton.innerText = "Delete";
      li.appendChild(delButton);
      container.appendChild(li);
    }
  }
};

module.exports = DiaryUI;