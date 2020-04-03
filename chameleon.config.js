/*
 * @Description: 
 * @Author: qiuzhaohai
 * @Date: 2020-04-01 15:44:34
 * @LastEditors: qiuzhaohai
 * @LastEditTime: 2020-04-03 00:15:57
 */

var path = require('path');
// 设置静态资源的线上路径
const publicPath = './';
// 设置api请求前缀
const apiPrefix = './';

cml.config.merge({
  entry: {
    template: path.resolve('./src/assets/template/index.html'),
  },
  templateLang: "cml",
  cmlComponents: ['cml-ui'],
  templateType: "html",
  platforms: ["wx"],
  buildInfo: {
    wxAppId: 'wx6172f2f54a45ca53'
  },
  wx: {
    dev: {
    },
    build: {
      apiPrefix
    }
  }
})

