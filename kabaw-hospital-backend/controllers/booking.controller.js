const Counter = require('../models/counter.model'); // Require the Counter model at the top

const Booking = require('../models/booking.model');
const Visit = require('../models/visit.model');
const { validationResult } = require('express-validator');

const createBooking = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullName, age, phoneNumber, visitId } = req.body;

    // Retrieve the visit details
    const visit = await Visit.findById(visitId);
    if (!visit) {
      return res.status(404).json({ message: 'Visit not found.' });
    }

    // Create a unique booking number here, perhaps using a library or custom logic
    const bookingNumber = await generateBookingNumber(); // Use await here

    // Create a new booking with the request data and visit details
    const booking = new Booking({
      fullName,
      age,
      phoneNumber,
      bookingNumber, // This is now generated automatically
      doctorName: visit.doctorName,
      specialty: visit.specialty,
      visitDate: visit.visitDate,
      visit: visit._id  // You need to include this line
    });

    // Save the booking to the database
    await booking.save();

    // Respond with the created booking
    res.status(201).json({ message: "Booking created", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while processing your request.' });
  }
};

// Implement a function to generate a unique booking number
async function generateBookingNumber() {
  // Use the identifier for booking number sequence
  const counterId = 'bookingNumber';

  // Find the counter document and increment the sequence atomically
  const counter = await Counter.findOneAndUpdate(
    { _id: counterId },
    { $inc: { seq: 1 } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  // Ensure the sequence is a 4-digit number
  const sequence = counter.seq % 10000;
  const bookingNumber = sequence.toString().padStart(4, '0'); // Pad with zeros to maintain 4 digits

  return bookingNumber;
}

module.exports = {
  createBooking
};
