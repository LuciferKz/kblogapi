const CategoryModel = require('../db/model/category')

const RESPONSE_RESULT = require('./responseResult')

const fetchAll = function (cb) {
  CategoryModel.fetchAll(function (err, categories) {
    if (err) return cb(err)
    cb({
      statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
      message: RESPONSE_RESULT.MESSAGE.SUCCESS_GET_CATEGORIES,
      categories: categories
    })
  })
}

const fetchById = function (id, cb) {
  CategoryModel.fetchById(id, function (err, category) {
    if (err) return cb(err)
    return cb({
      statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
      message: RESPONSE_RESULT.MESSAGE.SUCCESS_REQUEST,
      category: category
    })
  })
}

const insert = function (category, cb) {
  CategoryModel.fetchByName(category.name, function (err, cat) {
    if (!cat) {
      if (err) return cb(err)
      const articleCategory = new CategoryModel({name: category.name})
      articleCategory.save(function (err, article) {
        if (err) return cb(err)
        cb({
          statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
          message: RESPONSE_RESULT.MESSAGE.SUCCESS_INSERT_CATEGORY
        })
      })
    } else {
      cb({
        statusCode: RESPONSE_RESULT.STATUS.FAIL_TO_OPERATE_DATA,
        message: RESPONSE_RESULT.MESSAGE.ERROR_CATEGORY_EXSIT
      })
    }
  })
}

const removeById = function (id, cb) {
  CategoryModel.removeById(id, function (err) {
    if (err) return cb(err)
    cb({
      statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
      message: RESPONSE_RESULT.MESSAGE.SUCCESS_REMOVE_CATEGORY
    })
  })
}

const updateById = function (id, category, cb) {
  CategoryModel.updateById(id, category, function (err) {
    if (err) return cb(err)
    cb({
      statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
      message: RESPONSE_RESULT.MESSAGE.SUCCESS_UPDATE_CATEGORY
    })
  })
}


module.exports = {
  fetchAll,
  fetchById,
  insert,
  removeById,
  updateById
}