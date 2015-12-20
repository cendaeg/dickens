var mongoose = require('mongoose');
var Family = mongoose.model('Family', {
  key: {type: String},
  f_name1: {type: String, default: ''},
  l_name1: {type: String},
  f_name2: {type: String, default: ''},
  l_name2: {type: String},
  alt_adult: {type: String},
  phone1: {type: String},
  phone2: {type: String},
  alt_phone: {type: String},
  address: {type: String},
  apt_lot_po: {type: String},
  city: {type: String},
  zip: {type: Number},
  rural: {type: Boolean},
  approved: {type: Boolean},
  toys: {type: Boolean},
  certificate: {type: Boolean},
  food: {type: Number},
  notes: {type: String},
  added: {type: Date, default: Date.now},
  children: {type: Array},
  others: {type: Array}
});
module.exports = Family;
