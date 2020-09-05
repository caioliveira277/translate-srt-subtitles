const fsPromises = require("fs").promises;
const path = require("path");
const parser = require("subtitles-parser");
const DebugLog = require("../utils/inspect");
const { MicrosoftTranslate } = require("../api/microsoftTranslate");
let logKey = 0;

function SendLog(logType, fileName, message) {
  return window.postMessage({
    type: "response",
    log: {
      key: logKey++,
      logType,
      fileName,
      message,
    },
  });
}
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
module.exports = async function translate(inputDir, outputDir, keyAPI) {
  try {
    const pathData = inputDir;
    const pathDist = outputDir;

    let entryStrFiles = [];

    await GetStrFiles(pathData).then((result) => {
      entryStrFiles = result;
    });

    if (!entryStrFiles.length) throw new Error("Data directory is empty");

    for (const strFile of entryStrFiles) {
      DebugLog(`[*] translating the file: "${path.parse(strFile).base}"`);
      SendLog("info", path.parse(strFile).base, "em processo de tradução...");

      await ParserSrtToJson(strFile)
        .then(async ({ arraySrtJsonConverted, currentPathFile }) => {
          DebugLog(`[*] file converted to json`);
          const { base } = currentPathFile;
          /* input */
          const textsToTranslate = [];
          for (const srtConverted of arraySrtJsonConverted) {
            let arrayEntries = Object.entries(srtConverted);
            textEntry = arrayEntries[arrayEntries.length - 1];
            textsToTranslate.push({ [textEntry[0]]: textEntry[1] });
          }
          /* process */
          const translatedTexts = await MicrosoftTranslate(
            textsToTranslate,
            keyAPI
          );

          /* output */
          arraySrtJsonConverted.map((element, index) => {
            let text = translatedTexts.data[index].translations[0].text;
            return (element.text = text);
          });

          const jsonConvertedToSrt = parser.toSrt(arraySrtJsonConverted);
          return await fsPromises
            .writeFile(`${pathDist}/${base}`, jsonConvertedToSrt, "utf8")
            .then(() => {
              DebugLog(
                `[+] subtitles successfully translated: saved in ${pathDist}`
              );
              SendLog("success", base, "traduzido com sucesso!");
            })
            .catch(() => {
              SendLog("error", base, "falha ao converter arquivo");
            });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    }
  } catch (error) {
    SendLog("error", "error", error.message);
    return DebugLog("[-] error: ", error);
  }
};
