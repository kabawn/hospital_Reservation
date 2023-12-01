// /routes/admin.routes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const adminAuth = require('../middleware/auth.middleware');

router.post('/login', adminController.adminLogin);
router.get('/bookings', adminAuth, adminController.viewAllBookings);

// Visits routes
router.get('/visits', adminAuth, adminController.getAllVisits); // Get all visits
router.post('/visits', adminAuth, adminController.createVisit); // Create a new visit
router.put('/visits/:id', adminAuth, adminController.updateVisit); // Update an existing visit
router.delete('/visits/:id', adminAuth, adminController.deleteVisit); // Delete a visit

module.exports = router;
