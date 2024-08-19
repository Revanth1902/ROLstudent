import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';

const GoalSetting = () => {
  const [goal, setGoal] = useState('');

  const setNewGoal = () => {
    // Logic to save the goal
    console.log('Goal set:', goal);
    setGoal('');
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Set Your Goal
      </Typography>
      <TextField
        label="Enter your goal"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <Button variant="contained" onClick={setNewGoal}>
        Set Goal
      </Button>
    </Container>
  );
};

export default GoalSetting;
