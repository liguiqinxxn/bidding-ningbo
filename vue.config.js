const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 引入公共文件
        path.resolve(__dirname, "./src/assets/less/common.less")
      ]
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

// module.exports = {
//   transpileDependencies: [
//     'vuetify'
//   ],
//   pluginOptions: {
//     "style-resources-loader": {
//         preProcessor: "less",
//         patterns: [
//            // 引入公共文件
//             path.resolve(__dirname, "./src/assets/less/common.less")
//         ]
//     }
// },
// css: {
//     loaderOptions: {
//         less: {
//             lessOptions: {
//                 modifyVars: {
//                     'primary-color': '#ec6800'
//                 },
//                 javascriptEnabled: true,
//             },
//         },
//     },
// }
// }

