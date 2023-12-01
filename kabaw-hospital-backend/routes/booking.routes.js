// /routes/booking.routes.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');

router.post('/book-appointment', [
  body('fullName').isString(),
  body('age').isNumeric(),
  body('phoneNumber').isMobilePhone('any')
], bookingController.createBooking);

module.exports = router;
