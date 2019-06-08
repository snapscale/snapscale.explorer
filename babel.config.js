module.exports = {
  presets: ["@vue/app"],
  plugins: [
    "@babel/plugin-proposal-optional-chaining",
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
    ]
  ]
};
