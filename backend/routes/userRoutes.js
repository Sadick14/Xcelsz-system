const express = require('express');
const User = require('../models/User');
const Availability = require('../models/Availability');  // Corrected import path
const router = express.Router();
const { Op } = require('sequelize');

// Get availability slots for a user on a specific date
router.get('/:userId/available-slots', async (req, res) => {
  console.log(`Fetching available slots for user: ${req.params.userId} on date: ${req.query.date}`);
  
  const { userId } = req.params;
  const { date } = req.query; // Extract date query parameter

  // Ensure the date is valid and parse it
  const selectedDate = new Date(date);
  if (isNaN(selectedDate)) {
    return res.status(400).json({ error: 'Invalid date format' });
  }

  // Set start and end of the day for the selected date
  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0); // Set to midnight (00:00:00)
  
  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999); // Set to the end of the day (23:59:59)

  try {
    const availableSlots = await Availability.findAll({
      where: {
        userId,
        start_time: {
          [Op.gte]: startOfDay, // Greater than or equal to start of the selected day
        },
        end_time: {
          [Op.lte]: endOfDay, // Less than or equal to the end of the selected day
        },
      },
    });

    if (availableSlots.length === 0) {
      return res.status(404).json({ message: 'No available slots found for this user on the selected date' });
    }

    // Return the filtered available slots
    res.json(availableSlots);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Failed to fetch available slots' });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll(); // Fetch id and name only
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


module.exports = router;
