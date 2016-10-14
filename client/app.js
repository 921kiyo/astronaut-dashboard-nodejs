var Ajax = require('./src/models/ajax');

var NYTApi = require('../api/new_york_times_api');
var NYTui = require('./src/views/NYTui');
var nytApi = new NYTApi();
var FlickrApi = require('../api/flickr_api');
var FlickrUi = require('./src/views/flickrUi');
var flickrApi = new FlickrApi();

var DarkSky = require('../api/darkSkyApi');
var DarkSkyUi = require('./src/views/darkSkyUi');
var darkSky = new DarkSky();

var FaveNewsUI = require('./src/views/newsFaveUI');

var Clock = require('./src/models/clock');

var ITunesApi = require('../api/iTunes_api');
var ITunesUi = require('./src/views/iTunesUi');
var iTunesApi = new ITunesApi();

var DiaryUI = require('./src/views/diaryui');
var IssLocationApi = require('../api/issLocationApi');
var CountryApi = require('../api/country_api');
var countryApi = new CountryApi();

var Map = require("./src/models/map");
var map;

var handleSetHomeButton = function(){
  var latlng = map.markerPosition();
  var darkSkyUi = new DarkSkyUi();
  var flickrUi = new FlickrUi();
  var iTunesUi = new ITunesUi();
  var nYTui = new NYTui();
  
  var country = localStorage.getItem("country");
  var welcomeDiv = document.getElementById("select_home_page");
  welcomeDiv.style.display = "none";

  var nytrequest = localStorage.getItem("region and country");

  nytApi.makeRequest(country, nYTui.makeArticle);
  flickrApi.makeRequest(country, flickrUi.makeFlickrUrl);
  darkSky.makeRequest(latlng, Clock, darkSkyUi.makeWeatherDisplay);

  countryApi.makeRequest(country, iTunesApi, iTunesUi.makeITunesUrl);


};

var handleSubmitButton = function(event){
  event.preventDefault();
  var ajax = new Ajax();
  var text = document.getElementById('diaryText').value;
  var date = document.getElementById('date').value;
  var title = document.getElementById('title').value;
  var diaryInput = {
    entry: {
      text: text,
      date: date,
      title: title 
    }
  };
  diaryInput = JSON.stringify(diaryInput);


  ajax.makePostRequest('/api/diary', diaryInput);
};

var setElementStyle = function(element, displayStyle){
  var tag = document.querySelector(element);
  tag.style.display = displayStyle;
};


var handleMapButtonClick = function(){
  setElementStyle('#header', 'none');
  setElementStyle('#landing_page', 'none');
  setElementStyle('#select_home_page', 'block');
  
  var container = document.getElementById("welcome_map");
  var centre = {lat:0, lng:0};
  var zoom = 2;
  map = new Map( container, centre, zoom );
  map.createMarker();
  map.addClickListener();

  var submitLocationButton = document.querySelector('#set_home');
  submitLocationButton.onclick = function(){
    setElementStyle('#select_home_page', 'none');
    setElementStyle('#home_info_page', 'block');
   
    var header = document.querySelector('#header');
    header.innerHTML = "News From Home";
    handleSetHomeButton();
  };
};

var setDate = function(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0
  var yyyy = today.getFullYear();
  if(dd<10){
      dd='0'+dd;
  } 
  if(mm<10){
      mm='0'+mm;
  } 
  today = yyyy+'-'+mm+'-'+dd;
  return today;
};

var handleDiaryEntryButtonClick = function(){
    setElementStyle('#header', 'none');
    setElementStyle('#landing_page', 'none');
    setElementStyle('#diary_entry_form', 'block');
      
    var diarySubmitButton = document.querySelector('#submitDiary');
      
    // Get default value for today
    var today = setDate();
    
    console.log(today);
    document.getElementById("date").setAttribute('value', today);

    diarySubmitButton.onclick = function(){
    setElementStyle('#diary_entry_form', 'none');
      
    setElementStyle('#view_diary_page', 'block');
      
    new DiaryUI();
    location.reload();
    };   
};

var handleDiaryButtonClick = function(){
    setElementStyle('#header', 'none');
    setElementStyle('#landing_page', 'none');
    setElementStyle('#view_diary_page', 'block');
    
    new DiaryUI();
    new FaveNewsUI();
  };

var handleIssButtonClick = function(){
    var container = document.getElementById("iss_location_map");
    var centre = {lat:0, lng:0};
    var zoom = 2;
    map = new Map( container, centre, zoom );
    
    var issLocationApi = new IssLocationApi();
    var issLocation = issLocationApi.makeRequest(map);

    setElementStyle('#header', 'none');
    setElementStyle('#landing_page', 'none');
    setElementStyle('#iss_location_page', 'block');
    
    map.createMarker();
    map.addFancyMarker();
    map.addClickEvent();
  };


var app = function(){
  
  var form = document.querySelector('#diary_form');
  form.onsubmit = handleSubmitButton;

// KAT'S STUFF FOR CHECKING OUT DIV STYLING
  var mapButton = document.querySelector('#map_page_entry');
  mapButton.onclick = handleMapButtonClick;

  var diaryEntryButton = document.querySelector('#add_diary_entry');
  // TODO: Make this anonymous function into a separate function
  diaryEntryButton.onclick = handleDiaryEntryButtonClick;

  var diaryButton = document.querySelector('#diary_entry');
  diaryButton.onclick = handleDiaryButtonClick;

  var issLocationButton = document.querySelector('#iss_page_entry');
  issLocationButton.onclick = handleIssButtonClick;

  var homePageButtons = document.querySelectorAll('.homepage');
    for (var homePageButton of homePageButtons){
    homePageButton.onclick = function(){
      location.reload();
    };
  }
};

window.onload = app;