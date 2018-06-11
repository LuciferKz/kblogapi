const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  phone: Number,
  email: String,
  age: Number,
  gender: String,
  photo: String,
  salt: String, // salt 登录加密
  createAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  }
})

UserSchema.pre('save', function(next){
  if (this.isNew) {
    UserSchema.createAt = UserSchema.updateAt = Date.now()
  }else{
    UserSchema.updateAt = Date.now()
  }

  next()
})

UserSchema.statics = {
  fetchAll: function (cb) {
    return this.find({}, {'username': 1, 'phone': 1, 'email': 1, 'photo': 1, 'createAt': 1, 'updateAt': 1}).
    exec(cb)
  },
  fetchById: function(id, cb) {
    return this.findOne({
      _id: id
    }).
    exec(cb)
  },
  fetchByName: function (name, cb) {
    return this.findOne({
      username: name
    }).
    exec(cb)
  },
  fetchCount: function (name, cb) {
    return this.count({
      username: name
    }).
    exec(cb)
  },
  removeById: function (id, cb) {
    return this.remove({
      _id: id
    }).
    exec(cb)
  },
  updateById: function (id, user, cb) {
    /**
     * findByIdAndUpdate
     * options
     *
     * if new is true then return value is the modified data,default to false
     */
    return this.findByIdAndUpdate(id,{
      '$set': user
    },{
      new: true
    }).
    exec(cb)
  }
}

module.exports = UserSchema;
