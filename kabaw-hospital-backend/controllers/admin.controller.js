// /controllers/admin.controller.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Booking = require('../models/booking.model');
const Visit = require('../models/visit.model');
const dotenv = require('dotenv');

dotenv.config();

const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  // Here we should check the admin credentials. Let's use environment variables for added security
  if (username === process.env.ADMIN_USERNAME) {
    const validPassword = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    if (validPassword) {
      // Sign a token with the admin's username
      const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: "Admin logged in", token });
    } else {
      res.status(401).send('Invalid credentials.');
    }
  } else {
    res.status(401).send('Invalid credentials.');
  }
};

const viewAllBookings = async (req, res) => {
  try {
    // Optionally you could use .populate() to include related visit details
    const bookings = await Booking.find().populate('visit');
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the bookings.' });
  }
};

const createVisit = async (req, res) => {
  const { doctorName, specialty, visitDate } = req.body;

  // Basic validation
  if (!doctorName || !specialty || !visitDate) {
    return res.status(400).send('All fields are required.');
  }

  try {
    const newVisit = new Visit({
      doctorName,
      specialty,
      visitDate: new Date(visitDate) // Ensure that visitDate is a Date object
    });
    await newVisit.save();
    
    res.status(201).json({ message: "Visit created", visit: newVisit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the visit.' });
  }
};

// New function to get all visits
const getAllVisits = async (req, res) => {
    try {
      const visits = await Visit.find();
      res.status(200).json(visits);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching visits.' });
    }
  };
  
  // New function to update a visit
  const updateVisit = async (req, res) => {
    const { doctorName, specialty, visitDate } = req.body;
    const { id } = req.params; // Assuming you're passing the id as a URL parameter
  
    try {
      const updatedVisit = await Visit.findByIdAndUpdate(
        id,
        { doctorName, specialty, visitDate },
        { new: true }
      );
      res.status(200).json(updatedVisit);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the visit.' });
    }
  };
  
  // New function to delete a visit
  const deleteVisit = async (req, res) => {
    const { id } = req.params; // Assuming you're passing the id as a URL parameter
  
    try {
      await Visit.findByIdAndDelete(id);
      res.status(200).json({ message: 'Visit deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while deleting the visit.' });
    }
  };
  
  module.exports = {
    adminLogin,
    viewAllBookings,
    createVisit,
    getAllVisits,
    updateVisit,
    deleteVisit
  };