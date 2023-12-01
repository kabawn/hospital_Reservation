const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    doctorName: { type: String, required: true },
    specialty: { type: String, required: true },
    visitDate: { type: Date, required: true }
});

module.exports = mongoose.model('Visit', visitSchema);
