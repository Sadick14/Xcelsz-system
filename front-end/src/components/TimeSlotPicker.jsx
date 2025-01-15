import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Box, Card, CardContent, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const TimeSlotSelection = ({ userId, selectedDate, onSelectSlot }) => {
  const [selectedDateState, setSelectedDate] = useState(selectedDate || null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [showAddSlotModal, setShowAddSlotModal] = useState(false);
  const [newSlot, setNewSlot] = useState({ start_time: "", end_time: "" });

  useEffect(() => {
    if (selectedDateState) {
      fetchAvailableTimeSlots(selectedDateState);
    }
  }, [selectedDateState]);

  const fetchAvailableTimeSlots = async (date) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}/available-slots`, {
        params: { date: date.toISOString() },
      });
      setTimeSlots(response.data);
    } catch (error) {
      console.error("Error fetching time slots:", error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddSlot = () => {
    setShowAddSlotModal(true);
  };

  const handleCloseAddSlotModal = () => {
    setShowAddSlotModal(false);
    setNewSlot({ start_time: "", end_time: "" });
  };

  const handleSaveNewSlot = async () => {
    if (newSlot.start_time && newSlot.end_time) {
      try {
        const response = await axios.post(`http://localhost:5000/users/${userId}/available-slots`, {
          date: selectedDateState.toISOString(),
          start_time: newSlot.start_time,
          end_time: newSlot.end_time,
        });
        console.log('New slot added:', response.data);
        fetchAvailableTimeSlots(selectedDateState);  // Refresh the available slots
        handleCloseAddSlotModal();
      } catch (error) {
        console.error("Error adding new slot:", error);
      }
    }
  };

  return (
    <div>
      <Card sx={{ flex: "1 1 48%", borderRadius: 7 }}>
        <CardContent>
          <Typography sx={{ color: "white", fontSize: "1.5rem", fontWeight: "bold", mb: 2 }}>
            Available Time Slots
          </Typography>
          {selectedDateState ? (
            <>
              {timeSlots.length > 0 ? (
                <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "1fr 1fr" }}>
                  {timeSlots.map((slot, index) => (
                    <Button
                      key={index}
                      variant="contained"
                      color="primary"
                      onClick={() => onSelectSlot(slot)} // Call onSelectSlot when a slot is clicked
                      sx={{
                        borderRadius: 1,
                        textTransform: "capitalize",
                        transition: "all 0.2s",
                        "&:hover": {
                          backgroundColor: "#0056b3",
                        },
                      }}
                    >
                      {new Date(slot.start_time).toLocaleTimeString()} - {new Date(slot.end_time).toLocaleTimeString()}
                    </Button>
                  ))}
                </Box>
              ) : (
                <Typography sx={{ color: "white", mt: 2, fontSize: "1.2rem", fontStyle: "italic" }}>
                  No available slots for {selectedDateState.toDateString()}
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ mt: 2 }}
                    onClick={handleAddSlot}
                  >
                    Add a New Slot
                  </Button>
                </Typography>
              )}
            </>
          ) : (
            <Typography sx={{ color: "white", mt: 2, fontSize: "1.2rem", fontStyle: "italic" }}>
              Please select a date to view availability
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Add Slot Modal */}
      <Dialog open={showAddSlotModal} onClose={handleCloseAddSlotModal}>
        <DialogTitle>Add New Time Slot</DialogTitle>
        <DialogContent>
          <TextField
            label="Start Time"
            type="time"
            fullWidth
            value={newSlot.start_time}
            onChange={(e) => setNewSlot({ ...newSlot, start_time: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="End Time"
            type="time"
            fullWidth
            value={newSlot.end_time}
            onChange={(e) => setNewSlot({ ...newSlot, end_time: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddSlotModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveNewSlot} color="primary">
            Save Slot
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TimeSlotSelection;
