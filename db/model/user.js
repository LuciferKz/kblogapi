const mongoose = require('mongoose');
const UserSchema = require('../schemas/user.js');

const UserModel = mongoose.model("UserModel", UserSchema, "User");

module.exports = UserModel;

