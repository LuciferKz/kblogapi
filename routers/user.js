const express = require('express');
const handlerUser = require('../handler/user.js');

const router = express.Router();

router.use(function (req, res, next) {
  console.log('Time', Date.now());
  next();
})

router.get('/all', function (req, res, next) {
  handlerUser.fetchAll(function (result) {
    res.json(result)
  })
})

router.get('/:id', function (req, res, next) {
  handlerUser.fetchById(req.params.id, function (result) {
    res.json(result);
  })
})

router.post('/login', function (req, res, next) {
  handlerUser.login(req.body.username, req.body.password, function (result) {
    res.json(result);
  })
})

router.post('/signup', function (req, res, next) {
  handlerUser.register(req.body.username, req.body.password, function (result) {
    res.json(result);
  })
})

router.post('/auth', function (req, res, next) {
  handlerUser.requestAuth(req.body.username, req.body.token, function (result) {
    res.json(result)
  })
})

router.post('/remove', function (req, res, next) {
  if (req.body.id) {
    handlerUser.removeById(req.body.id, function (result) {
      res.json(result)
    })
  } else {
    res.json({
      statusCode: 10000,
      message: '缺少用户ID'
    })
  }
})

router.post('/update', function (req, res, next) {
  if (req.body.id) {
    handlerUser.updateById(req.body.id, req.body.user, function (result) {
      res.json(result)
    })
  } else {
    res.json({
      statusCode: 10000,
      message: '缺少用户ID'
    })
  }
})

router.post('/insert', function (req, res, next) {
  if (req.body.user) {
    handlerUser.insert(req.body.user, function (result) {
      res.json(result)
    })
  } else {
    res.json({
      statusCode: 10000,
      message: '未提交任何数据'
    })
  }
})
module.exports = router;