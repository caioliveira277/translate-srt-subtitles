require("dotenv").config();
const Axios = require("axios").default;
const DebugLog = require("../utils/inspect");
const { exit } = require("process");

const Request = Axios.create({
  baseURL: "https://microsoft-translator-text.p.rapidapi.com/",
  headers: {
    "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
    "x-rapidapi-key": "",
    "content-type": "application/json",
    accept: "application/json",
    useQueryString: true,
  },
  responseType: "json",
});

module.exports = {
  MicrosoftTranslate: async (textsToTranslate = [{ text: "" }]) => {
    try {
      if (!textsToTranslate.length) return textsToTranslate;
      const translatedTexts = [];
      const limit = 100;

      const parts = Math.ceil(textsToTranslate.length / limit);
      let prev = 0, current = 0;
      for (let i = 0; i < parts; i++) {
        current = (i + 1) * limit;

        const texts = textsToTranslate.slice(prev, current)
        await Request.post("translate", texts, {
          params: {
            profanityAction: "NoAction",
            textType: "plain",
            "api-version": "3.0",
            to: "pt",
          },
        })
          .then(({ data }) => {
            translatedTexts.push(...data);
          })
          .catch((error) => {
            throw new Error(error);
          }).finally(() => {
            prev = current;
          });
      }
      return translatedTexts
    } catch ({ message }) {
      DebugLog(`[-] erro ao traduzir:`, message)
    }
  }
}
