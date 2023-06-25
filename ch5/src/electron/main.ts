import { app, BrowserWindow, ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

const contentFile = path.join(app.getPath('userData'), 'content.html');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('getContent', () => {
  if (fs.existsSync(contentFile)) {
    const res = fs.readFileSync(contentFile);
    return res.toString();
  }
  return '';
});

ipcMain.handle('setContent', ({}, content: string) => {
  fs.writeFileSync(contentFile, content);
});
