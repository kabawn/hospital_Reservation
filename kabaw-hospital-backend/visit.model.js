// models/visit.model.js

const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  doctorName: { type: String, required: true },
  specialty: { type: String, required: true },
  visitDate: { type: Date, required: true },
  // Include other fields as necessary, such as location, available slots, etc.
});

module.exports = mongoose.model('Visit', visitSchema);
