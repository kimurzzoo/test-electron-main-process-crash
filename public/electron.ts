import { app, BrowserWindow } from 'electron';
import * as isDev from 'electron-is-dev';
import * as path from 'path';
const log = require('electron-log');

let mainWindow: BrowserWindow | null;

const BASE_URL = 'http://localhost:3000';

function createMainWindow(): void {
  console.log('createMainWindow start');
  mainWindow = new BrowserWindow({
    width: 1920,

    height: 1080,

    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });
  console.log(mainWindow);

  mainWindow.webContents.on(
    'select-bluetooth-device',
    (event, deviceList, callback) => {
      event.preventDefault();
      const result = deviceList.find((device) => {
        return device.deviceName.startsWith('C-I-1BF7');
      });
      if (result) {
        console.log(result);
        callback(result.deviceId);
      }
    },
  );

  mainWindow.once('ready-to-show', () => {
    console.log('readytoshow start');
    mainWindow?.show();
    console.log('readytoshow end');
  });

  mainWindow.maximize();

  if (isDev) {
    console.log('isdev start');
    mainWindow.loadURL(BASE_URL);
    console.log('isdev loadurl');
    mainWindow.webContents.openDevTools();
    console.log('isdev end');
  } else {
    console.log('not isdev start');
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
    console.log('not isdev end');
  }

  mainWindow.on('closed', (): void => {
    console.log('closed start');
    mainWindow = null;
    console.log('closed end');
  });
}

app.on('ready', (): void => {
  console.log('ready start');
  createMainWindow();
});

app.on('window-all-closed', (): void => {
  console.log('closed all');
  app.quit();
});

app.on('activate', (): void => {
  if (mainWindow === null) {
    console.log('activate null start');
    createMainWindow();
    console.log('activate null end');
  }
});
