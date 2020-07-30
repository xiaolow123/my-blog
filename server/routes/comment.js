var router = require('koa-router')()
var Comment = require('../models/comment')
router.get('/', async function (ctx) {
  let comments = await Comment.find({
    essayId: ctx.request.query.essayId
  })
  ctx.response.body = comments
})
router.post('/', async function (ctx) {
  let data = ctx.request.body
  let response = ctx.response
  let comment = new Comment({
    userId: data.userId,
    essayId: data.essayId,
    content: data.content
  })
  await comment.save()
  response.body = '评论成功'
})
module.exports = router
