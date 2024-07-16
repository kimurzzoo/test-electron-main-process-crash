"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var path = require("path");
var log = require('electron-log');
var mainWindow;
var BASE_URL = 'http://localhost:3000';
function createMainWindow() {
    console.log('createMainWindow start');
    mainWindow = new electron_1.BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    });
    console.log(mainWindow);
    mainWindow.webContents.on('select-bluetooth-device', function (event, deviceList, callback) {
        event.preventDefault();
        var result = deviceList.find(function (device) {
            return device.deviceName.startsWith('C-I-1BF7');
        });
        if (result) {
            console.log(result);
            callback(result.deviceId);
        }
    });
    mainWindow.once('ready-to-show', function () {
        console.log('readytoshow start');
        mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.show();
        console.log('readytoshow end');
    });
    mainWindow.maximize();
    if (isDev) {
        console.log('isdev start');
        mainWindow.loadURL(BASE_URL);
        console.log('isdev loadurl');
        mainWindow.webContents.openDevTools();
        console.log('isdev end');
    }
    else {
        console.log('not isdev start');
        mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
        console.log('not isdev end');
    }
    mainWindow.on('closed', function () {
        console.log('closed start');
        mainWindow = null;
        console.log('closed end');
    });
}
electron_1.app.on('ready', function () {
    console.log('ready start');
    createMainWindow();
});
electron_1.app.on('window-all-closed', function () {
    console.log('closed all');
    electron_1.app.quit();
});
electron_1.app.on('activate', function () {
    if (mainWindow === null) {
        console.log('activate null start');
        createMainWindow();
        console.log('activate null end');
    }
});
