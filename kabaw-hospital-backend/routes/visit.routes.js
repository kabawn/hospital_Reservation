// /routes/visit.routes.js
const express = require('express');
const router = express.Router();
const visitController = require('../controllers/visit.controller');

router.get('/upcoming', visitController.getUpcomingVisits);

module.exports = router;
