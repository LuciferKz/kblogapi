/**
 * handler 在操作数据之前进行判断处理
 */

const UserModel = require('../db/model/user.js');
// 生成用户salt值
const hash = require('./hash.js');
// token生成
const jwt = require('jsonwebtoken');
// 返回状态
const RESPONSE_RESULT = require('./responseResult');

// 判断用户是否存在
const userExsit = function (name, cb){
  UserModel.fetchCount(name, function (err, count) {
    if(count == 0){
      return cb(null)
    }else{
      return cb({
        statusCode: RESPONSE_RESULT.STATUS.FAIL_TO_QUERY,
        message: RESPONSE_RESULT.MESSAGE.ERROR_USER_EXSIT
      })
    }
  })
}

const requestAuth = function (id, token, cb) {
  if (!id) return cb({
    statusCode: RESPONSE_RESULT.STATUS.ERROR_RESULT,
    message: RESPONSE_RESULT.MESSAGE.ERROR_USER_ID
  })
  UserModel.fetchById(id, function (err, user) {
    if (err) return cb(err)
    // 存在则通过请求的密码和检索到的用户saltkey生成hash值
    jwt.verify(token, user.salt, function (err, decode) {
      // console.log(err, decode)
      if(err) return cb({
        statusCode: RESPONSE_RESULT.STATUS.ERROR_RESULT,
        message: RESPONSE_RESULT.MESSAGE.ERROR_USER_EXPIRED
      });
      cb({
        statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
        message: RESPONSE_RESULT.MESSAGE.SUCCESS_AUTHENTICATE,
        userData: {
          id: user._id,
          username: user.username,
          photo: user.photo,
          token: token,
        }
      })
    })
  })
}

// 提取所有用户数据
const fetchAll = function (cb) {
  UserModel.fetchAll(function (err, users) {
    if (err) return cb(err)
    cb({
      statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
      message: RESPONSE_RESULT.MESSAGE.SUCCESS_REQUEST,
      users: users
    })
  })
}

// 根据ID获取用户数据
const fetchById = function (id, cb) {
  UserModel.fetchById(id, function (err, user) {
    if(user) {
      if(err) return cb(err)
      cb({
        statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
        message: RESPONSE_RESULT.MESSAGE.SUCCESS_REQUEST,
        userData: {
          id: user._id,
          username: user.username,
          phone: user.phone,
          photo: user.photo,
          email: user.email,
        }
      })
    }else{
      cb({
        statusCode: RESPONSE_RESULT.STATUS.FAIL_TO_QUERY,
        message: RESPONSE_RESULT.MESSAGE.ERROR_USER_NOT_EXSIT
      })
    }
  })
}

// 用户登录
const login = function (name, pass, cb){
  // 根据用户名检索用户
  UserModel.fetchByName(name, function(err, user){
    if(user){
      if(err) return cb({
        statusCode: RESPONSE_RESULT.STATUS.FAIL_TO_QUERY,
        message: RESPONSE_RESULT.MESSAGE.ERROR_USER_NOT_EXSIT
      });
      // 存在则通过请求的密码和检索到的用户saltkey生成hash值
      hash.verify(pass, user.salt, function (err, hash) {
        if(err) return cb(err);
        // 生成的hash值和用户hash值相同则登录成功，并返回用户信息
        if(hash == user.password){
          // 通过jwt生成token
          let token = jwt.sign({id: user._id}, user.salt, {
            expiresIn: 60*60*2*1000 // 2小时
          });
          return cb({
            statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
            message: RESPONSE_RESULT.MESSAGE.SUCCESS_LOGIN,
            userData: {
              id: user._id,
              username: user.username,
              photo: user.photo,
              token: token
            }
          });
        };
        cb({
          statusCode: RESPONSE_RESULT.STATUS.ERROR_RESULT,
          message: RESPONSE_RESULT.MESSAGE.ERROR_WRONG_PASS
        })
      })
    }else{
      cb({
        statusCode: RESPONSE_RESULT.STATUS.FAIL_TO_QUERY,
        message: RESPONSE_RESULT.MESSAGE.ERROR_USER_NOT_EXSIT
      })
    }
  })
}

const loginToken = function (token) {

}

// 用户注册
const register = function (name, pass, cb) {
  userExsit(name, function (err) {
    if(err) return cb(err);
    hash.generate(pass, function (err, salt, hash) {
      var newUser = new UserModel({
        username: name,
        password: hash,
        salt: salt
      });
      newUser.save(function (err, user) {
        if(err) return cb(err);
        cb({
          statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
          message: RESPONSE_RESULT.MESSAGE.SUCCESS_REGISTER
        });
      })
    })
  })
}

// 删除用户
const removeById = function (id, cb) {
  UserModel.removeById(id, function (err, user) {
    if (err) return cb(err)
    cb({
      statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
      message: RESPONSE_RESULT.MESSAGE.SUCCESS_REMOVE_USER
    })
  })
}

// 更新用户数据
const updateById = function (id, user, cb) {
  UserModel.updateById(id, user, function (err, user) {
    if (err) return cb(err)
    cb({
      statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
      message: RESPONSE_RESULT.MESSAGE.SUCCESS_UPDATE_USER,
      userData: {
        id: user._id,
        username: user.username,
        photo: user.photo,
        email: user.email
      }
    })
  })
}

const insert = function (user, cb) {
  userExsit(user.username, function (err) {
    if(err) return cb(err);
    hash.generate(user.password, function (err, salt, hash) {
      user.salt = salt
      user.password = hash
      var newUser = new UserModel(user);
      newUser.save(function (err, user) {
        if(err) return cb(err);
        cb({
          statusCode: RESPONSE_RESULT.STATUS.SUCCESS,
          message: RESPONSE_RESULT.MESSAGE.SUCCESS_REGISTER
        });
      })
    })
  })
}

module.exports = {
  fetchAll,
  fetchById,
  login,
  register,
  requestAuth,
  removeById,
  updateById,
  insert
}