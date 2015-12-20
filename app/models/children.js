var mongoose = require('mongoose');
module.exports = mongoose.model('Children', {
    name: {type : String, default: ''},
    gender: {type: String},
    shirt_size: {type: String},
    age: {type: String},
    school: {type: String},
    notes: {type: String}
});
