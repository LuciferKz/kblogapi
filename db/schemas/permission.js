const mongoose = require('mongoose')

const PermissionSchema = new mongoose.Schema({
  code: String,
  name: String,
  type: Number, // 1 菜单 2 CRUD按钮
  icon: String,
  path: String,
  parentId: String,
  roleIds: Array,
  createAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  }
})

PermissionSchema.pre('save', function(next){
  if (this.isNew) {
    PermissionSchema.createAt = UserSchema.updateAt = Date.now()
  }else{
    PermissionSchema.updateAt = Date.now()
  }
  next()
})

PermissionSchema.statics = {
  fetch: function (filter, cb) {
    return this.findOne(filter).exec(cb)
  },
  fetchAll: function (cb) {
    return this.find().exec(cb)
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
  updateById: function (id, permission, cb) {
    return this.findByIdAndUpdate(id,{
      '$set': permission
    }).
    exec(cb)
  }
}

module.exports = PermissionSchema