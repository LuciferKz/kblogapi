const ArticleModel = require('../db/model/article')

const RESPONSE_RESULT = require('./responseResult')

const fetchAll = function (cb) {
  ArticleModel.fetchAll(function (err, articles) {
    if (err) return cb(err)
    return cb({
      statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
      message: RESPONSE_RESULT.MESSAGE.SUCCESS_REQUEST,
      articles: articles
    })
  })
}

const insert = function (article, cb) {
  let newArticle = new ArticleModel(article)
  newArticle.save(function (err, article) {
    if (err) return cb(err)
    return cb({
      statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
      message: RESPONSE_RESULT.MESSAGE.SUCCESS_INSERT_ARTICLE
    })
  })
}

const fetchById = function (id, cb) {
  ArticleModel.fetchById(id, function (err, article) {
    if (err) return cb(err)
    return cb({
      statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
      message: RESPONSE_RESULT.MESSAGE.SUCCESS_GET_ARTICLE,
      article: article
    })
  })
}

const updateById = function (id, article, cb) {
  ArticleModel.updateById(id, article, function (err) {
    if (err) return cb(err)
    return cb({
      statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
      message: RESPONSE_RESULT.MESSAGE.SUCCESS_UPDATE_ARTICLE
    })
  })
}

const removeById = function (id, cb) {
  ArticleModel.removeById(id, function (err) {
    if (err) return cb(err)
    return cb({
      statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
      message: RESPONSE_RESULT.MESSAGE.SUCCESS_REMOVE_ARTICLE
    })
  })
}

const fetch = function (query, projection, options, cb) {
  ArticleModel.fetch(query, projection, options, function (err, articles) {
    if (err) return cb(err)
    return cb({
      statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
      message: RESPONSE_RESULT.MESSAGE.SUCCESS_REQUEST,
      articles: articles
    })
  })
}

module.exports = {
  fetch,
  fetchAll,
  fetchById,
  insert,
  updateById,
  removeById
}