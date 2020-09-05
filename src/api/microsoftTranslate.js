const axios = require("axios");

async function MicrosoftTranslate(textsToTranslate = [{ text: "" }], key) {
  try {
    return await axios({
      method: "POST",
      url: "https://microsoft-translator-text.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
        "x-rapidapi-key": key,
        accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        useQueryString: true,
      },
      params: {
        profanityAction: "NoAction",
        textType: "plain",
        "api-version": "3.0",
        to: "pt",
      },
      data: textsToTranslate,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { MicrosoftTranslate };
