const PermissionModel = require('../db/model/permission.js')

const RESPONSE_RESULT = require('./responseResult')

const insert = function (model, cb) {
  PermissionModel.fetch({code: model.code}, function (err, r) {
    if (!r) {
      if (err) return cb(err)
      const permission = new PermissionModel(model)
      permission.save(function (err, pn) {
        if (err) return cb(err)
        cb({
          statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
          message: RESPONSE_RESULT.MESSAGE.SUCCESS_INSERT_PERMISSION
        })
      })
    } else {
      cb({
        statusCode: RESPONSE_RESULT.STATUS.FAIL_TO_OPERATE_DATA,
        message: RESPONSE_RESULT.MESSAGE.ERROR_PERMISSION_EXSIT
      })
    }
  })
}

const fetchAll = function (cb) {
  PermissionModel.fetchAll(function (err, permissions) {
    if (err) return cb(err)
    cb({
      statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
      message: RESPONSE_RESULT.MESSAGE.SUCCESS_GET_PERMISSIONS,
      permissions: permissions
    })
  })
}

const fetchById = function (id, cb) {
  PermissionModel.fetchById(id, function (err, permission) {
    if (err) return cb(err)
    return cb({
      statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
      message: RESPONSE_RESULT.MESSAGE.SUCCESS_REQUEST,
      permission: permission
    })
  })
}

const removeById = function (id, cb) {
  PermissionModel.removeById(id, function (err) {
    if (err) return cb(err)
    cb({
      statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
      message: RESPONSE_RESULT.MESSAGE.SUCCESS_REMOVE_PERMISSION
    })
  })
}

const updateById = function (id, permission, cb) {
  PermissionModel.updateById(id, permission, function (err) {
    if (err) return cb(err)
    cb({
      statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
      message: RESPONSE_RESULT.MESSAGE.SUCCESS_UPDATE_PERMISSION
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