// config/connection.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
  const databaseUrl = process.env.CONNECTION_STRING;
  console.log('MongoDB URI:', databaseUrl); // Log the URI to ensure it's correct

  mongoose.connect(databaseUrl)  // No need for useNewUrlParser or useUnifiedTopology anymore
    .then(() => {
      console.log('MongoDB connected');
    })
    .catch(error => {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1); // Exit process with failure
    });
};

module.exports = connectDB;

