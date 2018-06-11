const RoleModel = require('../db/model/role.js')

const RESPONSE_RESULT = require('./responseResult')

const insert = function (model, cb) {
  RoleModel.fetchByName(model.name, function (err, r) {
    if (!r) {
      if (err) return cb(err)
      const role = new RoleModel(model)
      role.save(function (err, article) {
        if (err) return cb(err)
        cb({
          statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
          message: RESPONSE_RESULT.MESSAGE.SUCCESS_INSERT_ROLE
        })
      })
    } else {
      cb({
        statusCode: RESPONSE_RESULT.STATUS.FAIL_TO_OPERATE_DATA,
        message: RESPONSE_RESULT.MESSAGE.ERROR_ROLE_EXSIT
      })
    }
  })
}

const fetchAll = function (cb) {
  RoleModel.fetchAll(function (err, roles) {
    if (err) return cb(err)
    cb({
      statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
      message: RESPONSE_RESULT.MESSAGE.SUCCESS_GET_CATEGORIES,
      roles: roles
    })
  })
}

const fetchById = function (id, cb) {
  RoleModel.fetchById(id, function (err, role) {
    if (err) return cb(err)
    return cb({
      statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
      message: RESPONSE_RESULT.MESSAGE.SUCCESS_REQUEST,
      role: role
    })
  })
}

const removeById = function (id, cb) {
  RoleModel.removeById(id, function (err) {
    if (err) return cb(err)
    cb({
      statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
      message: RESPONSE_RESULT.MESSAGE.SUCCESS_REMOVE_CATEGORY
    })
  })
}

const updateById = function (id, role, cb) {
  RoleModel.updateById(id, role, function (err) {
    if (err) return cb(err)
    cb({
      statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
      message: RESPONSE_RESULT.MESSAGE.SUCCESS_UPDATE_CATEGORY
    })
  })
}

module.exports = {
  insert,
  fetchAll,
  fetchById,
  removeById,
  updateById
}