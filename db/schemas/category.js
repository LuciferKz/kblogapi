const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  name: String
})

CategorySchema.statics = {
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
  updateById: function (id, category, cb) {
    return this.findByIdAndUpdate(id,{
      '$set': category
    }).
    exec(cb)
  }
}

module.exports = CategorySchema