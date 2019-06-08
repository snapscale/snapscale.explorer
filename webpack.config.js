// only work for webstorm to recognize webpack alias
const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  externals: {}
};
