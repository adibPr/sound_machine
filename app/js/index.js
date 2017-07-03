// Add your index.js code in this file

'use strict'

const {ipcRenderer} = require ('electron') // destructuring, meaning only get electron.ipcRenderer

function prepareButton (soundButton, soundName) {
  soundButton.querySelector ('span').style.backgroundImage = 'url("img/icons/' + soundName + '.png")';
  
  var audio = new Audio (__dirname + '/wav/' + soundName + '.wav');
  soundButton.addEventListener ('click', function () {
    audio.currentTime = 0;
    audio.play ();
  });
}

var soundButtons = document.querySelectorAll ('.button-sound');
for (var i = 0; i < soundButtons.length; i++) {
  var soundButton = soundButtons[i];
  var soundName = soundButton.attributes['data-sound'].value;

  prepareButton (soundButton, soundName);
}

var closeE1 = document.querySelector ('.close');
closeE1.addEventListener ('click', function () {
  // send signal to close-main-window
  ipcRenderer.send ('close-main-window');
});

ipcRenderer.on ('global-shortcut', function (event, arg) {
  var clck_ev = new MouseEvent ('click'); 
  soundButtons[arg].dispatchEvent (clck_ev);
});
