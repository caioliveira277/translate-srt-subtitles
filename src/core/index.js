const { MicrosoftTranslate } = require("../api/microsoftTranslate");
const { GetStrFiles, ParserSrtToJson, ParserJsonToSrt } = require("../controllers/srtFileControllers");
const path = require("path");
const DebugLog = require("../utils/inspect");

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
    
            const parserToSrt = await ParserJsonToSrt(arraySrtJsonConverted, outputPath, currentPathFile);
            if(parserToSrt.response){
              DebugLog(parserToSrt.message);
            }else {
              throw new Error(parserToSrt.message)
            }
          })
          .catch((error) => {
            throw new Error(`[-] parse srt to json: ${error}`);
          });
      }
      return true
    } catch (error) {
      DebugLog(error);
      return false
    }
  }
}
