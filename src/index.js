require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");
const parser = require("subtitles-parser");
const DebugLog = require("./utils/inspect");
const MicrosoftTranslate = require("./api").MicrosoftTranslate;

const pathData = path.resolve(__dirname, "..", "public", "data");
const pathDist = path.resolve(__dirname, "..", "public", "dist");

const testFilePath = `${pathData}/Create JavaScript 3D World in 5 Minutes - Three.js Skybox Tutorial - English.srt`;

async function ParserSrtToJson(pathFile) {
  const dataSrt = await fsPromises.readFile(pathFile, "utf8");
  return {
    arraySrtJsonConverted: parser.fromSrt(dataSrt),
    currentPathFile: path.parse(pathFile),
  };
}

ParserSrtToJson(testFilePath)
  .then(async ({ arraySrtJsonConverted, currentPathFile }) => {
    DebugLog(`[*] file converted to json`);

    const { base } = currentPathFile;

    /* input */
    const textsToTranslate = [];
    arraySrtJsonConverted.forEach((srtConverted) => {
      let arrayEntries = Object.entries(srtConverted),
        textEntry = arrayEntries[arrayEntries.length - 1];
      return textsToTranslate.push({ [textEntry[0]]: textEntry[1] });
    });

    /* process */
    const translatedTexts = await MicrosoftTranslate(textsToTranslate);

    /* output */
    arraySrtJsonConverted.map((element, index) => {
      let text = translatedTexts[index].translations[0].text;
      return (element.text = text);
    });

    const jsonConvertedToSrt = parser.toSrt(arraySrtJsonConverted);
    return await fsPromises
      .writeFile(`${pathDist}/${base}`, jsonConvertedToSrt, "utf8")
      .then(() => {
        DebugLog(`[+] subtitles successfully translated [+]`);
      })
      .catch((error) => {
        DebugLog(`[-] error converting subtitle`, error);
      });
  })
  .catch((error) => {
    DebugLog(`[-] error parse srt to json:`, error);
  });
