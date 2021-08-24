module.exports = {
  lintOnSave: false,

  devServer: {
    inline: false,
  },

  configureWebpack: {
    devtool: "source-map",
  },

  transpileDependencies: ["vuetify"],

  publicPath: '/app'
};
