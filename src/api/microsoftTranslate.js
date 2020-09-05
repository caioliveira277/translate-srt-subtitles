const Axios = require("axios").default;

async function MicrosoftTranslate(textsToTranslate = [{ text: "" }], key) {
  try {
    const Request = Axios.create({
      baseURL: "https://microsoft-translator-text.p.rapidapi.com/",
      headers: {
        "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
        "x-rapidapi-key": key,
        "content-type": "application/json",
        accept: "application/json",
        useQueryString: true,
      },
      responseType: "json",
    });
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
    throw new Error(error.message);
  }
}

module.exports = { MicrosoftTranslate };
