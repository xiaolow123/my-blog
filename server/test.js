const Koa = require('koa')
const app = new Koa()
const session = require('koa-session')

app.keys = ['some secret']
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
app.use(async (ctx) => {
  if (!ctx.session.count) {
    ctx.session.count = 0
  }
  ctx.session.count += 1
  ctx.response.body = ctx.session.count
})
app.listen(3000, () => {
  console.log('listening')
})
