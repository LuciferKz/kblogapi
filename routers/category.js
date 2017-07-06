const express = require('express')
const handlerCategory = require('../handler/category')

const router = express.Router()

router.get('/all', function (req, res, next) {
  handlerCategory.fetchAll(function (result) {
    res.json(result)
  })
})

router.get('/:id', function (req, res, next) {
  handlerCategory.fetchById(req.params.id, function (result) {
    res.json(result)
  })
})

router.post('/new', function (req, res, next) {
  handlerCategory.insert(req.body.category, function (result) {
    res.json(result)
  })
})

router.post('/remove', function (req, res, next) {
  handlerCategory.removeById(req.body.id, function (result) {
    res.json(result)
  })
})

router.post('/update', function (req, res, next) {
  handlerCategory.updateById(req.body.id, req.body.category, function (result) {
    res.json(result)
  })
})

module.exports = router