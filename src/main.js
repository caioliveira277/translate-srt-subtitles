const { app, BrowserWindow } = require("electron");
const path = require("path");

const publicPath = path.resolve(__dirname, "..", "public");
require("electron-reload")(publicPath);

const indexPath = path.resolve(__dirname, "..", "public", "index.html");
let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 785,
  });

  mainWindow.loadURL(`file://${indexPath}`);
});
