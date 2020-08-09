const { app, BrowserWindow } = require("electron");
const path = require("path");
require("electron-reload")(__dirname);

const indexPath = path.resolve(__dirname, "..", "public", "index.html");
let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
  });

  mainWindow.loadURL(`file://${indexPath}`);
});
