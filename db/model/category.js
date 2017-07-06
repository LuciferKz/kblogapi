const mongoose = require('mongoose')
const CategorySchema = require('../schemas/category')

const CategoryModel = mongoose.model('CategoryModel', CategorySchema, 'Category')

module.exports = CategoryModel