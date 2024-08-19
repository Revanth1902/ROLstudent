// src/components/Timetable.js
import React, { useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button } from '@mui/material';

const Timetable = () => {
  const [timetable, setTimetable] = useState({ Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] });

  const handleSubjectChange = (day, index, value) => {
    setTimetable(prev => ({
      ...prev,
      [day]: prev[day].map((sub, i) => (i === index ? value : sub)),
    }));
  };

  return (
    <Container>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Period</TableCell>
              <TableCell>Monday</TableCell>
              <TableCell>Tuesday</TableCell>
              <TableCell>Wednesday</TableCell>
              <TableCell>Thursday</TableCell>
              <TableCell>Friday</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(8)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                  <TableCell key={day}>
                    <TextField
                      value={timetable[day][i] || ''}
                      onChange={(e) => handleSubjectChange(day, i, e.target.value)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Timetable;
