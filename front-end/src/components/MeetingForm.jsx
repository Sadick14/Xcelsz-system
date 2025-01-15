import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimeSlotPicker from './TimeSlotPicker';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Swal from 'sweetalert2'; // Import SweetAlert

const MeetingForm = ({ onSubmit, selectedDate, closeModal }) => {
  const [meetingDate, setMeetingDate] = useState(selectedDate || new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [topic, setTopic] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [error, setError] = useState(null);
  const [openTimeSlotModal, setOpenTimeSlotModal] = useState(false); // Controls modal visibility

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
      } catch (error) {
        setError('Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedTimeSlot) {
      setError('Please select a time slot.');
      return;
    }
    const meetingDetails = {
      userId: parseInt(selectedUser, 10),
      start_time: selectedTimeSlot.start_time,
      end_time: selectedTimeSlot.end_time,
      topic,
    };
    onSubmit(meetingDetails)
      .then((response) => {
        // Assuming the onSubmit function returns a promise
        Swal.fire({
          icon: 'success',
          title: 'Meeting Scheduled!',
          text: 'Your meeting has been successfully scheduled.',
        });
        closeModal(); // Close the modal after success
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Schedule Meeting',
          text: error.message || 'There was an error scheduling the meeting.',
        });
      });
  };

  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
  };

  const handleTimeSlotSelect = (slot) => {
    setSelectedTimeSlot(slot); // Set the selected time slot
    setOpenTimeSlotModal(false); // Close the modal
  };

  const handleCloseModal = () => {
    setOpenTimeSlotModal(false); // Close the modal
  };

  const handleDateSelect = (e) => {
    setMeetingDate(new Date(e.target.value));
    setOpenTimeSlotModal(true); // Open the time slot picker modal when the date is selected
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg" style={{ width: '90%', maxWidth: '500px', borderRadius: '16px' }}>
        <h2 className="text-2xl font-bold text-center text-orange-700 mb-6">Schedule Meeting</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Select User</label>
            <select
              value={selectedUser}
              onChange={(e) => handleUserSelect(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
              required
            >
              <option value="" disabled>-- Select a User --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Meeting Date</label>
            <input
              type="date"
              value={meetingDate.toISOString().slice(0, 10)}
              onChange={handleDateSelect} // Update the date selection logic here
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
          {selectedUser && selectedTimeSlot && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Selected Time Slot</label>
              <input
                type="text"
                value={`${selectedTimeSlot.start_time} - ${selectedTimeSlot.end_time}`}
                readOnly
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Meeting Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter meeting topic (optional)"
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-orange-700 text-white py-2 px-4 rounded-lg hover:bg-orange-800">
              Schedule
            </button>
            <button type="button" onClick={closeModal} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">
              Cancel
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {/* Time Slot Picker Modal */}
      <Dialog open={openTimeSlotModal} onClose={handleCloseModal}>
        <DialogTitle>Select Available Time Slot</DialogTitle>
        <DialogContent>
          <TimeSlotPicker
            userId={selectedUser}
            selectedDate={meetingDate}
            onSelectSlot={handleTimeSlotSelect}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MeetingForm;
