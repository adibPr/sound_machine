// Add your index.js code in this file

'use strict'

const {ipcRenderer} = require ('electron')

var closeE1 = document.querySelector ('.close');
closeE1.addEventListener ('click', function () {
  console.log ("Clicked!, sending");
  ipcRenderer.send ('close-main-window');
});

var soundButtons = document.querySelectorAll ('.button-sound');
for (var i = 0; i < soundButtons.length; i++) {
  var soundButton = soundButtons[i];
  var soundName = soundButton.attributes['data-sound'].value;

  prepareButton (soundButton, soundName);
}

function prepareButton (soundButton, soundName) {
  soundButton.querySelector ('span').style.backgroundImage = 'url("img/icons/' + soundName + '.png")';
  
  var audio = new Audio (__dirname + '/wav/' + soundName + '.wav');
  soundButton.addEventListener ('click', function () {
    audio.currentTime = 0;
    audio.play ();
  });
}

