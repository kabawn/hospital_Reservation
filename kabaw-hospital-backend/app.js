// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const adminRoutes = require('./routes/admin.routes');
const bookingRoutes = require('./routes/booking.routes');
const visitRoutes = require('./routes/visit.routes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use('/admin', adminRoutes);
app.use('/bookings', bookingRoutes);
app.use('/visits', visitRoutes);

// Catch-all error handler
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
});

module.exports = app;
