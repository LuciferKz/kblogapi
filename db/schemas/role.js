const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema({
  name: String,   // 角色名
  keys: String,    // 角色名关键字
  rights: String, // 角色权限
  level: Number,  // 角色等级
  createAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  }
})

RoleSchema.pre('save', function(next){
  if (this.isNew) {
    RoleSchema.createAt = RoleSchema.updateAt = Date.now()
  }else{
    RoleSchema.updateAt = Date.now()
  }

  next()
})

RoleSchema.statics = {
  fetchAll: function (cb) {
    return this.find().exec(cb)
  },
  fetchByName: function (name, cb) {
    return this.findOne({name: name}).exec(cb)
  },
  fetchById: function (id, cb) {
    return this.findOne({_id: id}).exec(cb)
  },
  removeById: function (id, cb) {
    return this.remove({
      _id: id
    }).
    exec(cb)
  },
  updateById: function (id, role, cb) {
    return this.findByIdAndUpdate(id,{
      '$set': role
    }).
    exec(cb)
  }
}

module.exports = RoleSchema