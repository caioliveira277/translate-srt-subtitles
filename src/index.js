const path = require("path");
const { exit } = require("process");

// const inputPath = path.resolve(__dirname, "..", "public", "data");
// const outputPath = path.resolve(__dirname, "..", "public", "dist");
const inputPath = path.resolve("");
const outputPath = path.resolve("");
const {core} = require("./core");

(async () => {
  await core(inputPath, outputPath);
})()
