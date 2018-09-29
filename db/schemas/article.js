const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({
  title: String,
  content: String,
  categoryId: String,
  author: String,
  state: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

ArticleSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

ArticleSchema.statics = {
  fetchAll: function (cb) {
    return this.find().exec(cb)
  },
  fetchById: function (id, cb) {
    return this.findOne({
      _id: id
    }).
    exec(cb)
  },
  updateById: function (id, article, cb) {
    return this.findByIdAndUpdate(id,{
      '$set': article
    }).
    exec(cb)
  },
  removeById: function (id, cb) {
    return this.remove({
      _id: id
    }).
    exec(cb)
  },
  fetch: function (query, projection, options, cb) {
    // let params = [].slice.call(arguments),
    // cb = params.splice(-1, 1);

    return this.find(query, projection, options).
    exec(cb)
  }
}

module.exports = ArticleSchema