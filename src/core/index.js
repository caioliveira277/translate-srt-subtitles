const { MicrosoftTranslate } = require("./api/microsoftTranslate");
const { GetStrFiles, ParserSrtToJson } = require("./controllers/srtFileControllers");

module.exports = {
  core: async (inputPath, outputPath) => {
    try {
      let entryStrFiles =  await GetStrFiles(inputPath);
      if (!entryStrFiles.length) throw new Error("Data directory is empty");
  
      for (const strFile of entryStrFiles) {
        DebugLog(`[*] translating the file: "${path.parse(strFile).base}"`);
        await ParserSrtToJson(strFile)
          .then(async ({ arraySrtJsonConverted, currentPathFile }) => {
            DebugLog(`[*] file converted to json`);
    
            const { base } = currentPathFile;
    
            /* input */
            const textsToTranslate = [];
            for (const srtConverted of arraySrtJsonConverted) {
              const arrayEntries = Object.entries(srtConverted);
              const textEntry = arrayEntries[arrayEntries.length - 1];
              textsToTranslate.push({ [textEntry[0]]: textEntry[1] });
            }
    
            /* process */
            const translatedTexts = await MicrosoftTranslate(textsToTranslate);
    
            /* output */
            arraySrtJsonConverted.map((element, index) => {
              let text = translatedTexts[index].translations[0].text;
              return (element.text = text);
            });
    
            const jsonConvertedToSrt = parser.toSrt(arraySrtJsonConverted);
            return await fsPromises
              .writeFile(`${outputPath}/${base}`, jsonConvertedToSrt, "utf8")
              .then(() => {
                DebugLog(
                  `[+] subtitles successfully translated: saved in ${outputPath}`
                );
              })
              .catch(() => {
                throw new Error("converting subtitle");
              });
          })
          .catch(({message}) => {
            throw new Error("parse srt to json", message);
          });
        }
    } catch ({message}) {
      return message;
    }
  }
}
