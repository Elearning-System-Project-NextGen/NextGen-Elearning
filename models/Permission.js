const mongoose = require('mongoose');
const PermissionSchema = new mongoose.Schema({
  permission_key: { type: String, required: true },
});
module.exports = mongoose.model('Permission', PermissionSchema);