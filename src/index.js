const fsPromises = require("fs").promises;
const path = require("path");
const parser = require("subtitles-parser");
const translate = require("translate-api");
const translateLanguage = "zh-CN";

const pathData = path.resolve(__dirname, "..", "public", "data");
const pathDist = path.resolve(__dirname, "..", "public", "dist");

const testFilePath = `${pathData}/Create JavaScript 3D World in 5 Minutes - Three.js Skybox Tutorial - English.srt`;

async function ParserSrtToJson() {
  const dataSrt = await fsPromises.readFile(testFilePath, "utf8");
  return parser.fromSrt(dataSrt);
}

ParserSrtToJson()
  .then((arrayJsonConverted) => {
    arrayJsonConverted.forEach(async (subtitle, index) => {
      let textToTranslate = subtitle.text;
      await translate
        .getText(textToTranslate, { to: translateLanguage })
        .then((text) => {
          console.log(text);
        })
        .catch((error) => {
          console.log(`[-] translate error:`, error);
        });
    });
  })
  .catch((error) => {
    console.log(`[-] parse json error:`, error);
  })
  .finally(() => {
    console.log(`[*] file converted to json`);
  });
