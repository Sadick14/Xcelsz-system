import React, { useState, useEffect } from "react";
import MeetingForm from "./components/MeetingForm";
import MeetingList from "./components/MeetingList";
import { Calendar } from "./components/Calendar";
import { Typography, Button, Card, CardContent, Box } from "@mui/material";
import axios from 'axios';

const App = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(1); // You can replace this with actual logic to set userId

  useEffect(() => {
    fetchMeetings();
  }, []);



  // Function to fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');  // Ensure this matches your backend endpoint
      return response.data;  // Axios automatically parses the JSON response
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;  // Rethrow the error to handle it in the calling function
    }
  };

  // Fetch all meetings data from the API
  const fetchMeetings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/meetings");
      setMeetings(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

  // Fetch available slots for a user by userId
  const fetchAvailableSlots = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}/available-slots`);
      setTimeSlots(response.data);
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  // Schedule a new meeting
  const handleScheduleMeeting = async (meetingData) => {
    try {
      const response = await axios.post('http://localhost:5000/meetings', meetingData);
      console.log('Meeting scheduled:', response.data);
      // Refetch meetings after scheduling
      fetchMeetings();
    } catch (error) {
      console.error('Error scheduling meeting:', error);
    }
  };

  // Update an existing meeting
  const handleUpdateMeeting = async (meeting) => {
    const updatedData = {
      start_time: meeting.start_time,
      end_time: meeting.end_time,
      topic: meeting.topic,
    };

    try {
      const response = await axios.put(`http://localhost:5000/meetings/${meeting.id}`, updatedData);
      console.log('Meeting updated:', response.data);
      // Refetch meetings after updating
      fetchMeetings();
    } catch (error) {
      console.error('Error updating meeting:', error);
    }
  };

  // Cancel a scheduled meeting
  const handleCancelMeeting = async (meetingId) => {
    try {
      await axios.delete(`http://localhost:5000/meetings/${meetingId}`);
      console.log('Meeting cancelled');
      // Refetch meetings after canceling
      fetchMeetings();
    } catch (error) {
      console.error('Error canceling meeting:', error);
    }
  };

  // Handle date click from the calendar to show available time slots
  const handleDateClick = async (date) => {
    const dateObj = new Date(date);
    setSelectedDate(dateObj);
    try {
      const timeSlotsData = await fetch(`http://localhost:5000/users/${userId}/available-slots?date=${dateObj.toISOString()}`);
      const timeSlots = await timeSlotsData.json();
      setTimeSlots(timeSlots); // Update the time slots for the selected date
    } catch (error) {
      console.error('Error fetching time slots:', error);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa", py: 4 }}>
      <Box
        sx={{
          backgroundColor: "#343a40",
          color: "#ffffff",
          py: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Meeting Scheduler
        </Typography>
        <Typography variant="subtitle1">
          Efficiently schedule and manage your meetings.
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 1200, mx: "auto", p: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "space-between",
          }}
        >
          {/* Calendar Section */}
          <Card sx={{ flex: "1 1 48%", borderRadius: 7 }}>
            <CardContent className="text-center bg-orange-500">
              <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>
                Choose a Date
              </Typography>
              <Calendar onDateClick={handleDateClick} />
            </CardContent>
          </Card>

          {/* Available Time Slots */}
          <Card sx={{ flex: "1 1 48%", borderRadius: 7 }}>
            <CardContent
              sx={{
                backgroundColor: "#ff8c00",
                textAlign: "center",
                borderRadius: 3,
              }}
            >
              <Typography
                sx={{ color: "white", fontSize: "1.5rem", fontWeight: "bold", mb: 2 }}
              >
                Available Time Slots
              </Typography>
              {selectedDate ? (
                <>
                  {timeSlots.length > 0 ? (
                    <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "1fr 1fr" }}>
                      {timeSlots.map((slot, index) => (
                        <Button
                          key={index}
                          variant="contained"
                          color="primary"
                          sx={{
                            borderRadius: 1,
                            textTransform: "capitalize",
                            transition: "all 0.2s",
                            "&:hover": {
                              backgroundColor: "#0056b3",
                            },
                          }}
                        >
                          {slot.start_time} - {slot.end_time}
                        </Button>
                      ))}
                    </Box>
                  ) : (
                    <Typography
                      sx={{
                        color: "white",
                        mt: 2,
                        fontSize: "1.2rem",
                        fontStyle: "italic",
                      }}
                    >
                      No available slots for {selectedDate.toDateString()}
                    </Typography>
                  )}
                </>
              ) : (
                <Typography
                  sx={{
                    color: "white",
                    mt: 2,
                    fontSize: "1.2rem",
                    fontStyle: "italic",
                  }}
                >
                  Please select a date to view availability
                </Typography>
              )}
            </CardContent>
          </Card>

        </Box>

        {/* Schedule Meeting Button */}
        <div className="text-center my-8">
          <Button
            variant="contained"
            color="success"
            sx={{ px: 2, py: 1,
            borderRadius:3 }}
            onClick={() => setShowModal(true)}
          >
            Schedule Meeting
          </Button>
        </div>

        {/* Meeting Form Modal */}
        {showModal && (
          <MeetingForm
            onSubmit={handleScheduleMeeting}
            selectedDate={selectedDate}
            closeModal={() => setShowModal(false)}
          />
        )}

        {/* Meeting List */}
        <div className="mt-12">
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Scheduled Meetings</h2>
            <MeetingList meetings={meetings} onCancel={handleCancelMeeting}   onUpdate={handleUpdateMeeting}  // Pass handleUpdateMeeting here
/>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default App;
