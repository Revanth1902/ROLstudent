// src/components/TasksGoals.js
import React, { useState } from 'react';
import { Container, TextField, Button, List, ListItem } from '@mui/material';

const TasksGoals = () => {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [goalName, setGoalName] = useState('');
  const [goals, setGoals] = useState([]);

  const addTask = () => {
    setTasks(prev => [...prev, taskName]);
    setTaskName('');
  };

  const addGoal = () => {
    setGoals(prev => [...prev, goalName]);
    setGoalName('');
  };

  return (
    <Container>
      <TextField
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        label="New Task"
      />
      <Button onClick={addTask}>Add Task</Button>
      <List>
        {tasks.map((task, index) => (
          <ListItem key={index}>{task}</ListItem>
        ))}
      </List>

      <TextField
        value={goalName}
        onChange={(e) => setGoalName(e.target.value)}
        label="New Goal"
      />
      <Button onClick={addGoal}>Add Goal</Button>
      <List>
        {goals.map((goal, index) => (
          <ListItem key={index}>{goal}</ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TasksGoals;
