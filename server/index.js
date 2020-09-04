var Koa = require('koa')
var app = new Koa()
var logger = require('koa-logger')
var bodyparser = require('koa-bodyparser')
var staticCache = require('koa-static-cache')
const session = require('koa-session')
const koaBody = require('koa-body')
const mongoose = require('mongoose')
const config = require('./config/default')
const router = require('./routes')
// config-lite 模块会根据环境变量（NODE_ENV）的不同加载不同的配置文件而无需修改任何代码
// 不放到 default.js 是为了避免循环依赖

app.keys = ['myblog']

app.use(bodyparser())
app.use(staticCache(config.staticCacheConf))
app.use(logger())
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
  }
}))
app.use(router.routes()).use(router.allowedMethods())
const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false
}
app.use(session(CONFIG, app))
mongoose.connect('mongodb://localhost/myblog', { useNewUrlParser: true, useUnifiedTopology: true })
app.listen(config.port, function () {
  console.log('Server listening on: ', config.port)
})
