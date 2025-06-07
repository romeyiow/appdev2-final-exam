const Event = require('../models/Event');

// @desc    Fetch all events
// @route   GET /api/events
// @access  Public
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('userId', 'name email');
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create a new event
// @route   POST /api/events
// @access  Private
exports.createEvent = async (req, res) => {
  const { title, location, date, description } = req.body;
  
  try {
    const newEvent = new Event({
      title,
      location,
      date,
      description,
      userId: req.user.id, // from authMiddleware
    });

    const event = await newEvent.save();
    
    // We will add email sending logic here in the next task
    
    res.status(201).json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Fetch events created by the logged-in user
// @route   GET /api/my-events
// @access  Private
exports.getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user.id });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};