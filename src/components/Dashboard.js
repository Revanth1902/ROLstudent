import React, { useState, useEffect } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  List,
  ListItem,
  ListItemText,
  TableHead,
  Snackbar,
  TableRow,
  Paper as TablePaper,
} from "@mui/material";
import Calendar from "react-calendar";
import { Pie } from "react-chartjs-2";
import "react-calendar/dist/Calendar.css";
import Cookies from "js-cookie";
import LinearProgress from "@mui/material/LinearProgress";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CelebrationIcon from "@mui/icons-material/Celebration";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Confetti from "react-confetti";

import { Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import "./dashboard.css";
const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#F5F5F5",
}));
const StyledModalBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  textAlign: "center",
  position: "relative",
}));

const ProgressTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
  fontWeight: 500,
}));

const ProgressLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.palette.grey[200],
  "& .MuiLinearProgress-bar": {
    borderRadius: 4,
  },
}));

const GoalListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const GoalDescription = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(0.5),
}));

const GoalProgress = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
  color: theme.palette.text.primary,
  fontWeight: 600,
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

const styles = {
  table: {
    minWidth: 650,
    borderCollapse: "separate",
    borderSpacing: 0,
    "& thead tr th": {
      backgroundColor: "#f5f5f5",
      padding: "10px",
      borderBottom: "1px solid #ddd",
    },
    "& tbody tr td": {
      padding: "10px",
      borderBottom: "1px solid #ddd",
    },
  },
  tableCellAction: {
    textAlign: "center",
    fontFamily: "Poppins",
  },
  buttonAdd: {
    marginTop: 3,
    marginBottom: 2,
    backgroundColor: "#28a745", // Adjust color as needed
    color: "#fff",
    "&:hover": {
      backgroundColor: "#218c3d",
    },
  },
  buttonEdit: {
    backgroundColor: "#ff9800", // Adjust color as needed
    color: "#fff",
    "&:hover": {
      backgroundColor: "#e08200",
    },
  },
};
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  backgroundColor: "#ffffff",
}));

const ScrollableLogContainer = styled("div")(({ theme }) => ({
  maxHeight: "200px", // Adjust the height as needed
  overflowY: "auto",
  paddingRight: theme.spacing(1), // To avoid overlap with scrollbar
}));

const StyledList = styled(List)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  overflow: "auto",
  maxHeight: "400px",
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

const CelebrationModal = ({ open, onClose }) => (
  <Modal
    open={open}
    onClose={onClose}
    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    <StyledModalBox>
      <CloseButton onClick={onClose}>
        <Typography variant="h6">×</Typography>
      </CloseButton>
      <Confetti />
      <Typography variant="h6" gutterBottom>
        Hurray! You have completed a task!
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <CheckCircleIcon color="success" style={{ fontSize: 80 }} />
      </Box>
      <Box>
        <CelebrationIcon style={{ fontSize: 50, color: "#FFC107" }} />
      </Box>
    </StyledModalBox>
  </Modal>
);

const API_URL = "https://attendencebackend-n0au.onrender.com/api";

