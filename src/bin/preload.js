const { ipcRenderer } = require("electron");

process.once("loaded", () => {
  window.addEventListener("message", ({ data }) => {
    if (data.type === "selectDirectory")
      return ipcRenderer.send("selectDirectory", { target: data.target });
  });
  ipcRenderer.on("selectedDirectory", (_event, { target, directory }) => {
    window.APP.$data[target] = directory;
  });
});
