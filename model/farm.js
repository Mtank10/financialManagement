const mongoose = require('mongoose');

const financialSchema = new mongoose.Schema({
    farmer: {type: String, required: true},
    type: {type: String, required: true},
    amount: {type: Number, required: true},
    date: {type: Date, required: true},
  });

module.exports = mongoose.model('Financial', financialSchema);