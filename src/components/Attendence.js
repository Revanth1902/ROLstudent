import React from 'react';
import { Container, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { useFirebase } from '../context/FireBasecontext';

const Attendance = () => {
  const { db } = useFirebase();

  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Attendance Percentage',
        data: [85, 90, 80, 95],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;

    setWithExpiry("darkMode", darkMode, oneYearInMilliseconds);
    setWithExpiry(
      "semesterStartDate",
      semesterStartDate,
      oneYearInMilliseconds
    );
    setWithExpiry("semesterEndDate", semesterEndDate, oneYearInMilliseconds);
    setWithExpiry("holidays", holidays, oneYearInMilliseconds);
    setWithExpiry("attendanceData", attendanceData, oneYearInMilliseconds);
    setWithExpiry("tasks", tasks, oneYearInMilliseconds);
    setWithExpiry("completedTasks", completedTasks, oneYearInMilliseconds);
    setWithExpiry("goals", goals, oneYearInMilliseconds);
    setWithExpiry("achievedGoals", achievedGoals, oneYearInMilliseconds);
    setWithExpiry("reminders", reminders, oneYearInMilliseconds);
    setWithExpiry("timetable", timetable, oneYearInMilliseconds);
  }, [
    semesterStartDate,
    semesterEndDate,
    holidays,
    attendanceData,
    tasks,
    completedTasks,
    goals,
    achievedGoals,
    reminders,
    timetable,
  ]);
  useEffect(() => {
    
    const storedSemesterStartDate = getWithExpiry("semesterStartDate");
    const storedSemesterEndDate = getWithExpiry("semesterEndDate");
    const storedHolidays = getWithExpiry("holidays");
    const storedAttendanceData = getWithExpiry("attendanceData");
    const storedTasks = getWithExpiry("tasks");
    const storedCompletedTasks = getWithExpiry("completedTasks");
    const storedGoals = getWithExpiry("goals");
    const storedAchievedGoals = getWithExpiry("achievedGoals");
    const storedReminders = getWithExpiry("reminders");
    const storedTimetable = getWithExpiry("timetable");


    if (storedSemesterStartDate)
      setSemesterStartDate(new Date(storedSemesterStartDate));
    if (storedSemesterEndDate)
      setSemesterEndDate(new Date(storedSemesterEndDate));
    if (storedHolidays) setHolidays(storedHolidays);
    if (storedAttendanceData) setAttendanceData(storedAttendanceData);
    if (storedTasks) setTasks(storedTasks);
    if (storedCompletedTasks) setCompletedTasks(storedCompletedTasks);
    if (storedGoals) setGoals(storedGoals);
    if (storedAchievedGoals) setAchievedGoals(storedAchievedGoals);
    if (storedReminders) setReminders(storedReminders);
    if (storedTimetable) setTimetable(storedTimetable);
  }, []);
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Attendance Overview
      </Typography>
      <Bar data={data} />
    </Container>
  );
};

export default Attendance;
