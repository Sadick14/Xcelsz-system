const express = require('express');
const Meeting = require('../models/Meeting');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, start_time, end_time, topic } = req.body;
  try {
    const newMeeting = await Meeting.create({ userId, start_time, end_time, topic });
    res.status(201).json(newMeeting);
  } catch (err) {
    res.status(500).json({ error: 'Failed to schedule meeting' });
  }
});

router.get('/', async (req, res) => {
  try {
    const meetings = await Meeting.findAll();  // Fetch all meetings from the database
    res.json(meetings);  // Return the list of meetings
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch meetings' });
  }
});

router.put('/:meetingId', async (req, res) => {
  const { meetingId } = req.params;
  const { start_time, end_time, topic } = req.body;
  try {
    const updatedMeeting = await Meeting.update(
      { start_time, end_time, topic },
      { where: { id: meetingId }, returning: true }
    );
    res.json(updatedMeeting[1][0]);
  } catch (err) {
    console.error(err);  // Log the error to understand what went wrong
    res.status(500).json({ error: 'Failed to update meeting' });
  }
});



router.delete('/:meetingId', async (req, res) => {
  const { meetingId } = req.params;
  try {
    await Meeting.destroy({ where: { id: meetingId } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to cancel meeting' });
  }
});

module.exports = router;
