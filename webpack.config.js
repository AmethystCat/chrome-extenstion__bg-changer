const path = require('path');
const config = require("@talentui/webpack-config")({
  entry: "./src/index.js",
  useCommonChunk: false,
  useHostPage:false,
  sourceMap:false
});

module.exports = config;

