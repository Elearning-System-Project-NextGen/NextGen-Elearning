const mongoose = require('mongoose');
const AddressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  country: String,
  postal_code: String,
});
module.exports = mongoose.model('Address', AddressSchema);