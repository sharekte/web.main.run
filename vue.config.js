module.exports = {
  baseUrl:
    process.env.NODE_ENV === "production" ? "https://cdn.danclive.com/" : "/",
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,

  css: {
    loaderOptions: {}
  }
};
