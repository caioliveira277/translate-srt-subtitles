const fsPromises = require("fs").promises;
const fs = require("fs");
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

    const finalPath = path.join(outputPath, base);
    if(!fs.existsSync(outputPath)){
      await fsPromises.mkdir(path.basename(outputPath));
    }
    return await fsPromises
      .writeFile(finalPath, jsonConvertedToSrt, "utf8")
      .then(() => {
        return {
          message: `[+] subtitles successfully translated: saved in ${outputPath}`,
          response: true
        }
      })
      .catch((error) => {
        return {
          message: `[-] error to save translated files: ${error}`,
          response: false
        };
      });
  }
}