const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    bookingNumber: { type: String, required: true, unique: true },
    visit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visit',
        required: true
    }
});


module.exports = mongoose.model('Booking', bookingSchema);
