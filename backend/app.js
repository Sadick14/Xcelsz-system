const express = require('express');
const app = express();
const sequelize = require('./config/database');
const meetingRoutes = require('./routes/meetingRoutes');
const userRoutes = require('./routes/userRoutes');  // Ensure the path is correct for userRoutes
const Availability = require('./models/Availability');

const cors = require('cors');
app.use(cors());

app.use(express.json()); // Middleware to parse JSON

// Use meeting routes
app.use('/meetings', meetingRoutes);
app.use('/users', userRoutes);  // Routes for user and available slots


// Start server
app.listen(5000, async () => {
  console.log('Server is running on port 5000');
  try {
    await sequelize.sync();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});
