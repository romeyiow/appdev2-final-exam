const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load env vars
dotenv.config();

const app = express();

// Body parser
app.use(express.json());

// --- Database Connection ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};



connectDB();


// --- Routes ---
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// --- Basic Route for Testing ---
app.get('/', (req, res) => {
  res.send('Event Management API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));