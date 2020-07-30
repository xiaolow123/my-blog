var router = require('koa-router')()
var Article = require('../models/article')
router.post('/', async (ctx) => {
  let data = ctx.request.body
  let response = ctx.response
  let article = new Article(data)
  let re = await article.save()
  response.body = re
})
router.get('/', async (ctx) => {
  let articles = await Article.find()
  ctx.response.body = articles
})
router.post('/searchOne', async (ctx) => {
  let data = ctx.request.body
  let response = ctx.response
  await Article.update(data, {
    $inc: {
      readcount: 1
    }
  })
  let re = await Article.find(data)
  response.body = re
})
module.exports = router
