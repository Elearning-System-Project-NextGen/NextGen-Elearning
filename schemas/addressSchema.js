const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  country: String,
  postal_code: String,
});
module.exports = mongoose.model('Address', addressSchema);