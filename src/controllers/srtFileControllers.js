const fsPromises = require("fs").promises;
const parser = require("../parser");
const path = require("path");

module.exports = {
  GetStrFiles: async (directory) => {
    const allFiles = await fsPromises.readdir(directory);
    const allowedExtension = ".srt";

    if (!allFiles) return [];

    const validFiles = [];
    for (const file of allFiles) {
      let pathFile = `${directory}/${file}`;
      let currentExtension = path.extname(pathFile);
      if (currentExtension === allowedExtension) {
        validFiles.push(pathFile);
      }

    }

    if (validFiles.length) return validFiles;
    else return [];
  },
  ParserSrtToJson: async (pathFile) => {
    const dataSrt = await fsPromises.readFile(pathFile, "utf8");
    return {
      arraySrtJsonConverted: parser.fromSrt(dataSrt),
      currentPathFile: path.parse(pathFile),
    };
  },
  ParserJsonToSrt: async (arraySrtJsonConverted, outputPath, currentPathFile) => {
    const jsonConvertedToSrt = parser.toSrt(arraySrtJsonConverted);
    const { base } = currentPathFile;
    return await fsPromises
      .writeFile(`${outputPath}/${base}`, jsonConvertedToSrt, "utf8")
      .then(() => {
        return {
          message: `[+] subtitles successfully translated: saved in ${outputPath}`,
          response: true
        }
      })
      .catch(() => {
        return {
          message: `[-] error to save translated files`,
          response: false
        };
      });
  }
}