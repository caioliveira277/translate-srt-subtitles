const path = require("path");
const { exit } = require("process");

const inputPath = path.resolve("");
const outputPath = path.resolve("", "translated");
console.log(outputPath)
const {core} = require("./core");

(async () => {
  await core(inputPath, outputPath);
})()
