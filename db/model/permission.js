const mongoose = require('mongoose')
const PermissionSchema = require('../schemas/permission')

const PermissionModel = mongoose.model('PermissionModel', PermissionSchema, 'Permission')

module.exports = PermissionModel