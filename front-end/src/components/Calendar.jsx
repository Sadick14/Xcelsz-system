import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Calendar = ({ onDateClick }) => {
  return (
    <div className="calendar-container">
      <DatePicker
        selected={new Date()}
        onChange={(date) => onDateClick(date.toISOString().split("T")[0])}
        inline
        className="border-2 border-orange-500 rounded-lg p-2"
      />
    </div>
  );
};
