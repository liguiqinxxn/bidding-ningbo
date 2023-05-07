const path = require("path");
const webpack = require('webpack')
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
        // target: "http://zbxh.nbbidding.com/Home", // 测试
        // target: "http://www.nbtba.org.cn/Home", // 生产
        target: "http://admin.nbtba.org.cn/Home", // 生产-新
        changeOrigin: true, // 是否跨域
        pathRewrite: { // pathRewrite 的作用是把实际
          '^/Home': ""
        }
      },
      '/Public': {
        // target: "http://zbxh.nbbidding.com/Public", // 测试
        // target: "http://www.nbtba.org.cn/Public", // 生产
        target: "http://admin.nbtba.org.cn/Public", // 生产-新
        changeOrigin: true, // 是否跨域
        pathRewrite: { // pathRewrite 的作用是把实际
          '^/Public': ""
        }
      },
      '/ueditor': {
        // target: "http://zbxh.nbbidding.com/ueditor", // 测试
        // target: "http://www.nbtba.org.cn/ueditor", // 生产
        target: "http://admin.nbtba.org.cn/ueditor", // 生产-新
        changeOrigin: true, // 是否跨域
        pathRewrite: { // pathRewrite 的作用是把实际
          '^/ueditor': ""
        }
      },
      '/Uploadfiles': {
        // target: "http://zbxh.nbbidding.com/Uploadfiles", // 测试
        // target: "http://www.nbtba.org.cn/Uploadfiles", // 生产
        target: "http://admin.nbtba.org.cn/Uploadfiles", // 生产-新
        changeOrigin: true, // 是否跨域
        pathRewrite: { // pathRewrite 的作用是把实际
          '^/Uploadfiles': ""
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
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#ec6800'
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("base", resolve("baseConfig"))
      .set("public", resolve("public"));
    // 配置Jquery
    config.plugin('provide').use(webpack.ProvidePlugin, [
      {
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      }
    ]);
  },

}
