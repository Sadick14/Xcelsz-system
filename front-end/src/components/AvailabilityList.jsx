import React from "react";
import { Card, Typography, Button } from "@mui/material";

const AvailabilityList = ({ availability, onRemove, onUpdate }) => {
  return (
    <div className="space-y-4">
      {availability.map((slot) => (
        <Card key={slot.id} className="p-4 rounded-lg shadow-md bg-white">
          <Typography variant="h6" className="font-semibold text-gray-800">
            Available from{" "}
            {new Date(slot.start_time).toLocaleString()} to{" "}
            {new Date(slot.end_time).toLocaleString()}
          </Typography>
          <div className="mt-4 flex space-x-2">
            <Button
              variant="contained"
              color="primary"
              onClick={() => onUpdate(slot)}
              className="flex-1"
            >
              Update
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => onRemove(slot.id)}
              className="flex-1"
            >
              Remove
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AvailabilityList;
