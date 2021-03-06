const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({
  title: String,
  content: String,
  categoryId: String,
  author: String,
  state: {
    type: Number,
    default: 0 // 0: 未开放 | 1: 开放
  },
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
  fetch: function (filter, cb) {
    const aggregate = [{ $match: filter }]
    let skip = 0
    let limit = 0

    aggregate.push({ $sort: { 'meta.updateAt': -1 } })

    if (typeof filter.skip === 'number') {
      aggregate.push({ $skip: filter.skip })
      skip = filter.skip
      delete filter.skip
    }
    if (typeof filter.limit === 'number') {
      aggregate.push({ $limit: filter.limit })
      limit = filter.limit
      delete filter.limit
    }
    
    for (let key in filter) {
      if (typeof filter[key] === 'string') {
        filter[key] = new RegExp(`${filter[key]}`)
      } 
      // else {
      //   filter[key] = filter[key]
      // }
    }

    return this.count().exec((err, count) => {
      this
      // .aggregate(aggregate)
      .find(filter, {
        title: 1,
        author: 1,
        'meta.createAt': 1,
        'meta.updateAt': 1
      })
      .sort({ 'meta.updateAt': -1 })
      .skip(skip)
      .limit(limit)
      .exec((err, articles) => {
        cb(err, articles, count)
      })
    })
  }
}

module.exports = ArticleSchema