var self;

var Clock = function(){
  self = this;
};

Clock.prototype = {
  checkTime: function(time){
    var timeInt = parseInt(time);
    var i;
    var timeString = timeInt.toString();
      if(timeInt < 10){
        i = ("0"+timeString);
      } else {
        i = timeString;
      }
    return i;
  },
  startClock: function(){
    var time = new Date();
    var offset = localStorage.getItem("offset");
    
    var hours = document.getElementById("hours");
    var minutes = document.getElementById("minutes");
    var seconds = document.getElementById("seconds");

    var hoursInt = parseInt(time.getHours());
    var offsetInt = parseInt(offset);

    var offsetHours = hoursInt + (offsetInt - 1);

    var currentHours = self.checkTime(offsetHours.toString());
    var currentMinutes = self.checkTime(time.getMinutes());
    var currentSeconds = self.checkTime(time.getSeconds());
    
      hours.innerText = currentHours;
      minutes.innerText = currentMinutes;
      seconds.innerText = currentSeconds;
      
    setTimeout(self.startClock, 1000);
  }
};

module.exports = Clock;