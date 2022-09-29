const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  // publicPath:'/web/',
  devServer: {
    // host: '127.0.0.1',
    // port: 8084,
    open: true, // vue项目启动时自动打开浏览器
    proxy: {
      '/Home': {
        target: "http://zbxh.nbbidding.com/Home",
        changeOrigin: true, // 是否跨域
        pathRewrite: { // pathRewrite 的作用是把实际
          '^/Home': ""
        }
      },
      '/Public': {
        target: "http://zbxh.nbbidding.com/Public",
        changeOrigin: true, // 是否跨域
        pathRewrite: { // pathRewrite 的作用是把实际
          '^/Public': ""
        }
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/less/common.less')]
      // patterns: [
      //   'D:\\Code\\bidding-ningbo\\src\\assets\\less\\common.less',
      // ]
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("base", resolve("baseConfig"))
      .set("public", resolve("public"));
  },

}
