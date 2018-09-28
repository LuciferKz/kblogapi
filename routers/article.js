const express = require('express')
const handlerArticle = require('../handler/article')

const router = express.Router()

router.get('/all', function (req, res, next) {
  handlerArticle.fetchAll(function (result) {
    res.json(result)
  })
})

router.get('/:id', function (req, res, next) {
  if (req.params.id) {
    handlerArticle.fetchById(req.params.id, function (result) {
      res.json(result)
    })
  } else {
    res.json({
      statusCode: 10000,
      message: '缺少文章ID'
    })
  }
})

router.post('/new', function (req, res, next) {
  if (req.body.article) {
    handlerArticle.insert(req.body.article, function (result) {
      res.json(result)
    })
  } else {
    res.json({
      statusCode: 10000,
      message: '未提交任何数据'
    })
  }
})

router.post('/update', function (req, res, next) {
  if (req.body.id) {
    handlerArticle.updateById(req.body.id, req.body.article, function (result) {
      res.json(result)
    })
  } else {
    res.json({
      statusCode: 10000,
      message: '缺少文章ID'
    })
  }
})

router.post('/remove', function (req, res, next) {
  if (req.body.id) {
    handlerArticle.removeById(req.body.id, function (result) {
      res.json(result)
    })
  } else {
    res.json({
      statusCode: 10000,
      message: '缺少文章ID'
    })
  }
})

router.post('/fetch', function (req, res, next) {
  if (req.body.query) {
    handlerArticle.fetch(req.body.query, function (result) {
      res.json(result)
    })
  } else {
    res.json({
      statusCode: 10000,
      message: '缺少查询条件'
    })
  }
})

module.exports = router