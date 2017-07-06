const mongoose = require('mongoose')
const ArticleSchema = require('../schemas/article')

const ArticleModel = mongoose.model('ArticleModel', ArticleSchema, 'Article')

module.exports = ArticleModel