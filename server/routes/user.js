var router = require('koa-router')()
var User = require('../models/user')

router.get('/', async (ctx) => {
  let user = await User.find({
    _id: ctx.request.query.userId
  })
  ctx.response.body = user
})
module.exports = router
