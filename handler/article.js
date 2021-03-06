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
      message: RESPONSE_RESULT.MESSAGE.SUCCESS_INSERT_ARTICLE,
      article
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
      message: RESPONSE_RESULT.MESSAGE.SUCCESS_UPDATE_ARTICLE,
      article
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

const fetch = function (filter, cb) {
  ArticleModel.fetch(filter, function (err, articles, count) {
    if (err) return cb(err)
    return cb({
      statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
      message: RESPONSE_RESULT.MESSAGE.SUCCESS_REQUEST,
      articles: articles,
      total: count
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