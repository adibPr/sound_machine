'use strict';

const electron = require ('electron')
const app = electron.app
var BrowserWindow = electron.BrowserWindow
const {ipcMain} = require ('electron')

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        //frame: false,
        height: 700,
        width: 368,
        resizable: false
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');
});

ipcMain.on ('close-main-window', function () {
  app.quit ();
});
