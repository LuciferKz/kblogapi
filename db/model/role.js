const mongoose = require('mongoose');
const RoleSchema = require('../schemas/role.js');

const RoleModel = mongoose.model("RoleModel", RoleSchema, "Role");

module.exports = RoleModel;

