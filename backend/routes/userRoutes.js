const express = require('express');
const User = require('../models/User');
const Availability = require('../models/Availability');  // Corrected import path
const router = express.Router();

// Get availability slots for a user
router.get('/:userId/available-slots', async (req, res) => {
  console.log(`Fetching available slots for user: ${req.params.userId}`);
  const { userId } = req.params;
  try {
    const availableSlots = await Availability.findAll({
      where: { userId }
    });

    if (availableSlots.length === 0) {
      return res.status(404).json({ message: 'No available slots found for this user' });
    }

    res.json(availableSlots);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Failed to fetch available slots' });
  }
});


module.exports = router;
