import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import react-icons (Edit and Trash)

const MeetingList = ({ meetings, onCancel, onUpdate }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState(null);

  // Handle dialog open and form population for editing
  const handleUpdateClick = (meeting) => {
    setCurrentMeeting(meeting);
    setOpenDialog(true);
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentMeeting(null);
  };

  // Handle updating the meeting
  const handleSaveUpdate = () => {
    onUpdate(currentMeeting); // Call the passed onUpdate function
    handleCloseDialog();
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setCurrentMeeting((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="card-body px-0 pt-0 pb-2">
      <div className="table-responsive p-0">
        <TableContainer component={Paper}>
          <Table className="table align-items-center mb-0">
            <TableHead>
              <TableRow>
                <TableCell className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Topic</TableCell>
                <TableCell className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">Start time</TableCell>
                <TableCell className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">End time</TableCell>
                <TableCell className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {meetings.map((meeting) => (
                <TableRow key={meeting.id} className="hover:bg-gray-50 transition duration-150">
                  <TableCell className="text-gray-600">{meeting.topic || "No Topic"}</TableCell>
                  <TableCell className="text-gray-600 text-center">
                    {new Date(meeting.start_time).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-gray-600 text-center">
                    {new Date(meeting.end_time).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleUpdateClick(meeting)}
                      color="primary"
                      className="mr-2"
                    >
                      <FaEdit /> {/* Use react-icons FaEdit */}
                    </IconButton>
                    <IconButton
                      onClick={() => onCancel(meeting.id)}
                      color="error"
                    >
                      <FaTrash /> {/* Use react-icons FaTrash */}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Update Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Update Meeting</DialogTitle>
        <DialogContent>
          {currentMeeting && (
            <>
              <TextField
                label="Topic"
                fullWidth
                margin="normal"
                name="topic"
                value={currentMeeting.topic}
                onChange={handleFieldChange}
              />
              <TextField
                label="Start Time"
                type="datetime-local"
                fullWidth
                margin="normal"
                name="start_time"
                value={new Date(currentMeeting.start_time).toISOString().slice(0, 16)}
                onChange={handleFieldChange}
              />
              <TextField
                label="End Time"
                type="datetime-local"
                fullWidth
                margin="normal"
                name="end_time"
                value={new Date(currentMeeting.end_time).toISOString().slice(0, 16)}
                onChange={handleFieldChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveUpdate} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MeetingList;
