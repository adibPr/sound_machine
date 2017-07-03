// Add your settings.js code in this file

'use strict'

const {ipcRenderer} = require ('electron') // destructuring, meaning only get electron.ipcRenderer
const configuration = require ('../configuration.js')

var closeE1 = document.querySelector ('.close');
closeE1.addEventListener ('click', function () {
  // send signal to close-settings-window
  ipcRenderer.send ('close-settings-window');
});

var modifierCheckboxes = document.querySelectorAll ('.global-shortcut');

for (var i=0; i<modifierCheckboxes.length; i++) {
  var shortcutKeys = configuration.readSetting ('shortcutKeys');
  var modifierKey = modifierCheckboxes[i].attributes['data-modifier-key'].value;
  modifierCheckboxes[i].checked = shortcutKeys.indexOf (modifierKey) !== -1;
  modifierCheckboxes[i].addEventListener ('click', bindModifierCheckboxes); 
}

function bindModifierCheckboxes (e) {
  var shortcutKeys = configuration.readSetting ('shortcutKeys');
  var this_modifier_key = e.target.attributes['data-modifier-key'].value;

  if (shortcutKeys.indexOf (this_modifier_key) !== -1) {
    // mean we removing
    var shortcutKeysIndex = shortcutKeys.indexOf (this_modifier_key);
    shortcutKeys.splice (shortcutKeysIndex, 1);
  } else {
    // mean we are adding
    shortcutKeys.push (this_modifier_key);
  }

  console.log (shortcutKeys);
  configuration.saveSetting ('shortcutKeys', shortcutKeys);
  ipcRenderer.send ('set-global-shortcuts');
}


