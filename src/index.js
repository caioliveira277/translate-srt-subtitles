const path = require("path");

const inputPath = path.resolve(__dirname, "..", "public", "data");
const outputPath = path.resolve(__dirname, "..", "public", "dist");
const {core} = require("./core");

(async () => {
  await core(inputPath, outputPath);
})()
