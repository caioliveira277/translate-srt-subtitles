const { ipcRenderer, ipcMain } = require("electron");
const translate = require("../bin/core");

process.once("loaded", () => {
  window.addEventListener("message", ({ data }) => {
    switch (data.type) {
      case "selectDirectory":
        ipcRenderer.send("selectDirectory", { target: data.target });
        break;
      case "translate":
        const { inputDir, outputDir, keyAPI } = window.APP;
        translate(inputDir, outputDir, keyAPI);
        break;
      default:
        break;
    }
  });

  ipcRenderer.on("selectedDirectory", (_event, { target, directory }) => {
    window.APP.$data[target] = directory;
  });
});
