'use strict';

const {electron, BrowserWindow, app, ipcMain, globalShortcut} = require ('electron')

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        height: 700,
        width: 368,
        resizable: false
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

    // bind to Ctrl+1 to play sound 1
    globalShortcut.register ('Ctrl+1', () => {
      mainWindow.webContents.send ('global-shortcut', 1); 
    });

    // bind to Ctrl+2 to play sound 2
    globalShortcut.register ('Ctrl+2', () => {
      mainWindow.webContents.send ('global-shortcut', 2); 
    });
});

// listener to close-main-window signal
ipcMain.on ('close-main-window', function () {
  app.quit ();
});
