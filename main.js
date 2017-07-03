'use strict';

const {electron, BrowserWindow, app, ipcMain, globalShortcut, Menu, Tray} = require ('electron')

var mainWindow = null;
var settingWindow = null;
var trayIcon = null;
const configuration = require ('./configuration')
var trayTemplate = [
  {
    label: "Sound Mahchine",
    enabled: "false"
  },
  {
    label : "Setting",
    click: openSettingWindow
  },
  {
    label: 'Quit',
    click: function () {
      app.quit ()
    }
  }
]

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

    trayIcon = new Tray (__dirname + '/app/img/tray-icon-alt.png');
    var trayMenu = Menu.buildFromTemplate (trayTemplate);
    trayIcon.setContextMenu (trayMenu);
});

// listener to close-main-window signal
ipcMain.on ('close-main-window', function () {
  app.quit ();
});

// listener to open-settings-window signal
ipcMain.on ('open-settings-window', openSettingWindow);


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

function openSettingWindow () {
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
}
