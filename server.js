require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error('MongoDB connection error:', error));

// Middleware to parse JSON
app.use(express.json());

// Import routes
const promotionsRouter = require('./routes/promotions');
app.use('/offers', promotionsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); 