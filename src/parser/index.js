/*
  Referencia lib 'subtitles-parser'
  https://www.npmjs.com/package/subtitles-parser
*/

let parser = (function () {
  let pItems = {};

  /**
   * Converts SubRip subtitles into array of objects
   * [{
   *     id:        `Number of subtitle`
   *     startTime: `Start time of subtitle`
   *     endTime:   `End time of subtitle
   *     text: `Text of subtitle`
   * }]
   *
   * @param  {String}  data SubRip suntitles string
   * @param  {Boolean} ms   Optional: use milliseconds for startTime and endTime
   * @return {Array}  
   */
  pItems.fromSrt = function (data, ms) {
    let useMs = ms ? true : false;
    let regex = /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/g;

    let stringFormated = data.replace(/ --> /g, "-->")
      .replace(/\n+/g, "+")
      .split("+")
      .join("\n");

    let dataArray = stringFormated.split(regex);
    dataArray.shift();

    let items = [];
    for (let i = 0; i < dataArray.length; i += 4) {
      items.push({
        id: dataArray[i].trim(),
        startTime: useMs ? timeMs(dataArray[i + 1].trim()) : dataArray[i + 1].trim(),
        endTime: useMs ? timeMs(dataArray[i + 2].trim()) : dataArray[i + 2].trim(),
        text: dataArray[i + 3].trim()
      });
    }
    return items;
  };

  /**
   * Converts Array of objects created by this module to SubRip subtitles
   * @param  {Array}  data
   * @return {String}      SubRip subtitles string
   */
  pItems.toSrt = function (data) {
    if (!data instanceof Array) return '';
    let res = '';

    for (let i = 0; i < data.length; i++) {
      let s = data[i];

      if (!isNaN(s.startTime) && !isNaN(s.endTime)) {
        s.startTime = msTime(parseInt(s.startTime, 10));
        s.endTime = msTime(parseInt(s.endTime, 10));
      }

      res += s.id + '\r\n';
      res += s.startTime + ' --> ' + s.endTime + '\r\n';
      res += s.text.replace('\n', '\r\n') + '\r\n\r\n';
    }

    return res;
  };

  let timeMs = function (val) {
    let regex = /(\d+):(\d{2}):(\d{2}),(\d{3})/;
    let parts = regex.exec(val);

    if (parts === null) {
      return 0;
    }

    for (let i = 1; i < 5; i++) {
      parts[i] = parseInt(parts[i], 10);
      if (isNaN(parts[i])) parts[i] = 0;
    }

    // hours + minutes + seconds + ms
    return parts[1] * 3600000 + parts[2] * 60000 + parts[3] * 1000 + parts[4];
  };

  let msTime = function (val) {
    let measures = [3600000, 60000, 1000];
    let time = [];

    for (let i in measures) {
      let res = (val / measures[i] >> 0).toString();

      if (res.length < 2) res = '0' + res;
      val %= measures[i];
      time.push(res);
    }

    let ms = val.toString();
    if (ms.length < 3) {
      for (i = 0; i <= 3 - ms.length; i++) ms = '0' + ms;
    }

    return time.join(':') + ',' + ms;
  };

  return pItems;
})();

// ignore exports for browser
if (typeof exports === 'object') {
  module.exports = parser;
}
