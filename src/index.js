const path = require("path");

const inputPath = path.resolve("");
const outputPath = path.resolve("", "translated");
const {core} = require("./core");

(async () => {
  await core(inputPath, outputPath);
})()
