require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");
const parser = require("subtitles-parser");
const DebugLog = require("../utils/inspect");
const { MicrosoftTranslate } = require("../api/microsoftTranslate");

const pathData = path.resolve(__dirname, "..", "..", "public", "data");
const pathDist = path.resolve(__dirname, "..", "..", "public", "dist");

async function GetStrFiles(directory) {
  const allFiles = await fsPromises.readdir(directory);
  const allowedExtension = ".srt";

  if (!allFiles) return [];

  const validFiles = [];
  allFiles.forEach((file) => {
    let pathFile = `${directory}/${file}`;
    let currentExtension = path.extname(pathFile);
    if (currentExtension === allowedExtension) {
      validFiles.push(pathFile);
    }
  });

  if (validFiles.length) return validFiles;
  else return [];
}
async function ParserSrtToJson(pathFile) {
  const dataSrt = await fsPromises.readFile(pathFile, "utf8");
  return {
    arraySrtJsonConverted: parser.fromSrt(dataSrt),
    currentPathFile: path.parse(pathFile),
  };
}

try {
  (async function () {
    let entryStrFiles = [];

    await GetStrFiles(pathData).then((result) => {
      entryStrFiles = result;
    });

    if (!entryStrFiles.length) throw new Error("Data directory is empty");

    entryStrFiles.forEach(async (strFile) => {
      DebugLog(`[*] translating the file: "${path.parse(strFile).base}"`);
      await ParserSrtToJson(strFile)
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
              DebugLog(
                `[+] subtitles successfully translated: saved in ${pathDist}`
              );
            })
            .catch(() => {
              throw new Error("converting subtitle");
            });
        })
        .catch(() => {
          throw new Error("parse srt to json");
        });
    });
  })();
} catch (error) {
  DebugLog("[-] error: ", error.message);
}
