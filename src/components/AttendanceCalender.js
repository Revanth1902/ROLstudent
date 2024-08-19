// src/components/AttendanceCalendar.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Container, TextField, Button } from '@mui/material';

const AttendanceCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [attendance, setAttendance] = useState({});

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const markAttendance = (status) => {
    setAttendance(prev => ({ ...prev, [date.toDateString()]: status }));
  };

  return (
    <Container>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileClassName={({ date }) => {
          const dateString = date.toDateString();
          if (attendance[dateString] === 'present') return 'present';
          if (attendance[dateString] === 'leave') return 'leave';
          if (attendance[dateString] === 'holiday') return 'holiday';
          return null;
        }}
      />
      <Button onClick={() => markAttendance('present')}>Present</Button>
      <Button onClick={() => markAttendance('leave')}>Leave</Button>
      <Button onClick={() => markAttendance('holiday')}>Holiday</Button>
    </Container>
  );
};

export default AttendanceCalendar;
