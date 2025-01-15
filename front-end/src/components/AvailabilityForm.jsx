import React, { useState } from "react";
import { Card, CardContent, Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const AvailableTimeSlots = ({ selectedDate, timeSlots, onAddSlot }) => {
  const [openAddSlot, setOpenAddSlot] = useState(false);
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");
  const [newSlotDate, setNewSlotDate] = useState(selectedDate); // Store the date for which we add the slot

  const handleAddSlot = () => {
    if (newStartTime && newEndTime && newSlotDate) {
      const newSlot = {
        date: newSlotDate, // Add the selected date to the slot
        start_time: newStartTime,
        end_time: newEndTime
      };
      onAddSlot(newSlot); // Trigger the function passed from the parent to add the new slot
      setNewStartTime("");
      setNewEndTime("");
      setOpenAddSlot(false);
    }
  };

  return (
    <Card sx={{ flex: "1 1 48%", borderRadius: 7 }}>
      <CardContent sx={{ backgroundColor: "#ff8c00", textAlign: "center", borderRadius: 3 }}>
        <Typography sx={{ color: "white", fontSize: "1.5rem", fontWeight: "bold", mb: 2 }}>
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
                      "&:hover": { backgroundColor: "#0056b3" },
                    }}
                  >
                    {slot.start_time} - {slot.end_time}
                  </Button>
                ))}
              </Box>
            ) : (
              <Typography sx={{ color: "white", mt: 2, fontSize: "1.2rem", fontStyle: "italic" }}>
                No available slots for {selectedDate.toDateString()}
              </Typography>
            )}
            {/* Button to open add slot modal */}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setOpenAddSlot(true)}
              sx={{ marginTop: 2 }}
            >
              Add New Slot
            </Button>
          </>
        ) : (
          <Typography sx={{ color: "white", mt: 2, fontSize: "1.2rem", fontStyle: "italic" }}>
            Please select a date to view availability
          </Typography>
        )}
      </CardContent>

      {/* Dialog for adding a new time slot */}
      <Dialog open={openAddSlot} onClose={() => setOpenAddSlot(false)}>
        <DialogTitle>Add New Time Slot</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Select Date</InputLabel>
            <Select
              value={newSlotDate}
              onChange={(e) => setNewSlotDate(e.target.value)}
              label="Select Date"
            >
              <MenuItem value={selectedDate}>{selectedDate.toDateString()}</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Start Time"
            type="time"
            value={newStartTime}
            onChange={(e) => setNewStartTime(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="End Time"
            type="time"
            value={newEndTime}
            onChange={(e) => setNewEndTime(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddSlot(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddSlot} color="primary">
            Add Slot
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default AvailableTimeSlots;