const Dashboard = () => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    "sub1",
    "sub2",
    "sub3",
    "sub4",
    "sub5",
    "sub6",
    "sub7",
    "sub8",
    "Action",
  ];

  // Define the time slots (periods)
  const [entry, setEntry] = useState({ periods: Array(8).fill("") });

  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;
  const [semesterStartDate, setSemesterStartDate] = useState("");
  const [semesterEndDate, setSemesterEndDate] = useState("");
  const [attendance, setAttendance] = useState([]);

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [logs, setLogs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());g
  const [attendanceStatus, setAttendanceStatus] = useState("present");
  const [holidayName, setHolidayName] = useState("");
  const [userAvatar, setUserAvatar] = useState(
    "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/avocado_scream_avatar_food-512.png"
  );
  const [progress, setProgress] = useState({
    completedDays: 0,
    remainingDays: 0,
    percentage: 0,
  });
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [tasks, setTasks] = useState([]);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [smallmessage, setSmallmessage] = useState("");
  const [notificationPermission, setNotificationPermission] = useState(
    Notification.permission
  );

  const [newGoal, setNewGoal] = useState({
    goalName: "",
    goalEndDate: "",
    goalDescription: "",
  });

  const [timetable, setTimetable] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editEntry, setEditEntry] = useState(null);
  const [celebrationOpen, setCelebrationOpen] = useState(false);
  const [openGoalModal, setOpenGoalModal] = useState(false);
  const formatDate = (date) => {
    if (isNaN(date.getTime())) return null;
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const timetableData = daysOfWeek.reduce((acc, day) => {
    acc[day] = timeSlots.reduce((slots, slot) => {
      slots[slot] = ""; // Initialize periods with empty string
      return slots;
    }, {});
    return acc;
  }, {});

  // Populate the timetableData with actual data from the timetable prop
  timetable.forEach((entry) => {
    if (timetableData[entry.day]) {
      // Ensure periods are mapped correctly, including index 0
      entry.periods.forEach((period, index) => {
        if (index < timeSlots.length) {
          timetableData[entry.day][timeSlots[index]] = period;
        }
      });
    }
  });
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCompleteSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const LogEntry = styled(Typography)(({ type }) => ({
    fontFamily: "Poppins",
    marginBottom: "8px",
    color:
      type === "leave" ? "#f44336" : type === "holiday" ? "#b08df1" : "#000000",
  }));

  useEffect(() => {
    // Request notification permission on component mount
    if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission);
      });
    }
  }, []);

  useEffect(() => {
    if (notificationPermission === "granted") {
      const notifyUser = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Notify at 6 AM, 8 AM, and 5 PM
        if (
          (hours === 6 && minutes === 0 && seconds === 0) ||
          (hours === 8 && minutes === 0 && seconds === 0) ||
          (hours === 17 && minutes === 0 && seconds === 0)
        ) {
          new Notification("Reminder", {
            body: "Don't forget to mark today's attendance!",
            icon: "/rol.png", // Replace with your own icon
          });
        }
      };

      // Check every second
      const intervalId = setInterval(notifyUser, 1000);

      // Clear interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [notificationPermission]);

  useEffect(() => {
    handleFetch();
  }, [user.uid]);

  const handleFetch = () => {
    fetch(`${API_URL}/user/${user.uid}`)
      .then((response) => response.json())
      .then((data) => {
        setSemesterStartDate(data.semesterStartDate || "");
        setSemesterEndDate(data.semesterEndDate || "");
        setAttendance(data.attendance || []);
        setTimetable(data.timetable || []);
        setTasks(data.tasks || []);
        setGoals(data.goals || []);
        setLoading(false); // Fetch timetable data
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  useEffect(() => {
    if (semesterStartDate && semesterEndDate) {
      const startDate = new Date(semesterStartDate);
      const endDate = new Date(semesterEndDate);

      const weekends = getWeekends(startDate, endDate);

      const attendanceLogs = attendance
        .map((log) => ({
          id: log._id,
          date: formatDate(new Date(log.date)),
          status: log.status,
        }))
        .filter((log) => log.date);

      const allLogs = [...attendanceLogs, ...weekends].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      setLogs(allLogs);
    }
  }, [semesterStartDate, semesterEndDate, attendance]);

  useEffect(() => {
    if (semesterStartDate && semesterEndDate) {
      const startDate = new Date(semesterStartDate);
      const endDate = new Date(semesterEndDate);
      const currentDate = new Date();

      // Calculate completed days only if the current date is after the start date
      const completedDays =
        currentDate >= startDate
          ? Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24))
          : 0;

      // Calculate remaining days only if the current date is before the end date
      const remainingDays =
        currentDate <= endDate
          ? Math.floor((endDate - currentDate) / (1000 * 60 * 60 * 24))
          : 0;
      let smallMessage = "";
      // Handle edge cases
      if (currentDate < startDate) {
        smallMessage = "The semester has not started yet.";
      } else if (currentDate > endDate) {
        smallMessage = "The semester has already ended.";
      } else {
        smallMessage = "The semester is in progress.";
      }

      // Set the message to display
      setSmallmessage(smallMessage);

      console.log({ completedDays, remainingDays });

      const totalDays =
        Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      const totalWorkingDays =
        totalDays -
        Math.floor(totalDays / 7) * 2 -
        attendance.filter((a) => a.status === "holiday").length;

      const presentDays = attendance.filter(
        (a) => a.status === "present"
      ).length;
      const percentageAttendance = totalWorkingDays
        ? (presentDays / totalWorkingDays) * 100
        : 0;

      setProgress({
        completedDays,
        remainingDays,
        percentage: percentageAttendance,
      });
    }
  }, [semesterStartDate, semesterEndDate, attendance]);
  const handleAddTask = () => {
    fetch(`${API_URL}/task`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.uid, taskName: newTaskName }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.tasks);
        handleFetch();
        setNewTaskName("");
        setOpenTaskModal(false);
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const handleSemesterDatesChange = () => {
    fetch(`${API_URL}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.uid,
        semesterStartDate: new Date(semesterStartDate),
        semesterEndDate: new Date(semesterEndDate),
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Semester dates updated:", data));
    handleFetch();
  };
  const handleAddGoal = () => {
    fetch(`${API_URL}/goal`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.uid, ...newGoal }),
    })
      .then((response) => response.json())
      .then((data) => {
        setGoals(data.goals);
        setNewGoal({ goalName: "", goalEndDate: "", goalDescription: "" });
        setOpenGoalModal(false);
        handleFetch();
      })
      .catch((error) => console.error("Error adding goal:", error));
  };
  const calculateProgress = (createdOn, goalEndDate) => {
    const endDate = new Date(goalEndDate);
    const startDate = new Date(createdOn);
    const currentDate = new Date();

    // Calculate the total number of days between the start and end dates
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    // If the goal hasn't started yet
    if (currentDate < startDate) {
      return 0; // Progress is 0%
    }

    // If the goal has already ended
    if (currentDate > endDate) {
      return 100; // Progress is 100%
    }

    // Calculate the number of days elapsed since the start date
    const elapsedDays = Math.ceil(
      (currentDate - startDate) / (1000 * 60 * 60 * 24)
    );

    // Calculate the percentage of progress
    const percentage = (elapsedDays / totalDays) * 100;

    return Math.min(100, percentage).toFixed(1); // Ensure the percentage does not exceed 100%
  };
  const handleAttendanceChange = () => {
    if (!selectedDate) {
      setSnackbarMessage("Please select a valid date.");
      setSnackbarOpen(true);
      return;
    }

    fetch(`${API_URL}/attendance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.uid,
        date: new Date(selectedDate).toISOString(), // Ensure date is in ISO format
        status: attendanceStatus,
        holidayName: attendanceStatus === "holiday" ? holidayName : "",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setSnackbarMessage(data.message);
          setSnackbarOpen(true);
          handleFetch();
        } else {
          setSnackbarMessage("Attendance saved successfully");
          setSnackbarOpen(true);
          setHolidayName("");
          handleFetch();
          // Optionally, clear the selection and status after successful save
          setSelectedDate(new Date());
          setAttendanceStatus("");
        }
      })
      .catch((error) => {
        console.error("Error saving attendance:", error);
        setSnackbarMessage("Error saving attendance");
        setSnackbarOpen(true);
      });
  };

  const handleResetData = () => {
    fetch(`${API_URL}/user/${user.uid}`, { method: "DELETE" })
      .then((response) => response.json())
      .then(() => {
        setSemesterStartDate("");
        setSemesterEndDate("");
        handleFetch();
        setAttendance([]);
        setLogs([]);
      });
  };

  const getWeekends = (startDate, endDate) => {
    const weekends = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        const formattedDate = formatDate(currentDate);
        if (formattedDate)
          weekends.push({ date: formattedDate, status: "weekend" });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weekends;
  };

  const tileClassName = ({ date }) => {
    const formattedDate = formatDate(date);
    const log = logs.find((log) => log.date === formattedDate);
    return log ? `calendar-tile ${log.status}` : null;
  };
  const handleDayChange = (event) => {
    const selectedDay = event.target.value;
    const periods = timetableData[selectedDay] || Array(8).fill("");

    setEntry((prev) => ({
      ...prev,
      day: selectedDay,
      periods,
    }));
  };

  const attendanceData = {
    labels: ["Present", "Leave", "Holiday"],
    datasets: [
      {
        data: [
          attendance.filter((a) => a.status === "present").length,
          attendance.filter((a) => a.status === "leave").length,
          logs.filter((a) => a.status === "holiday").length,
        ],
        backgroundColor: ["#ad6989", "#ee9777", "#82c4c3"],
      },
    ],
  };

  const handleOpenModal = (mode, entry) => {
    setModalMode(mode);
    setEditEntry(entry);

    if (mode === "edit" && entry) {
      setEntry({
        day: entry.day,
        periods: entry.periods || Array(8).fill(""),
      });
    } else {
      setEntry({
        day: "",
        periods: Array(8).fill(""),
      });
    }

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditEntry(null);
  };
  const handleInputChange = (event, index) => {
    const { value } = event.target;
    setEntry((prev) => {
      const updatedPeriods = [...prev.periods];
      updatedPeriods[index] = value;
      return { ...prev, periods: updatedPeriods };
    });
  };
  const handleSaveTimetableEntry = () => {
    const newEntry = {
      day: entry.day || "",
      periods: entry.periods || [], // Changed to handle multiple subjects
    };

    if (modalMode === "edit" && editEntry) {
      setTimetable((prev) =>
        prev.map((entry) =>
          entry.day === editEntry.day
            ? { ...entry, periods: newEntry.periods }
            : entry
        )
      );
    } else {
      setTimetable((prev) => [...prev, newEntry]);
    }

    fetch(`${API_URL}/timetable`, {
      method: modalMode === "edit" ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.uid,
        timetable: [newEntry], // Send the new timetable entry as an array
      }),
    })
      .then((response) => response.json())
      .then(() => {
        handleCloseModal();
        handleFetch();
      })
      .catch((error) => console.error("Error saving timetable entry:", error));
  };
  useEffect(() => {
    if (modalMode === "edit" && entry.day) {
      const periods = timetableData[entry.day] || Array(8).fill("");
      setEntry((prev) => ({
        ...prev,
        periods,
      }));
    }
  }, [entry.day, modalMode, timetableData]);

  const formattedStartDate = formatDate(new Date(semesterStartDate));
  const formattedEndDate = formatDate(new Date(semesterEndDate));
  const formattedPercentage = progress.percentage.toFixed(1);
  const handleCompleteTask = (taskId) => {
    fetch(`${API_URL}/user/${user.uid}/task/${taskId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== taskId));
        setCelebrationOpen(true);
        setTimeout(() => setCelebrationOpen(false), 3000);
        handleFetch(); // Close the modal after 3 seconds
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  return (
    <>
      {loading ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="200px"
            width="200px"
            viewBox="0 0 200 200"
            style={{ display: "block", margin: "auto" }} // Optional style for centering
          >
            <defs>
              <clipPath id="pencil-eraser">
                <rect height="30" width="30" ry="5" rx="5" />
              </clipPath>
            </defs>
            <circle
              transform="rotate(-113,100,100)"
              strokeLinecap="round"
              strokeDashoffset="439.82"
              strokeDasharray="439.82 439.82"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              r="70"
              className="pencil__stroke"
            />
            <g transform="translate(100,100)" className="pencil__rotate">
              <g fill="none">
                <circle
                  transform="rotate(-90)"
                  strokeDashoffset="402"
                  strokeDasharray="402.12 402.12"
                  strokeWidth="30"
                  stroke="hsl(223,90%,50%)"
                  r="64"
                  className="pencil__body1"
                />
                <circle
                  transform="rotate(-90)"
                  strokeDashoffset="465"
                  strokeDasharray="464.96 464.96"
                  strokeWidth="10"
                  stroke="hsl(223,90%,60%)"
                  r="74"
                  className="pencil__body2"
                />
                <circle
                  transform="rotate(-90)"
                  strokeDashoffset="339"
                  strokeDasharray="339.29 339.29"
                  strokeWidth="10"
                  stroke="hsl(223,90%,40%)"
                  r="54"
                  className="pencil__body3"
                />
              </g>
              <g
                transform="rotate(-90) translate(49,0)"
                className="pencil__eraser"
              >
                <g className="pencil__eraser-skew">
                  <rect
                    height="30"
                    width="30"
                    ry="5"
                    rx="5"
                    fill="hsl(223,90%,70%)"
                  />
                  <rect
                    clipPath="url(#pencil-eraser)"
                    height="30"
                    width="5"
                    fill="hsl(223,90%,60%)"
                  />
                  <rect height="20" width="30" fill="hsl(223,10%,90%)" />
                  <rect height="20" width="15" fill="hsl(223,10%,70%)" />
                  <rect height="20" width="5" fill="hsl(223,10%,80%)" />
                  <rect
                    height="2"
                    width="30"
                    y="6"
                    fill="hsla(223,10%,10%,0.2)"
                  />
                  <rect
                    height="2"
                    width="30"
                    y="13"
                    fill="hsla(223,10%,10%,0.2)"
                  />
                </g>
              </g>
              <g
                transform="rotate(-90) translate(49,-30)"
                className="pencil__point"
              >
                <polygon points="15 0,30 30,0 30" fill="hsl(33,90%,70%)" />
                <polygon points="15 0,6 30,0 30" fill="hsl(33,90%,50%)" />
                <polygon points="15 0,20 10,10 10" fill="hsl(223,10%,10%)" />
              </g>
            </g>
          </svg>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Loading...
          </Typography>
        </Box>
      ) : (
        <Container>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                ROL Student
              </Typography>
              <IconButton color="inherit">
                <Avatar src={userAvatar} />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Grid container spacing={3} style={{ marginTop: 20 }}>
            <Grid item xs={12}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 4,
                  backgroundColor: "#e5fcf5", // Soft, premium background color
                }}
              >
                <CardContent
                  sx={{
                    padding: "24px",
                  }}
                >
                  <Typography
                    sx={{ fontFamily: "Poppins" }}
                    variant="h5"
                    component="div"
                    gutterBottom
                  >
                    Semester: {formattedStartDate} to {formattedEndDate}
                  </Typography>
                  {smallmessage && (
                    <Typography
                      variant="p"
                      component="div"
                      sx={{ fontFamily: "Poppins", fontWeight: "bold" }}
                    >
                      {smallmessage}
                    </Typography>
                  )}

                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box position="relative">
                      <CircularProgress
                        variant="determinate"
                        value={progress.percentage}
                        size={100} // Adjust size as needed
                        sx={{ color: "#bc2af7" }}
                        // Customize progress bar color
                      />
                      <Box
                        position="absolute"
                        top="50%"
                        left="50%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ transform: "translate(-50%, -50%)" }}
                      >
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ fontFamily: "Poppins", fontWeight: "bold" }}
                        >
                          {formattedPercentage}%
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography
                      sx={{ fontFamily: "Poppins" }}
                      variant="body1"
                      component="div"
                    >
                      Completed Days: {progress.completedDays}
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "Poppins" }}
                      variant="body1"
                      component="div"
                    >
                      Remaining Days: {progress.remainingDays}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 4,
                  backgroundColor: "#f8b195",
                  color: "#c1432e",
                }}
              >
                <CardContent sx={{ padding: "24px" }}>
                  <Typography
                    sx={{ fontFamily: "Poppins" }}
                    variant="h6"
                    component="div"
                    gutterBottom
                  >
                    Attendance Summary
                  </Typography>
                  <Box sx={{ marginBottom: 2 }}>
                    <Calendar
                      onChange={setSelectedDate}
                      value={selectedDate}
                      tileClassName={({ date, view }) => {
                        // Add custom class names based on date status
                        // You can customize this to show present, leave, and holiday styles
                      }}
                    />
                  </Box>
                  <Typography
                    sx={{ fontFamily: "Poppins", marginBottom: 2 }}
                    variant="body1"
                    component="div"
                  >
                    Selected Date: {selectedDate.toDateString()}
                  </Typography>
                  <Box sx={{ marginBottom: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel>Attendance Status</InputLabel>
                      <Select
                        value={attendanceStatus}
                        onChange={(e) => setAttendanceStatus(e.target.value)}
                        label="Attendance Status"
                      >
                        <MenuItem value="present">Present</MenuItem>
                        <MenuItem value="leave">Leave</MenuItem>
                        <MenuItem value="holiday">Holiday</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  {attendanceStatus === "holiday" && (
                    <Box sx={{ marginBottom: 2 }}>
                      <TextField
                        label="Holiday Name"
                        value={holidayName}
                        onChange={(e) => setHolidayName(e.target.value)}
                        fullWidth
                      />
                    </Box>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAttendanceChange}
                    fullWidth
                    sx={{ backgroundColor: "#ff4545" }}
                  >
                    Save Attendance
                  </Button>
                </CardContent>
              </Card>
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledCard>
                <CardContent
                  sx={{
                    backgroundColor: "#8bf0ba",
                    color: "",
                    fontFamily: "Poppins",
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontFamily: "Poppins" }}
                  >
                    Attendance Overview
                  </Typography>
                  <div
                    style={{
                      width: "100%",
                      height: "330px",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <Pie data={attendanceData} />
                  </div>

                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ marginTop: 20, fontFamily: "Poppins" }}
                  >
                    Attendance Logs
                  </Typography>
                  <ScrollableLogContainer>
                    <StyledPaper sx={{ backgroundColor: "#fdfdff" }}>
                      {logs.length > 0 ? (
                        logs.map((log, index) => (
                          <LogEntry
                            key={index}
                            type={log.status}
                            sx={{ fontFamily: "Poppins" }}
                          >
                            {log.date}: {log.status}
                          </LogEntry>
                        ))
                      ) : (
                        <Typography sx={{ fontFamily: "Poppins" }}>
                          No logs available.
                        </Typography>
                      )}
                    </StyledPaper>
                  </ScrollableLogContainer>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12}>
              <Card
                sx={{
                  backgroundColor: "#e6dbc9",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  color: "#c53211",
                }}
              >
                <CardContent>
                  <Typography
                    sx={{ fontFamily: "Poppins" }}
                    variant="h5"
                    component="div"
                  >
                    Timetable
                  </Typography>
                  <Button
                    variant="contained"
                    sx={styles.buttonAdd}
                    fullWidth
                    onClick={() => handleOpenModal("add")}
                  >
                    Add Entry
                  </Button>

                  <TableContainer
                    sx={{ fontFamily: "Poppins" }}
                    component={Paper}
                  >
                    <Table sx={styles.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontFamily: "Poppins" }}>
                            Time Slot
                          </TableCell>
                          {daysOfWeek.map((day) => (
                            <TableCell sx={{ fontFamily: "Poppins" }} key={day}>
                              {day}
                            </TableCell>
                          ))}
                          <TableCell sx={styles.tableCellAction}>
                            Actions
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {timeSlots.map((slot, index) => (
                          <TableRow key={index}>
                            <TableCell sx={{ fontFamily: "Poppins" }}>
                              {slot}
                            </TableCell>
                            {daysOfWeek.map((day) => (
                              <TableCell
                                key={day}
                                sx={{ fontFamily: "Poppins" }}
                              >
                                {timetableData[day][slot] || ""}
                              </TableCell>
                            ))}
                            {slot === "Action" && (
                              <TableCell sx={styles.tableCellAction}>
                                <Button
                                  variant="contained"
                                  sx={styles.buttonEdit}
                                  onClick={() => handleOpenModal("edit")}
                                >
                                  Edit
                                </Button>
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
            <Modal open={openModal} onClose={handleCloseModal}>
              <Box
                sx={{ padding: 4, backgroundColor: "#fff", borderRadius: 1 }}
              >
                <Typography variant="h6">
                  {modalMode === "edit"
                    ? "Edit Timetable Entry"
                    : "Add Timetable Entry"}
                </Typography>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Day</InputLabel>
                  <Select
                    value={entry.day}
                    onChange={handleDayChange}
                    label="Day"
                  >
                    {daysOfWeek.map((day) => (
                      <MenuItem key={day} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {Array.from({ length: 8 }).map((_, index) => (
                  <TextField
                    key={index}
                    label={`Period ${index + 1}`}
                    value={(entry.periods && entry.periods[index]) || ""}
                    onChange={(e) => handleInputChange(e, index)}
                    fullWidth
                    margin="normal"
                  />
                ))}
                <Box
                  sx={{
                    marginTop: 2,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveTimetableEntry}
                    sx={{ marginRight: 1 }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Modal>

            <Grid item xs={12} sm={6}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6" sx={{ fontFamily: "Poppins" }}>
                  Tasks
                </Typography>
                <IconButton onClick={() => setOpenTaskModal(true)}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <StyledList dense component="nav">
                    {tasks.map((task) => (
                      <React.Fragment key={task._id}>
                        <StyledListItem
                          button
                          onClick={() => handleCompleteTask(task._id)}
                        >
                          <ListItemText
                            primary={
                              <Typography
                                sx={{ fontFamily: "Poppins" }}
                                variant="body2"
                              >
                                {task.taskName}
                              </Typography>
                            }
                          />
                          <StyledIconButton edge="end" aria-label="complete">
                            <CheckCircleIcon color="success" />
                          </StyledIconButton>
                        </StyledListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </StyledList>
                </Grid>
              </Grid>
            </Grid>
            <Modal open={openTaskModal} onClose={() => setOpenTaskModal(false)}>
              <Box
                p={4}
                style={{
                  backgroundColor: "white",
                  width: "300px",
                  margin: "100px auto",
                  borderRadius: "8px",
                }}
              >
                <Typography sx={{ fontFamily: "Poppins" }} variant="h6">
                  Add Task
                </Typography>
                <TextField
                  fullWidth
                  label="Task Name"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  margin="normal"
                />
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddTask}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setOpenTaskModal(false)}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Modal>

            <Grid item xs={12}>
              <StyledCard sx={{ backgroundColor: "#ffdb58" }}>
                <CardContent>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <ProgressTypography variant="h6">Goals</ProgressTypography>
                    <IconButton
                      onClick={() => setOpenGoalModal(true)}
                      color="primary"
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <List>
                    {goals.map((goal, index) => (
                      <GoalListItem key={index}>
                        <ListItemText
                          primary={
                            <ProgressTypography variant="h6">
                              {goal.goalName}
                            </ProgressTypography>
                          }
                          secondary={
                            <>
                              <Box
                                display="flex"
                                alignItems="center"
                                width="100%"
                              >
                                <GoalProgress
                                  variant="body2"
                                  sx={{ flexGrow: 1 }}
                                >
                                  <GoalDescription variant="body2">
                                    {goal.goalDescription}
                                  </GoalDescription>
                                </GoalProgress>

                                <Box position="relative">
                                  <CircularProgress
                                    variant="determinate"
                                    value={calculateProgress(
                                      goal.createdOn,
                                      goal.goalEndDate
                                    )}
                                    size={100} // Adjust size as needed
                                    sx={{ color: "#bc2af7" }}
                                    thickness={4} // Adjust thickness as needed
                                  />
                                  <Box
                                    position="absolute"
                                    top="50%"
                                    left="50%"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{ transform: "translate(-50%, -50%)" }}
                                  >
                                    <Typography
                                      variant="h6"
                                      component="div"
                                      sx={{
                                        fontFamily: "Poppins",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {calculateProgress(
                                        goal.createdOn,
                                        goal.goalEndDate
                                      )}
                                      %
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </>
                          }
                        />
                      </GoalListItem>
                    ))}
                  </List>
                </CardContent>
              </StyledCard>
            </Grid>

            <Modal open={openGoalModal} onClose={() => setOpenGoalModal(false)}>
              <StyledModalBox>
                <CloseButton onClick={() => setOpenGoalModal(false)}>
                  <CloseIcon />
                </CloseButton>
                <Typography variant="h6">Add Goal</Typography>
                <TextField
                  label="Goal Name"
                  fullWidth
                  margin="normal"
                  value={newGoal.goalName}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, goalName: e.target.value })
                  }
                />
                <TextField
                  label="End Date"
                  type="date"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  value={newGoal.goalEndDate}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, goalEndDate: e.target.value })
                  }
                />
                <TextField
                  label="Description"
                  fullWidth
                  margin="normal"
                  value={newGoal.goalDescription}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, goalDescription: e.target.value })
                  }
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddGoal}
                >
                  Add Goal
                </Button>
              </StyledModalBox>
            </Modal>

            <Grid item xs={12}>
              <StyledCard>
                <CardContent>
                  <>
                    <Typography variant="h5">Semester Dates</Typography>
                    <TextField
                      label="Semester Start Date"
                      type="date"
                      value={semesterStartDate}
                      onChange={(e) => setSemesterStartDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      sx={{ mb: 2 }} // Margin bottom
                    />
                    <TextField
                      label="Semester End Date"
                      type="date"
                      value={semesterEndDate}
                      onChange={(e) => setSemesterEndDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      sx={{ mb: 2 }} // Margin bottom
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSemesterDatesChange}
                    >
                      Save
                    </Button>
                  </>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleResetData}
            style={{ marginTop: 20 }}
          >
            Reset Data
          </Button>
          <CelebrationModal
            open={celebrationOpen}
            onClose={() => setCelebrationOpen(false)}
          />
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert onClose={handleCloseSnackbar} severity="info">
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Container>
      )}
    </>
  );
};

export default Dashboard;
