const Axios = require("axios").default;
const DebugLog = require("./utils/inspect");

const Request = Axios.create({
  baseURL: "https://microsoft-translator-text.p.rapidapi.com/",
  headers: {
    "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
    "x-rapidapi-key": process.env.TRANSLATE_MICROSOFT_KEY,
    "content-type": "application/json",
    accept: "application/json",
    useQueryString: true,
  },
  responseType: "json",
});

async function MicrosoftTranslate(textsToTranslate = [{ text: "" }]) {
  try {
    return await Request.post("translate", textsToTranslate, {
      params: {
        profanityAction: "NoAction",
        textType: "plain",
        "api-version": "3.0",
        to: "pt",
      },
    })
      .then(({ data }) => {
        return data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    return DebugLog(`[-] translate error:`, error.message);
  }
}

module.exports = { MicrosoftTranslate };
