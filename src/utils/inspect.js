const inspect = require("util").inspect;

module.exports = function DebugLog(debugTitle = "", obj = {}) {
  return console.log(
    debugTitle,
    inspect(obj, { showHidden: false, depth: null, colors: true })
  );
};
