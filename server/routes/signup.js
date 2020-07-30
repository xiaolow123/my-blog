var router = require('koa-router')()
var User = require('../models/user')
router.post('/', async function (ctx) {
  let data = ctx.request.body
  let response = ctx.response
  let user = new User({
    name: data.name,
    password: data.password,
    signature: data.signature
  })
  await user.save()
  response.body = '注册成功'
})
module.exports = router
