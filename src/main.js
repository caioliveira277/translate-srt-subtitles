const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");

const publicPath = path.resolve(__dirname, "..", "public");
require("electron-reload")(publicPath);

const indexPath = path.resolve(__dirname, "..", "public", "index.html");
let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 785,
    webPreferences: {
      preload: path.resolve(__dirname, "bin", "preload.js"),
    },
  });

  mainWindow.loadURL(`file://${indexPath}`);
});

ipcMain.on("selectDirectory", async (event, { target }) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory"],
  });
  event.reply("selectedDirectory", { target, directory: result.filePaths[0] });
});
