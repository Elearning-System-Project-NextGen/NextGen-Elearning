const mongoose = require('mongoose');
const permissionSchema = new mongoose.Schema({
  permission_key: { type: String, required: true },
});
module.exports = mongoose.model('Permission', permissionSchema);