const Event = require('../models/Event');
const User = require('../models/User');
const transporter = require('../config/nodemailer');
const pug = require('pug');
const path = require('path');

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
      userId: req.user.id,
    });

    const event = await newEvent.save();

    // --- Send Confirmation Email ---
    const user = await User.findById(req.user.id);
    if (user) {
      const emailHtml = pug.renderFile(
        path.join(__dirname, '../emails/eventCreated.pug'),
        {
          userName: user.name,
          event: event,
        }
      );

      const mailOptions = {
        from: `"Event Management API" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: 'Event Created Successfully!',
        html: emailHtml,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
          // Don't block the response for an email error
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }
    // --- End Email Logic ---

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