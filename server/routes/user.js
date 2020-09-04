var router = require('koa-router')()
var User = require('../models/user')

router.get('/', async (ctx) => {
  let user = await User.find({
    _id: ctx.request.query.userId
  })
  ctx.response.body = user
})
router.post('/', async (ctx) => {
  let data = ctx.request.body
  let response = ctx.response
  let re = await User.find({
    name: data.name,
    password: data.password
  })
  response.body = re
})
module.exports = router
