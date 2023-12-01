// /controllers/visit.controller.js
const Visit = require('../models/visit.model');

const getUpcomingVisits = async (req, res) => {
  try {
    const currentDateTime = new Date();
    const visits = await Visit.find({ visitDate: { $gte: currentDateTime } });
    res.status(200).json(visits);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching upcoming visits.' });
  }
};

module.exports = {
  getUpcomingVisits
};
