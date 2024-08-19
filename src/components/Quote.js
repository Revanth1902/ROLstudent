import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Bar } from "react-chartjs-2";
import Cookies from "js-cookie";

import "chart.js/auto";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Avatar,
  LinearProgress,
  IconButton,
  Typography,
  Container,
  Paper,
  Grid,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import "./dashboard.css";

const Dashboard = () => {
  function setWithExpiry(key, value, expiry) {
    const now = new Date();
    const expires = new Date(now.getTime() + expiry);
    Cookies.set(key, JSON.stringify(value), { expires: expires });
  }

  function getWithExpiry(key) {
    const itemStr = Cookies.get(key);
    if (!itemStr) return null;

    try {
      return JSON.parse(itemStr);
    } catch (error) {
      console.error("Failed to parse item value:", error);
      return null;
    }
  }

  const usePersistentState = (key, initialValue, expiryTime) => {
    const [value, setValue] = React.useState(() => {
      const saved = getWithExpiry(key);
      return saved !== null ? saved : initialValue;
    });

    React.useEffect(() => {
      setWithExpiry(key, value, expiryTime);
    }, [value, key, expiryTime]);

    return [value, setValue];
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const [darkMode, setDarkMode] = usePersistentState(
    "darkMode",
    false,
    1 // 1 day expiry
  );

  const [semesterStartDate, setSemesterStartDate] = usePersistentState(
    "semesterStartDate",
    new Date(),
    30 // 30 days expiry
  );

  const [semesterEndDate, setSemesterEndDate] = usePersistentState(
    "semesterEndDate",
    new Date(),
    30 // 30 days expiry
  );

  const [holidays, setHolidays] = usePersistentState(
    "holidays",
    [],
    30 // 30 days expiry
  );

  const [attendanceData, setAttendanceData] = usePersistentState(
    "attendanceData",
    [],
    30 // 30 days expiry
  );

  const [tasks, setTasks] = usePersistentState(
    "tasks",
    [],
    30 // 30 days expiry
  );

  const [completedTasks, setCompletedTasks] = usePersistentState(
    "completedTasks",
    [],
    30 // 30 days expiry
  );

  const [goals, setGoals] = usePersistentState(
    "goals",
    [],
    30 // 30 days expiry
  );

  const [achievedGoals, setAchievedGoals] = usePersistentState(
    "achievedGoals",
    [],
    30 // 30 days expiry
  );

  const [newGoalName, setNewGoalName] = usePersistentState(
    "newGoalName",
    "",
    30 // 30 days expiry
  );

  const [newGoalDescription, setNewGoalDescription] = usePersistentState(
    "newGoalDescription",
    "",
    30 // 30 days expiry
  );

  const [newGoalStartDate, setNewGoalStartDate] = usePersistentState(
    "newGoalStartDate",
    new Date(),
    30 // 30 days expiry
  );

  const [newGoalEndDate, setNewGoalEndDate] = usePersistentState(
    "newGoalEndDate",
    new Date(),
    30 // 30 days expiry
  );

  const [isAttendanceDialogOpen, setIsAttendanceDialogOpen] =
    usePersistentState(
      "isAttendanceDialogOpen",
      false,
      1 // 1 day expiry
    );

  const [attendanceDate, setAttendanceDate] = usePersistentState(
    "attendanceDate",
    new Date(),
    30 // 30 days expiry
  );

  const [attendanceStatus, setAttendanceStatus] = usePersistentState(
    "attendanceStatus",
    "",
    30 // 30 days expiry
  );

  const [reminders, setReminders] = usePersistentState(
    "reminders",
    [],
    30 // 30 days expiry
  );

  const [timetable, setTimetable] = usePersistentState(
    "timetable",
    {
      Monday: ["", "", "", "", "", "", ""],
      Tuesday: ["", "", "", "", "", "", ""],
      Wednesday: ["", "", "", "", "", "", ""],
      Thursday: ["", "", "", "", "", "", ""],
      Friday: ["", "", "", "", "", "", ""],
    },
    30 // 30 days expiry
  );

  const [isTimetableDialogOpen, setIsTimetableDialogOpen] = usePersistentState(
    "isTimetableDialogOpen",
    false,
    1 // 1 day expiry
  );

  const [isHolidayDialogOpen, setIsHolidayDialogOpen] = usePersistentState(
    "isHolidayDialogOpen",
    false,
    1 // 1 day expiry
  );

  const [selectedDay, setSelectedDay] = usePersistentState(
    "selectedDay",
    "",
    30 // 30 days expiry
  );

  const [selectedPeriod, setSelectedPeriod] = usePersistentState(
    "selectedPeriod",
    "",
    30 // 30 days expiry
  );

  const [selectedSubject, setSelectedSubject] = usePersistentState(
    "selectedSubject",
    "",
    30 // 30 days expiry
  );

  const [holidayDate, setHolidayDate] = usePersistentState(
    "holidayDate",
    new Date(),
    30 // 30 days expiry
  );

  const [holidayName, setHolidayName] = usePersistentState(
    "holidayName",
    "",
    30 // 30 days expiry
  );

  useEffect(() => {
    if (typeof attendanceData === "string") {
      try {
        const parsedData = JSON.parse(attendanceData);
        if (Array.isArray(parsedData)) {
          setAttendanceData(parsedData);
        } else {
          console.error("Parsed data is not an array:", parsedData);
        }
      } catch (error) {
        console.error("Failed to parse attendanceData:", error);
        setAttendanceData([]);
      }
    }
  }, [attendanceData]);

  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;

  const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1.5, 3),
    boxShadow: theme.shadows[2],
    "&:hover": {
      boxShadow: theme.shadows[6],
    },
  }));
  useEffect(() => {
    // Save data to local storage
    setWithExpiry("darkMode", darkMode, 1000 * 60 * 60 * 24); // 1 day expiry
    setWithExpiry(
      "semesterStartDate",
      semesterStartDate,
      1000 * 60 * 60 * 24 * 30
    ); // 30 days expiry
    setWithExpiry("semesterEndDate", semesterEndDate, 1000 * 60 * 60 * 24 * 30); // 30 days expiry
    setWithExpiry(
      "holidays",
      JSON.stringify(holidays),
      1000 * 60 * 60 * 24 * 30
    ); // 30 days expiry
    setWithExpiry(
      "attendanceData",
      JSON.stringify(attendanceData),
      1000 * 60 * 60 * 24 * 30
    ); // 30 days expiry
    setWithExpiry("tasks", JSON.stringify(tasks), 1000 * 60 * 60 * 24 * 30); // 30 days expiry
    setWithExpiry(
      "completedTasks",
      JSON.stringify(completedTasks),
      1000 * 60 * 60 * 24 * 30
    ); // 30 days expiry
    setWithExpiry("goals", JSON.stringify(goals), 1000 * 60 * 60 * 24 * 30); // 30 days expiry
    setWithExpiry(
      "achievedGoals",
      JSON.stringify(achievedGoals),
      1000 * 60 * 60 * 24 * 30
    ); // 30 days expiry
    setWithExpiry("newGoalName", newGoalName, 1000 * 60 * 60 * 24 * 30); // 30 days expiry
    setWithExpiry(
      "newGoalDescription",
      newGoalDescription,
      1000 * 60 * 60 * 24 * 30
    ); // 30 days expiry
    setWithExpiry(
      "newGoalStartDate",
      newGoalStartDate,
      1000 * 60 * 60 * 24 * 30
    ); // 30 days expiry
    setWithExpiry("newGoalEndDate", newGoalEndDate, 1000 * 60 * 60 * 24 * 30); // 30 days expiry
    setWithExpiry(
      "isAttendanceDialogOpen",
      isAttendanceDialogOpen,
      1000 * 60 * 60 * 24
    ); // 1 day expiry
    setWithExpiry("attendanceDate", attendanceDate, 1000 * 60 * 60 * 24 * 30); // 30 days expiry
    setWithExpiry(
      "attendanceStatus",
      attendanceStatus,
      1000 * 60 * 60 * 24 * 30
    ); // 30 days expiry
    setWithExpiry(
      "reminders",
      JSON.stringify(reminders),
      1000 * 60 * 60 * 24 * 30
    ); // 30 days expiry
    setWithExpiry(
      "timetable",
      JSON.stringify(timetable),
      1000 * 60 * 60 * 24 * 30
    ); // 30 days expiry
    setWithExpiry(
      "isTimetableDialogOpen",
      isTimetableDialogOpen,
      1000 * 60 * 60 * 24
    ); // 1 day expiry
    setWithExpiry(
      "isHolidayDialogOpen",
      isHolidayDialogOpen,
      1000 * 60 * 60 * 24
    ); // 1 day expiry
    setWithExpiry("selectedDay", selectedDay, 1000 * 60 * 60 * 24 * 30); // 30 days expiry
    setWithExpiry("selectedPeriod", selectedPeriod, 1000 * 60 * 60 * 24 * 30); // 30 days expiry
    setWithExpiry("selectedSubject", selectedSubject, 1000 * 60 * 60 * 24 * 30); // 30 days expiry
    setWithExpiry("holidayDate", holidayDate, 1000 * 60 * 60 * 24 * 30); // 30 days expiry
    setWithExpiry("holidayName", holidayName, 1000 * 60 * 60 * 24 * 30); // 30 days expiry
  }, [
    darkMode,
    semesterStartDate,
    semesterEndDate,
    holidays,
    attendanceData,
    tasks,
    completedTasks,
    goals,
    achievedGoals,
    newGoalName,
    newGoalDescription,
    newGoalStartDate,
    newGoalEndDate,
    isAttendanceDialogOpen,
    attendanceDate,
    attendanceStatus,
    reminders,
    timetable,
    isTimetableDialogOpen,
    isHolidayDialogOpen,
    selectedDay,
    selectedPeriod,
    selectedSubject,
    holidayDate,
    holidayName,
  ]);
  const handleEndDateChange = (e) => {
    setSemesterEndDate(new Date(e.target.value));
  };

  useEffect(() => {
    // Fetch data from local storage
    const savedDarkMode = getWithExpiry("darkMode");
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode);
    }

    const savedSemesterStartDate = getWithExpiry("semesterStartDate");
    if (savedSemesterStartDate !== null) {
      setSemesterStartDate(new Date(savedSemesterStartDate));
    }

    const savedSemesterEndDate = getWithExpiry("semesterEndDate");
    if (savedSemesterEndDate !== null) {
      setSemesterEndDate(new Date(savedSemesterEndDate));
    }

    const savedHolidays = getWithExpiry("holidays");
    if (savedHolidays !== null) {
      setHolidays(JSON.parse(savedHolidays));
    }

    const savedAttendanceData = getWithExpiry("attendanceData");
    if (savedAttendanceData !== null) {
      setAttendanceData(JSON.parse(savedAttendanceData));
    }

    const savedTasks = getWithExpiry("tasks");
    if (savedTasks !== null) {
      setTasks(JSON.parse(savedTasks));
    }

    const savedCompletedTasks = getWithExpiry("completedTasks");
    if (savedCompletedTasks !== null) {
      setCompletedTasks(JSON.parse(savedCompletedTasks));
    }

    const savedGoals = getWithExpiry("goals");
    if (savedGoals !== null) {
      setGoals(JSON.parse(savedGoals));
    }

    const savedAchievedGoals = getWithExpiry("achievedGoals");
    if (savedAchievedGoals !== null) {
      setAchievedGoals(JSON.parse(savedAchievedGoals));
    }

    const savedNewGoalName = getWithExpiry("newGoalName");
    if (savedNewGoalName !== null) {
      setNewGoalName(savedNewGoalName);
    }

    const savedNewGoalDescription = getWithExpiry("newGoalDescription");
    if (savedNewGoalDescription !== null) {
      setNewGoalDescription(savedNewGoalDescription);
    }

    const savedNewGoalStartDate = getWithExpiry("newGoalStartDate");
    if (savedNewGoalStartDate !== null) {
      setNewGoalStartDate(new Date(savedNewGoalStartDate));
    }

    const savedNewGoalEndDate = getWithExpiry("newGoalEndDate");
    if (savedNewGoalEndDate !== null) {
      setNewGoalEndDate(new Date(savedNewGoalEndDate));
    }

    const savedIsAttendanceDialogOpen = getWithExpiry("isAttendanceDialogOpen");
    if (savedIsAttendanceDialogOpen !== null) {
      setIsAttendanceDialogOpen(savedIsAttendanceDialogOpen);
    }

    const savedAttendanceDate = getWithExpiry("attendanceDate");
    if (savedAttendanceDate !== null) {
      setAttendanceDate(new Date(savedAttendanceDate));
    }

    const savedAttendanceStatus = getWithExpiry("attendanceStatus");
    if (savedAttendanceStatus !== null) {
      setAttendanceStatus(savedAttendanceStatus);
    }

    const savedReminders = getWithExpiry("reminders");
    if (savedReminders !== null) {
      setReminders(JSON.parse(savedReminders));
    }

    const savedTimetable = getWithExpiry("timetable");
    if (savedTimetable !== null) {
      setTimetable(JSON.parse(savedTimetable));
    }

    const savedIsTimetableDialogOpen = getWithExpiry("isTimetableDialogOpen");
    if (savedIsTimetableDialogOpen !== null) {
      setIsTimetableDialogOpen(savedIsTimetableDialogOpen);
    }

    const savedIsHolidayDialogOpen = getWithExpiry("isHolidayDialogOpen");
    if (savedIsHolidayDialogOpen !== null) {
      setIsHolidayDialogOpen(savedIsHolidayDialogOpen);
    }

    const savedSelectedDay = getWithExpiry("selectedDay");
    if (savedSelectedDay !== null) {
      setSelectedDay(savedSelectedDay);
    }

    const savedSelectedPeriod = getWithExpiry("selectedPeriod");
    if (savedSelectedPeriod !== null) {
      setSelectedPeriod(savedSelectedPeriod);
    }

    const savedSelectedSubject = getWithExpiry("selectedSubject");
    if (savedSelectedSubject !== null) {
      setSelectedSubject(savedSelectedSubject);
    }

    const savedHolidayDate = getWithExpiry("holidayDate");
    if (savedHolidayDate !== null) {
      setHolidayDate(new Date(savedHolidayDate));
    }

    const savedHolidayName = getWithExpiry("holidayName");
    if (savedHolidayName !== null) {
      setHolidayName(savedHolidayName);
    }
  }, []);

  useEffect(() => {
    // Retrieve stored data if any
  }, []);

  const calculateWorkingDays = () => {
    if (!Array.isArray(holidays)) {
      console.error("holidays is not an array:", holidays);
      return 0; // or some default value
    }

    let totalDays = 0;
    let current = new Date(semesterStartDate);

    while (current <= semesterEndDate) {
      const dayOfWeek = current.getDay();
      if (
        dayOfWeek !== 0 &&
        dayOfWeek !== 6 &&
        !holidays.some(
          (holiday) =>
            new Date(holiday.date).toDateString() === current.toDateString()
        )
      ) {
        totalDays++;
      }
      current.setDate(current.getDate() + 1);
    }

    return totalDays;
  };

  const calculateAttendance = () => {
    if (!Array.isArray(attendanceData)) {
      console.error(
        "Expected attendanceData to be an array but got:",
        typeof attendanceData
      );
      return "0.00";
    }

    const T = calculateWorkingDays();
    const totalDays = T;

    // Ensure all items in attendanceData have the necessary properties
    const validAttendanceData = attendanceData.filter(
      (day) => day.hasOwnProperty("present") && day.hasOwnProperty("isHoliday")
    );

    const P = validAttendanceData.filter((day) => day.present).length;
    const L = validAttendanceData.filter(
      (day) => !day.present && !day.isHoliday
    ).length;

    // Prevent division by zero and ensure percentage calculation is correct
    const percentage =
      totalDays > 0 ? ((P / (P + L)) * 100).toFixed(2) : "0.00";

    return percentage;
  };

  const handleCompleteGoal = (goalId) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId ? { ...goal, completed: true } : goal
    );
    setGoals(updatedGoals);
    setAchievedGoals([
      ...achievedGoals,
      ...updatedGoals.filter((goal) => goal.id === goalId),
    ]);
  };
  const handleAddGoal = () => {
    const newGoal = {
      id: Date.now(),
      name: newGoalName,
      description: newGoalDescription,
      startDate: newGoalStartDate,
      endDate: newGoalEndDate,
      completed: false,
    };
    setGoals([...goals, newGoal]);

    // Clear input fields after adding goal
    setNewGoalName("");
    setNewGoalDescription("");
    setNewGoalStartDate(new Date());
    setNewGoalEndDate(new Date());
  };

  useEffect(() => {
    if (!Array.isArray(goals)) {
      console.error("goals is not an array:", goals);
      return;
    }

    const now = new Date();
    const updatedGoals = goals.map((goal) =>
      now > goal.endDate && !goal.completed
        ? { ...goal, completed: true }
        : goal
    );

    setGoals(updatedGoals);

    setAchievedGoals((prevAchievedGoals) => [
      ...prevAchievedGoals,
      ...updatedGoals.filter(
        (goal) =>
          goal.completed &&
          !prevAchievedGoals.some((achieved) => achieved.id === goal.id)
      ),
    ]);
  }, [goals, achievedGoals]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
    setCompletedTasks(updatedTasks.filter((task) => task.completed));
  };

  const handleTaskDeletion = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleAddHoliday = () => {
    setHolidays([...holidays, { date: holidayDate, name: holidayName }]);
    setHolidayName("");
    setHolidayDate(new Date());
    setIsHolidayDialogOpen(false);

    // Optionally, also mark holidays in attendance data
    setAttendanceData([
      ...attendanceData,
      { date: holidayDate, present: false, isHoliday: true },
    ]);
  };

  const handleAddReminder = (date, description) => {
    setReminders([...reminders, { date, description }]);
  };

  const handleAddAttendance = () => {
    if (attendanceDate && attendanceStatus) {
      setAttendanceData([
        ...attendanceData,
        {
          date: attendanceDate,
          present: attendanceStatus === "present",
          isHoliday: false,
        },
      ]);
      setAttendanceDate(new Date());
      setAttendanceStatus("");
      setIsAttendanceDialogOpen(false);
    }
  };

  const handleAddTask = (name) => {
    const newTask = { id: Date.now(), name, completed: false };
    setTasks([...tasks, newTask]);
  };

  const handleAddTimetableEntry = () => {
    const updatedTimetable = { ...timetable };
    if (selectedDay && selectedPeriod !== "" && selectedSubject) {
      updatedTimetable[selectedDay][selectedPeriod] = selectedSubject;
      setTimetable(updatedTimetable);
      setSelectedDay("");
      setSelectedPeriod("");
      setSelectedSubject("");
      setIsTimetableDialogOpen(false);
    }
  };

  const calculateProgress = () => {
    const totalDays = calculateWorkingDays();
    const elapsedDays = Math.ceil(
      (currentDate - semesterStartDate) / (1000 * 60 * 60 * 24)
    );
    return totalDays > 0
      ? ((elapsedDays / totalDays) * 100).toFixed(2)
      : "0.00";
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const attendanceChartData = {
    labels: ["Weekly", "Monthly", "Semester"],
    datasets: [
      {
        label: "Attendance Percentage",
        data: [
          calculateAttendance(),
          calculateAttendance(),
          calculateAttendance(),
        ],
        backgroundColor: ["#36a2eb", "#ff6384", "#4bc0c0"],
      },
    ],
  };
  const handleDateChange = (e) => {
    setSemesterStartDate(new Date(e.target.value));
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark-mode" : ""}`}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#b1ddf1", color: "black" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ROL Student
          </Typography>
          {/* <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton> */}
          <Avatar alt="User" src={user.photoUrl} />
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {/* Semester Dates */}
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{ borderRadius: 4, px: 4, py: 3, backgroundColor: "#fff4c0" }}
            >
              <Typography
                variant="h6"
                sx={{ mb: 2, textAlign: "center", fontFamily: "Poppins" }}
              >
                Set Semester Dates
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Start Date"
                    type="date"
                    value={
                      semesterStartDate instanceof Date
                        ? semesterStartDate.toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => handleDateChange(e)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    sx={{ fontFamily: "Poppins" }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="End Date"
                    type="date"
                    value={
                      semesterEndDate instanceof Date
                        ? semesterEndDate.toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => handleEndDateChange(e)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    sx={{ fontFamily: "Poppins" }}
                  />
                </Grid>
              </Grid>
              <Typography
                variant="h6"
                sx={{ mt: 4, textAlign: "center", fontFamily: "Poppins" }}
              >
                Semester Progress
              </Typography>
              <LinearProgress
                variant="determinate"
                value={calculateProgress()}
                sx={{
                  mb: 2,
                  mt: 2,
                  height: 10,
                  width: "100%",
                  borderRadius: 5,
                  backgroundColor: "black",
                  "& .MuiLinearProgress-root": {
                    borderRadius: 5, // Match the outer borderRadius
                  },
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#ffd100",
                  },
                }}
              />

              <Typography
                variant="body2"
                sx={{ textAlign: "center", fontFamily: "Poppins" }}
              >
                {" "}
                {calculateProgress()}% completed
              </Typography>

              <Typography
                sx={{ textAlign: "center", mt: 2, fontFamily: "Poppins" }}
              >
                Days left:{" "}
                {calculateWorkingDays(semesterStartDate, semesterEndDate) -
                  Math.ceil(
                    (currentDate - semesterStartDate) / (1000 * 60 * 60 * 24)
                  )}{" "}
                days
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  borderRadius: 4,
                  px: 4,
                  py: 3,
                  backgroundColor: "#dfff00",
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  Attendance Calendar
                </Typography>
                <Calendar
                  onChange={setCurrentDate}
                  value={currentDate}
                  tileContent={({ date }) => {
                    if (!Array.isArray(attendanceData)) {
                      return null;
                    }

                    const log = attendanceData.find(
                      (entry) =>
                        new Date(entry.date).toDateString() ===
                        date.toDateString()
                    );

                    if (log) {
                      return <div>{log.present ? "Present" : "Leave"}</div>;
                    }
                    return null;
                  }}
                  tileClassName={({ date }) => {
                    if (!Array.isArray(attendanceData)) {
                      return null;
                    }

                    const log = attendanceData.find(
                      (entry) =>
                        new Date(entry.date).toDateString() ===
                        date.toDateString()
                    );

                    if (log) {
                      return log.present ? "present" : "leave";
                    }
                    return null;
                  }}
                />
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                mt: 2,
              }}
            >
              <StyledButton
                variant="contained"
                color="primary"
                onClick={() => setIsAttendanceDialogOpen(true)}
              >
                Add Attendance
              </StyledButton>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",

                backgroundColor: "#e5f4e3", // Light background
                fontFamily: "Poppins",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontFamily: "Poppins" }}>
                Timetable
              </Typography>
              <TableContainer
                component={Paper}
                sx={{
                  backgroundColor: "#e5f4e3", // Light background
                  fontFamily: "Poppins",
                }}
              >
                <Table sx={{ fontFamily: "Poppins" }}>
                  <TableHead sx={{ fontFamily: "Poppins" }}>
                    <TableRow sx={{ fontFamily: "Poppins" }}>
                      <TableCell sx={{ fontFamily: "Poppins" }}>Day</TableCell>
                      {Array.from({ length: 7 }, (_, i) => (
                        <TableCell key={i} sx={{ fontFamily: "Poppins" }}>
                          Period {i + 1}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(timetable).map((day) => (
                      <TableRow key={day} sx={{ fontFamily: "Poppins" }}>
                        <TableCell sx={{ fontFamily: "Poppins" }}>
                          {day}
                        </TableCell>
                        {(Array.isArray(timetable[day])
                          ? timetable[day]
                          : []
                        ).map((subject, index) => (
                          <TableCell key={index} sx={{ fontFamily: "Poppins" }}>
                            {subject}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsTimetableDialogOpen(true)}
                sx={{ backgroundColor: "#ff4545", mt: 2 }}
              >
                Add/Edit Timetable Entry
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsHolidayDialogOpen(true)}
                sx={{ backgroundColor: "#ff4545", ml: 2, mt: 2 }}
              >
                Add Holiday
              </Button>
            </Paper>
          </Grid>
          <Dialog
            open={isAttendanceDialogOpen}
            onClose={() => setIsAttendanceDialogOpen(false)}
          >
            <DialogTitle>Add Attendance</DialogTitle>
            <DialogContent>
              <TextField
                type="date"
                label="Date"
                fullWidth
                onChange={(e) => setAttendanceDate(new Date(e.target.value))}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                select
                label="Status"
                fullWidth
                onChange={(e) => setAttendanceStatus(e.target.value)}
                value={attendanceStatus}
                SelectProps={{ native: true }}
              >
                <option value="">Select</option>
                <option value="present">Present</option>
                <option value="leave">Leave</option>
              </TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddAttendance}>Add</Button>
              <Button onClick={() => setIsAttendanceDialogOpen(false)}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          {/* Tasks Section */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4, // Increased for a more prominent curve
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)", // Enhanced depth
                backgroundColor: "#f5f5f5", // Light background
                fontFamily: "Poppins", // Apply Poppins font globally
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontFamily: "Poppins" }}>
                Tasks
              </Typography>
              <TextField
                label="New Task"
                fullWidth
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddTask(e.target.value);
                    e.target.value = "";
                  }
                }}
                sx={{ mb: 2, fontFamily: "Poppins" }}
              />
              <List disablePadding>
                {Array.isArray(tasks) ? (
                  tasks.map((task) => (
                    <ListItem
                      key={task.id}
                      sx={{ backgroundColor: "#fafafa", mb: 1 }}
                    >
                      <ListItemText
                        primary={task.name}
                        sx={{ fontFamily: "Poppins" }}
                      />
                      <ListItemSecondaryAction>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => handleTaskCompletion(task.id)}
                          disabled={task.completed}
                          sx={{ fontFamily: "Poppins", mr: 1 }}
                        >
                          Complete
                        </Button>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => handleTaskDeletion(task.id)}
                          sx={{ fontFamily: "Poppins" }}
                        >
                          Delete
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                ) : (
                  <p>Tasks data is not available or incorrect format.</p>
                )}
              </List>
              <Typography variant="h6" sx={{ mb: 2, fontFamily: "Poppins" }}>
                Completed Tasks
              </Typography>
              <List disablePadding>
                {Array.isArray(completedTasks) &&
                  completedTasks.map((task) => (
                    <ListItem
                      key={task.id}
                      sx={{ backgroundColor: "#fafafa", mb: 1 }}
                    >
                      <ListItemText
                        primary={task.name}
                        sx={{ fontFamily: "Poppins" }}
                      />
                    </ListItem>
                  ))}
              </List>
            </Paper>
          </Grid>

          {/* Reminders Section */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4, // Increased for a more prominent curve
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)", // Enhanced depth
                backgroundColor: "#f5f5f5", // Light background
                fontFamily: "Poppins", // Apply Poppins font globally
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontFamily: "Poppins" }}>
                Reminders
              </Typography>
              <TextField
                label="New Reminder"
                fullWidth
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddReminder(new Date(), e.target.value);
                    e.target.value = "";
                  }
                }}
                sx={{ mb: 2, fontFamily: "Poppins" }}
              />
              <List disablePadding>
                {Array.isArray(reminders) &&
                  reminders.map((reminder, index) => (
                    <ListItem
                      key={index}
                      sx={{ backgroundColor: "#fafafa", mb: 1 }}
                    >
                      <ListItemText
                        primary={reminder.description}
                        secondary={
                          reminder.date
                            ? reminder.date.toDateString()
                            : "No date"
                        }
                        sx={{ fontFamily: "Poppins" }}
                      />
                    </ListItem>
                  ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4, // Increased for a more prominent curve
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)", // Enhanced depth
                backgroundColor: "#f5f5f5", // Light background
                fontFamily: "Poppins", // Apply Poppins font globally
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontFamily: "Poppins" }}>
                Goals
              </Typography>
              <List>
                {Array.isArray(goals) &&
                  goals.map((goal) => {
                    const now = new Date();
                    const totalDays = Math.ceil(
                      (goal.endDate - goal.startDate) / (1000 * 60 * 60 * 24)
                    );
                    const elapsedDays = Math.ceil(
                      (now - goal.startDate) / (1000 * 60 * 60 * 24)
                    );
                    const progress = Math.min(
                      (elapsedDays / totalDays) * 100,
                      100
                    ).toFixed(2);
                    const daysLeft = Math.max(
                      0,
                      Math.ceil((goal.endDate - now) / (1000 * 60 * 60 * 24))
                    );

                    return (
                      <ListItem key={goal.id}>
                        <ListItemText
                          primary={goal.name}
                          secondary={`Description: ${goal.description}`}
                        />
                        <ListItemSecondaryAction>
                          {goal.completed ? (
                            <Button variant="contained" color="success">
                              Achieved
                            </Button>
                          ) : (
                            <>
                              <Typography sx={{ mb: 2, fontFamily: "Poppins" }}>
                                Progress: {progress}%
                              </Typography>
                              <Typography sx={{ mb: 2, fontFamily: "Poppins" }}>
                                Days left: {daysLeft}
                              </Typography>
                              <Button
                                variant="contained"
                                color="success"
                                onClick={() => handleCompleteGoal(goal.id)}
                              >
                                Mark as Completed
                              </Button>
                            </>
                          )}
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
              </List>
              <Typography variant="h6" sx={{ mb: 2, fontFamily: "Poppins" }}>
                Achieved Goals
              </Typography>
              <List>
                {Array.isArray(achievedGoals) &&
                  achievedGoals.map((goal) => (
                    <ListItem key={goal.id}>
                      <ListItemText
                        primary={goal.name}
                        secondary={`Description: ${goal.description}`}
                      />
                      <ListItemSecondaryAction>
                        <Typography>Hurray! Keep on going</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f5f5f5", // Light background
                fontFamily: "Poppins",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontFamily: "Poppins" }}>
                Add Goal
              </Typography>
              <TextField
                label="Goal Name"
                fullWidth
                onChange={(e) => setNewGoalName(e.target.value)}
                sx={{ mb: 2, fontFamily: "Poppins" }}
              />
              <TextField
                label="Goal Description"
                fullWidth
                onChange={(e) => setNewGoalDescription(e.target.value)}
                sx={{ mb: 2, fontFamily: "Poppins" }}
              />
              <TextField
                label="Start Date"
                type="date"
                fullWidth
                onChange={(e) => setNewGoalStartDate(new Date(e.target.value))}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mb: 2, fontFamily: "Poppins" }}
              />
              <TextField
                label="End Date"
                type="date"
                fullWidth
                onChange={(e) => setNewGoalEndDate(new Date(e.target.value))}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mb: 2, fontFamily: "Poppins" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddGoal}
                sx={{ fontFamily: "Poppins" }}
              >
                Add Goal
              </Button>
            </Paper>
          </Grid>
          {/* Attendance Chart */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffd100", // Light background
                fontFamily: "Poppins",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontFamily: "Poppins" }}>
                Attendance Chart
              </Typography>
              <Bar data={attendanceChartData} />
            </Paper>
          </Grid>

          {/* Timetable */}

          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                // backgroundColor: "#ffd100", // Light background
                fontFamily: "Poppins",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontFamily: "Poppins" }}>
                Attendance Logs
              </Typography>
              <List>
                {Array.isArray(attendanceData) &&
                  attendanceData.map((log, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`${new Date(log.date).toLocaleDateString()} ${
                          log.present ? "Present" : "Leave"
                        }`}
                      />
                    </ListItem>
                  ))}

                {Array.isArray(holidays) &&
                  holidays.map((holiday, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`${new Date(
                          holiday.date
                        ).toLocaleDateString()} Holiday: ${holiday.name}`}
                      />
                    </ListItem>
                  ))}

                {/* Additional logic to handle weekends */}
                {Array.from({ length: calculateWorkingDays() }).map(
                  (_, index) => {
                    const date = new Date(semesterStartDate);
                    date.setDate(date.getDate() + index);
                    const dayOfWeek = date.getDay();
                    if (dayOfWeek === 0) {
                      return (
                        <ListItem key={index}>
                          <ListItemText
                            primary={`${date.toLocaleDateString()} Sunday`}
                          />
                        </ListItem>
                      );
                    } else if (dayOfWeek === 6) {
                      return (
                        <ListItem key={index}>
                          <ListItemText
                            primary={`${date.toLocaleDateString()} Saturday`}
                          />
                        </ListItem>
                      );
                    }
                    return null;
                  }
                )}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Timetable Dialog */}
      <Dialog
        open={isTimetableDialogOpen}
        onClose={() => setIsTimetableDialogOpen(false)}
      >
        <DialogTitle>Add/Edit Timetable Entry</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Day"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            fullWidth
            SelectProps={{
              native: true,
            }}
            sx={{ mb: 2 }}
          >
            <option value="">Select Day</option>
            {Object.keys(timetable).map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </TextField>
          <TextField
            label="Period"
            type="number"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(Number(e.target.value))}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Subject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddTimetableEntry} color="primary">
            Save
          </Button>
          <Button
            onClick={() => setIsTimetableDialogOpen(false)}
            color="secondary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Holiday Dialog */}
      <Dialog
        open={isHolidayDialogOpen}
        onClose={() => setIsHolidayDialogOpen(false)}
      >
        <DialogTitle>Add Holiday</DialogTitle>
        <DialogContent>
          <TextField
            label="Holiday Name"
            value={holidayName}
            onChange={(e) => setHolidayName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Date"
            type="date"
            value={
              holidayDate instanceof Date
                ? holidayDate.toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => setHolidayDate(new Date(e.target.value))}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddHoliday} color="primary">
            Add
          </Button>
          <Button
            onClick={() => setIsHolidayDialogOpen(false)}
            color="secondary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
