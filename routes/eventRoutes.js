const express = require('express');
const router = express.Router();
const { getAllEvents, createEvent, getMyEvents } = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

// Public route
router.get('/', getAllEvents);

// Protected routes
router.post('/', authMiddleware, createEvent);
router.get('/my-events', authMiddleware, getMyEvents);

module.exports = router;