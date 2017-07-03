'use strict';

const {electron, BrowserWindow, app, ipcMain, globalShortcut} = require ('electron')

var mainWindow = null;
var settingWindow = null;
const configuration = require ('./configuration')

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        height: 700,
        width: 368,
        resizable: false
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

    // Default binding
    if (!configuration.readSetting ('shortcutKeys')) {
      configuration.saveSetting ('shortcutKeys', ['ctrl', 'shift']);
    }

    setGlobalShortcut ();

});

// listener to close-main-window signal
ipcMain.on ('close-main-window', function () {
  app.quit ();
});

// listener to open-settings-window signal
ipcMain.on ('open-settings-window', function () {
  if (settingWindow) {
    return;
  }

  settingWindow = new BrowserWindow ({
    frame: false,
    height: 200, 
    resizable: false,
    width: 200,
  });

  settingWindow.loadURL ('file://' + __dirname + '/app/settings.html');

  // has nothing to do with the signal from renderer
  // it to delete variable
  settingWindow.on ('closed', function () {
    settingWindow = null;
  });
});

ipcMain.on ('close-settings-window', function () {
  if (settingWindow ) {
    settingWindow.close ();
  }
});

ipcMain.on ('set-global-shortcuts', setGlobalShortcut);

function setGlobalShortcut () {
  globalShortcut.unregisterAll ();

  var shortcutKeySetting = configuration.readSetting ('shortcutKeys');
  var shortcutPrefix = shortcutKeySetting.length == 0 ? "" : shortcutKeySetting.join ('+') + '+';

  // bind prefix+1 to play sound 1
  globalShortcut.register (shortcutPrefix + '1', () => {
    mainWindow.webContents.send ('global-shortcut', 1); 
  });

  // bind prefix+2 to play sound 2
  globalShortcut.register (shortcutPrefix + '2', () => {
    mainWindow.webContents.send ('global-shortcut', 2); 
  });
}
