const inspect = require("util").inspect;

module.exports = function DebugLog(debugTitle = "", obj = null) {
  let logParms = obj
    ? [
        debugTitle,
        inspect(obj, { showHidden: false, depth: null, colors: true }),
      ]
    : [debugTitle];

  return console.log(logParms.join(","));
};
