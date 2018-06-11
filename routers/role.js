const express = require('express')
const handlerRole = require('../handler/role')

const router = express.Router()

router.get('/all', function (req, res, next) {
  handlerRole.fetchAll(function (result) {
    res.json(result)
  })
})

router.get('/:id', function (req, res, next) {
  handlerRole.fetchById(req.params.id, function (result) {
    res.json(result)
  })
})

router.post('/new', function (req, res, next) {
  handlerRole.insert(req.body.role, function (result) {
    res.json(result)
  })
})

router.post('/remove', function (req, res, next) {
  handlerRole.removeById(req.body.id, function (result) {
    res.json(result)
  })
})

router.post('/update', function (req, res, next) {
  handlerRole.updateById(req.body.id, req.body.role, function (result) {
    res.json(result)
  })
})

module.exports = router