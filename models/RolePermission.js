const mongoose = require('mongoose');
const RolePermissionSchema = new mongoose.Schema({
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  permission_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Permission' },
});
module.exports = mongoose.model('RolePermission', RolePermissionSchema);