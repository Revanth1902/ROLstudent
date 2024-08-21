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
  Stack,
  TableRow,
  Paper as TablePaper,
} from "@mui/material";
import { SvgIcon } from "@mui/material";
import Calendar from "react-calendar";
import { Pie } from "react-chartjs-2";
import "react-calendar/dist/Calendar.css";
import Cookies from "js-cookie";
import LinearProgress from "@mui/material/LinearProgress";
import { WeatherIcons } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CelebrationIcon from "@mui/icons-material/Celebration";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Confetti from "react-confetti";
import { Cloud, WbSunny, AcUnit, LocalMall } from "@mui/icons-material";
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
const WeatherIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 80 80" width="80" height="80">
    <path
      d="M77.39 46.522c0 1.478-.086 2.974-.26 4.435 0 .035-.017.035-.017.07L61.72 46.921c.018-.14.018-.261.018-.4 0-11.983-9.757-21.74-21.74-21.74-11.982 0-21.738 9.757-21.738 21.74v.33l-15.392 4.14v-.035a37.706 37.706 0 0 1-.26-4.435c0-20.609 16.765-37.392 37.39-37.392 20.627 0 37.392 16.783 37.392 37.392Z"
      fill="#F95428"
    />
    <path
      d="M66.956 46.522c0 .452-.017.887-.034 1.322v.052L49.86 52.47a2.32 2.32 0 0 1 .243-.887c.8-1.583 1.2-3.288 1.2-5.061 0-6.227-5.078-11.305-11.305-11.305-6.226 0-11.304 5.078-11.304 11.305 0 1.773.4 3.478 1.2 5.06a2.4 2.4 0 0 1 .261 1.079l-17.043-4.574a1.026 1.026 0 0 1-.035-.244 31.56 31.56 0 0 1-.035-1.321c0-14.87 12.087-26.957 26.956-26.957 14.87 0 26.957 12.087 26.957 26.957Z"
      fill="#F5B420"
    />
    <path
      d="M77.391 46.522c0 1.478-.087 2.974-.26 4.435 0 .035-.018.035-.018.07l-15.391-4.105c.017-.14.017-.261.017-.4 0-11.983-9.756-21.74-21.739-21.74V9.13c20.626 0 37.391 16.783 37.391 37.392Z"
      fill="#EA3B18"
    />
    <path
      d="M66.957 46.522c0 .452-.017.887-.035 1.322v.052L49.861 52.47c.017-.296.105-.61.244-.887.8-1.583 1.2-3.288 1.2-5.061 0-6.227-5.079-11.305-11.305-11.305V19.565c14.87 0 26.957 12.087 26.957 26.957Z"
      fill="#F09C12"
    />
    <path
      d="M77.391 46.522c0 1.478-.087 2.974-.26 4.435 0 .035-.018.035-.018.07l-15.391-4.105c.017-.14.017-.261.017-.4 0-11.983-9.756-21.74-21.739-21.74V9.13c20.626 0 37.391 16.783 37.391 37.392Z"
      fill="#F95428"
    />
    <path
      d="M66.957 46.522c0 .452-.017.887-.035 1.322v.052L49.861 52.47c.017-.296.105-.61.244-.887.8-1.583 1.2-3.288 1.2-5.061 0-6.227-5.079-11.305-11.305-11.305V19.565c14.87 0 26.957 12.087 26.957 26.957Z"
      fill="#F5B420"
    />
    <path
      d="M77.39 46.522c0 1.478-.086 2.974-.26 4.435 0 .035-.017.035-.017.07L61.72 46.921c.018-.14.018-.261.018-.4 0-11.983-9.757-21.74-21.74-21.74-11.982 0-21.738 9.757-21.738 21.74v.33l-15.392 4.14v-.035a37.706 37.706 0 0 1-.26-4.435c0-20.609 16.765-37.392 37.39-37.392 20.627 0 37.392 16.783 37.392 37.392Z"
      fill="#EA3B18"
    />
  </SvgIcon>
);

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
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Visakhapatnam"); // Default city
  const apiKey = "868b04ce337d4192974154100242108";

  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;
  const [semesterStartDate, setSemesterStartDate] = useState("");
  const [semesterEndDate, setSemesterEndDate] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [visibleArticles, setVisibleArticles] = useState(3);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [logs, setLogs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
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
  const [articles, setArticles] = useState([]);
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

  useEffect(() => {
    // Function to fetch weather data
    const fetchWeather = async (city) => {
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    // Function to get the user's location
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(`${latitude},${longitude}`);
          },
          (error) => {
            console.error("Error getting location:", error);
            fetchWeather(city); // Fallback to default city
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
        fetchWeather(city); // Fallback to default city
      }
    };

    getUserLocation(); // Get user location or default
  }, [city, apiKey]);

  const location = weather?.location || {};
  const current = weather?.current || {};
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
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/top-headlines?country=in&apiKey=5338634f16774d0f943f47d4566646d5"
        );
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);
  const handleClick = (url) => {
    window.open(url, "_blank");
  };

  const handleLoadMore = () => {
    setVisibleArticles((prevVisible) => prevVisible + 3);
  };

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

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case "sunny":
      case "clear":
        return <WbSunny sx={{ fontSize: 50 }} />;
      case "cloudy":
        return <Cloud sx={{ fontSize: 50 }} />;
      case "snow":
        return <AcUnit sx={{ fontSize: 50 }} />;
      case "rain":
        return <LocalMall sx={{ fontSize: 50 }} />;
      default:
        return <Cloud sx={{ fontSize: 50 }} />;
    }
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
            <div class="weather flex min-h-[10em] min-w-[16em] flex-col items-center justify-center gap-[0.5em] rounded-[1.5em] bg-[#FFDAE9] px-[1em] py-[0.5em] font-nunito text-[#F471A6] shadow-[0px_4px_16px_0px_#222]">
              <div class="flex h-fit w-full items-center justify-center gap-[1em]">
                <svg
                  viewBox="0 0 80 80"
                  fill="none"
                  height="80"
                  width="80"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M77.39 46.522c0 1.478-.086 2.974-.26 4.435 0 .035-.017.035-.017.07L61.72 46.921c.018-.14.018-.261.018-.4 0-11.983-9.757-21.74-21.74-21.74-11.982 0-21.738 9.757-21.738 21.74v.33l-15.392 4.14v-.035a37.706 37.706 0 0 1-.26-4.435c0-20.609 16.765-37.392 37.39-37.392 20.627 0 37.392 16.783 37.392 37.392Z"
                    fill="#F95428"
                  ></path>
                  <path
                    d="M66.956 46.522c0 .452-.017.887-.034 1.322v.052L49.86 52.47a2.32 2.32 0 0 1 .243-.887c.8-1.583 1.2-3.288 1.2-5.061 0-6.227-5.078-11.305-11.305-11.305-6.226 0-11.304 5.078-11.304 11.305 0 1.773.4 3.478 1.2 5.06a2.4 2.4 0 0 1 .261 1.079l-17.043-4.574a1.026 1.026 0 0 1-.035-.244 31.56 31.56 0 0 1-.035-1.321c0-14.87 12.087-26.957 26.956-26.957 14.87 0 26.957 12.087 26.957 26.957Z"
                    fill="#F5B420"
                  ></path>
                  <path
                    d="M77.391 46.522c0 1.478-.087 2.974-.26 4.435 0 .035-.018.035-.018.07l-15.391-4.105c.017-.14.017-.261.017-.4 0-11.983-9.756-21.74-21.739-21.74V9.13c20.626 0 37.391 16.783 37.391 37.392Z"
                    fill="#EA3B18"
                  ></path>
                  <path
                    d="M66.957 46.522c0 .452-.017.887-.035 1.322v.052L49.861 52.47c.017-.296.105-.61.244-.887.8-1.583 1.2-3.288 1.2-5.061 0-6.227-5.079-11.305-11.305-11.305V19.565c14.87 0 26.957 12.087 26.957 26.957Z"
                    fill="#F09C12"
                  ></path>
                  <path
                    d="M74.541 53.265a2.608 2.608 0 0 1-2.594-2.917c.15-1.262.227-2.549.227-3.826C72.174 28.78 57.74 14.348 40 14.348c-17.742 0-32.174 14.432-32.174 32.174 0 1.277.076 2.564.226 3.826a2.608 2.608 0 0 1-2.283 2.898c-1.401.175-2.726-.85-2.897-2.281a37.624 37.624 0 0 1-.264-4.443C2.608 25.904 19.381 9.13 40 9.13c20.618 0 37.39 16.774 37.39 37.392 0 1.482-.087 2.977-.262 4.443a2.609 2.609 0 0 1-2.587 2.3Z"
                    fill="#E6563A"
                  ></path>
                  <path
                    d="M72.174 46.522c0 1.277-.077 2.564-.226 3.826a2.608 2.608 0 1 0 5.18.617 37.64 37.64 0 0 0 .263-4.443C77.391 25.904 60.618 9.13 40 9.13v5.218c17.741 0 32.174 14.432 32.174 32.174Z"
                    fill="#D9472B"
                  ></path>
                  <path
                    d="m64.32 50.339-.124-.003a2.608 2.608 0 0 1-2.483-2.727c.017-.361.025-.723.025-1.088 0-11.987-9.752-21.739-21.739-21.739S18.26 34.534 18.26 46.522c0 .364.009.726.026 1.087a2.608 2.608 0 0 1-2.483 2.727c-1.473.051-2.662-1.046-2.728-2.485a29.3 29.3 0 0 1-.032-1.33c0-14.864 12.092-26.956 26.956-26.956 14.865 0 26.957 12.092 26.957 26.957 0 .446-.012.889-.032 1.33a2.608 2.608 0 0 1-2.604 2.487Z"
                    fill="#FFC033"
                  ></path>
                  <path
                    d="M61.739 46.522c0 .364-.009.726-.025 1.087a2.608 2.608 0 1 0 5.21.243c.02-.44.033-.884.033-1.33 0-14.864-12.093-26.957-26.957-26.957v5.218c11.987 0 21.739 9.752 21.739 21.739Z"
                    fill="#F9A926"
                  ></path>
                  <path
                    d="M52.44 55.357a2.608 2.608 0 0 1-2.329-3.781 11.157 11.157 0 0 0 1.194-5.054c0-6.233-5.072-11.305-11.305-11.305S28.696 40.29 28.696 46.522c0 1.777.402 3.477 1.194 5.053a2.608 2.608 0 1 1-4.66 2.344 16.317 16.317 0 0 1-1.752-7.397C23.479 37.412 30.89 30 40 30s16.522 7.412 16.522 16.522c0 2.6-.59 5.087-1.751 7.397a2.608 2.608 0 0 1-2.332 1.438Z"
                    fill="#3AACE6"
                  ></path>
                  <path
                    d="M51.304 46.522c0 1.777-.402 3.477-1.194 5.053a2.608 2.608 0 1 0 4.66 2.344 16.316 16.316 0 0 0 1.752-7.397C56.522 37.412 49.11 30 40 30v5.217c6.233 0 11.304 5.072 11.304 11.305Z"
                    fill="#2B9FD9"
                  ></path>
                  <path
                    d="m69.543 50.322-.102-.001a2.609 2.609 0 0 1-2.506-2.708 30.4 30.4 0 0 0 .022-1.091c0-14.864-12.092-26.957-26.957-26.957-14.864 0-26.956 12.092-26.956 26.957 0 .365.008.73.022 1.09a2.61 2.61 0 0 1-2.507 2.709 2.6 2.6 0 0 1-2.707-2.506 32.62 32.62 0 0 1-.026-1.293C7.826 28.78 22.26 14.348 40 14.348S72.174 28.78 72.174 46.522c0 .433-.009.863-.026 1.293a2.609 2.609 0 0 1-2.605 2.508Z"
                    fill="#FF9F19"
                  ></path>
                  <path
                    d="M66.957 46.522c0 .365-.009.73-.022 1.091a2.61 2.61 0 0 0 5.213.202c.017-.43.026-.86.026-1.293C72.174 28.78 57.74 14.348 40 14.348v5.217c14.864 0 26.957 12.093 26.957 26.957Z"
                    fill="#F28618"
                  ></path>
                  <path
                    d="M57.765 56.23a2.609 2.609 0 0 1-2.42-3.581 16.371 16.371 0 0 0 1.177-6.127C56.522 37.412 49.11 30 40 30s-16.522 7.412-16.522 16.522c0 2.119.396 4.18 1.177 6.127a2.609 2.609 0 0 1-1.449 3.392 2.612 2.612 0 0 1-3.391-1.45 21.559 21.559 0 0 1-1.554-8.07c0-11.986 9.752-21.738 21.739-21.738s21.739 9.752 21.739 21.739c0 2.787-.523 5.503-1.554 8.07a2.607 2.607 0 0 1-2.42 1.638Z"
                    fill="#88CC2A"
                  ></path>
                  <path
                    d="M56.522 46.522c0 2.119-.396 4.18-1.177 6.127a2.609 2.609 0 0 0 4.84 1.943 21.559 21.559 0 0 0 1.554-8.07c0-11.987-9.752-21.74-21.739-21.74V30c9.11 0 16.522 7.412 16.522 16.522Z"
                    fill="#7FB335"
                  ></path>
                  <path
                    d="M66.957 44.782c-4.253 0-8.207 2.105-10.623 5.516-6.448-1.604-12.856 3.352-12.856 10.137 0 5.754 4.681 10.434 10.435 10.434h13.044C74.149 70.87 80 65.02 80 57.827c0-7.192-5.85-13.044-13.043-13.044Z"
                    fill="#DAE1E6"
                  ></path>
                  <path
                    d="M23.667 50.298c-2.417-3.411-6.37-5.516-10.624-5.516C5.851 44.782 0 50.633 0 57.826c0 7.192 5.85 13.043 13.043 13.043h13.044c5.754 0 10.435-4.68 10.435-10.434 0-6.774-6.397-11.744-12.855-10.137Z"
                    fill="#EDF0F2"
                  ></path>
                  
                </svg>
                <span class="h-[4em] w-[1px] rounded-full bg-[hsla(336,86%,70%,0.5)]"></span>
                <div class="flex flex-col items-start justify-center">
                  <p class="text-[0.75rem] font-light">
                  {location.name}
                  </p>
                  <p class="text-[1.5em] font-semibold">{current.temp_c}°C</p>
                  <div class="flex items-center justify-center gap-[0.125em]">
                    <svg
                      viewBox="0 0 16 17"
                      fill="none"
                      height="17"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 14.26A5.92 5.92 0 1 0 8 2.42a5.92 5.92 0 0 0 0 11.84Z"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke="#F471A6"
                      ></path>
                      <path
                        d="M8.595 5.716A.589.589 0 0 1 8 6.292a.576.576 0 1 1 .595-.576Zm-1.05 5.363V7.636a.448.448 0 0 1 .629-.425.441.441 0 0 1 .268.425v3.443a.449.449 0 0 1-.896 0Z"
                        fill="#F471A6"
                      ></path>
                    </svg>
                    <p class="text-[0.625rem] font-light">
                     {current.condition.text}
                    </p>
                  </div>
                  <div class="flex items-center justify-center gap-[0.125em]">
                    <svg
                      viewBox="0 0 16 17"
                      fill="none"
                      height="17"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 14.26A5.92 5.92 0 1 0 8 2.42a5.92 5.92 0 0 0 0 11.84Z"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke="#F471A6"
                      ></path>
                      <path
                        d="M8.595 5.716A.589.589 0 0 1 8 6.292a.576.576 0 1 1 .595-.576Zm-1.05 5.363V7.636a.448.448 0 0 1 .629-.425.441.441 0 0 1 .268.425v3.443a.449.449 0 0 1-.896 0Z"
                        fill="#F471A6"
                      ></path>
                    </svg>
                    <p class="text-[0.625rem] font-light">
                      Don’t miss out the Rainbow
                    </p>
                  </div>
                </div>
              </div>
              <div class="h-[0.5px] w-full rounded-full bg-[hsla(336,86%,70%,0.5)]"></div>
              <div class="flex h-fit w-full items-center justify-between">
                <div class="flex h-fit w-full flex-col items-start justify-between text-[0.75em]">
                  <div class="flex flex-row items-center justify-center gap-[0.5em] p-[0.25em]">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.51 4.667A2 2 0 1 1 12 8H2m3.673-4.889a1.333 1.333 0 1 1 .994 2.222H2m5.673 7.556a1.333 1.333 0 1 0 .994-2.222H2"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke="#999"
                      ></path>
                    </svg>
                    <span class="h-[0.5em] w-[1px] rounded-full bg-[hsla(336,86%,70%,0.5)]"></span>
                    <p>Wind Speed</p>
                    <span class="h-[0.5em] w-[1px] rounded-full bg-[hsla(336,86%,70%,0.5)]"></span>
                    <p>{current.wind_kph}km/hr</p>
                  </div>
                  <div class="flex flex-row items-center justify-center gap-[0.5em] p-[0.25em]">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#a)">
                        <path
                          d="M12.606 7.393c.638.343 1.34.55 2.06.607v1.333a6.247 6.247 0 0 1-2.553-.666h-.053A5.227 5.227 0 0 0 10 8a4.1 4.1 0 0 0-1.867.593h-.04A5.693 5.693 0 0 1 6 9.333V8a5.06 5.06 0 0 0 1.533-.573h.04A5.24 5.24 0 0 1 10 6.667a6.247 6.247 0 0 1 2.553.7l.053.026Zm-.053 2.667A6.247 6.247 0 0 0 10 9.333a5.24 5.24 0 0 0-2.427.72h-.04A5.061 5.061 0 0 1 6 10.667V12a5.695 5.695 0 0 0 2.093-.707h.04A4.098 4.098 0 0 1 10 10.667a5.225 5.225 0 0 1 2.06.606h.053c.79.42 1.66.667 2.553.727v-1.333a5.228 5.228 0 0 1-2.06-.607h-.053Zm.113-5.307V2.667a1.333 1.333 0 0 0-1.333-1.334H4.666a1.333 1.333 0 0 0-1.333 1.334V4.78a6 6 0 0 0-2-.447v1.334a5.48 5.48 0 0 1 1.753.44h.067l.18.08v1.26a6 6 0 0 0-2-.447v1.333c.605.05 1.197.198 1.753.44h.067l.18.06v1.26a5.999 5.999 0 0 0-2-.446v1.333a5.506 5.506 0 0 1 1.753.44h.067l.18.06v1.853a1.333 1.333 0 0 0 1.333 1.334h6.667a1.333 1.333 0 0 0 1.333-1.334v-.46l-.553-.206h-.053c-.254-.114-.494-.22-.727-.307v.973H4.666V2.667h6.667V4.22A4.54 4.54 0 0 0 10 4a5.24 5.24 0 0 0-2.427.72h-.04A5.06 5.06 0 0 1 6 5.333v1.334a5.693 5.693 0 0 0 2.093-.707h.04A4.1 4.1 0 0 1 10 5.333a5.227 5.227 0 0 1 2.06.607h.053c.79.42 1.66.667 2.553.727V5.333c-.7-.053-1.38-.25-2-.58Z"
                          fill="#33FF77"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="a">
                          <path d="M0 0h16v16H0z" fill="#fff"></path>
                        </clipPath>
                      </defs>
                    </svg>

                    <span class="h-[0.5em] w-[1px] rounded-full bg-[hsla(336,86%,70%,0.5)]"></span>
                    <p>Heat</p>
                    <span class="h-[0.5em] w-[1px] rounded-full bg-[hsla(336,86%,70%,0.5)]"></span>
                    <p>{current.heatindex_c}°C</p>
                  </div>
                  <div class="flex flex-row items-center justify-center gap-[0.5em] p-[0.25em]">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 14.667c1.719 0 2.666-.9 2.666-2.534 0-2.162-2.158-3.914-2.25-3.987a.667.667 0 0 0-.833 0c-.092.073-2.25 1.825-2.25 3.987 0 1.634.947 2.534 2.667 2.534Zm0-5.093a4.102 4.102 0 0 1 1.333 2.56c0 .74-.223 1.2-1.333 1.2-1.11 0-1.334-.46-1.334-1.2A4.102 4.102 0 0 1 8 9.573ZM4.416 1.479a.667.667 0 0 0-.833 0c-.092.074-2.25 1.826-2.25 3.988C1.333 7.1 2.28 8 4 8c1.719 0 2.666-.9 2.666-2.533 0-2.162-2.158-3.914-2.25-3.988ZM4 6.667c-1.11 0-1.334-.46-1.334-1.2A4.102 4.102 0 0 1 4 2.907a4.102 4.102 0 0 1 1.333 2.56c0 .74-.223 1.2-1.333 1.2Zm8.416-5.188a.667.667 0 0 0-.833 0c-.092.074-2.25 1.826-2.25 3.988C9.333 7.1 10.28 8 12 8c1.719 0 2.666-.9 2.666-2.533 0-2.162-2.158-3.914-2.25-3.988ZM12 6.667c-1.11 0-1.334-.46-1.334-1.2A4.102 4.102 0 0 1 12 2.907a4.102 4.102 0 0 1 1.333 2.56c0 .74-.223 1.2-1.333 1.2Z"
                        fill="#00B9E8"
                      ></path>
                    </svg>

                    <span class="h-[0.5em] w-[1px] rounded-full bg-[hsla(336,86%,70%,0.5)]"></span>
                    <p>Humidity</p>
                    <span class="h-[0.5em] w-[1px] rounded-full bg-[hsla(336,86%,70%,0.5)]"></span>
                    <p>{current.humidity}%</p>
                  </div>
                </div>
                <div class="flex h-full w-[6rem] flex-col items-center py-[0.25em] text-[0.625em]">
                  <div class="group relative z-0 h-[48px] w-[48px]">
                    <svg
                      class="duration-200 ease-linear group-hover:-translate-y-[8px]"
                      viewBox="0 0 48 48"
                      fill="none"
                      height="48"
                      width="48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g>
                        <path
                          d="M20.199 25.307c-1.343-6.396-6.887-10.646-12.383-9.492-5.497 1.153-8.864 7.274-7.521 13.67.829 3.949 3.259 7.078 6.29 8.625H4.328a1.505 1.505 0 1 0-1.376 2.114l.04-.002.038.002h11.944c.474 0 6.36-9.501 5.224-14.917Z"
                          fill="#6DC82A"
                        ></path>
                        <path
                          d="M20.198 25.307c-1.342-6.396-6.886-10.646-12.382-9.492a8.827 8.827 0 0 0-1.7.54c.735 6.883 2.302 16.451 5.598 23.15l-.182.111c-.354.216-.7.43-.986.608h4.43c.473 0 6.36-9.501 5.222-14.917Z"
                          fill="#5EAC24"
                        ></path>
                        <path
                          d="M47.705 29.485c1.343-6.396-2.024-12.517-7.52-13.67-5.497-1.154-11.04 3.096-12.383 9.492-1.137 5.416 4.75 14.917 5.223 14.917h11.944l.04-.002.039.002a1.506 1.506 0 1 0-1.377-2.115h-2.255c3.03-1.546 5.46-4.676 6.29-8.624Z"
                          fill="#6DC82A"
                        ></path>
                        <path
                          d="M27.802 25.307c1.342-6.396 6.886-10.646 12.383-9.492.592.124 1.16.307 1.7.54-.736 6.883-2.303 16.451-5.599 23.15.06.035.12.073.182.111.354.216.7.43.986.608h-4.43c-.472 0-6.36-9.501-5.222-14.917Z"
                          fill="#5EAC24"
                        ></path>
                        <path
                          d="M35.813 17.311H13.348l2.944 22.913h16.25l3.271-22.913Z"
                          fill="#4E901E"
                        ></path>
                        <path
                          d="M33.648 40.267c6.508-11.695 6.905-32.555 6.905-32.555a6.09 6.09 0 0 0-12.17-.321h-8.766a6.09 6.09 0 0 0-12.17.321s.636 21.945 6.906 32.555c0-.12-3.453 2.05-3.453 2.05h3.935l-.723 2.532 3.255-1.446.603 2.17 2.452-4.051s.254-.41.26-.611c.004-.169-.126-.443-.126-.443-1.128-3.242-6.642-20.457 3.445-20.457 10.341 0 4.665 17.098 3.463 20.423 0 0-.146.366-.146.477 0 .206.261.612.261.612l2.451 4.05.603-2.17 3.256 1.447-.724-2.533H37.1s-3.452-2.17-3.452-2.05Z"
                          fill="#91DC5A"
                        ></path>
                        <path
                          d="M11.098 43.081a.804.804 0 1 0 0-1.607.804.804 0 0 0 0 1.607Zm3.054 2.492a.804.804 0 1 0 0-1.608.804.804 0 0 0 0 1.608Zm3.778.804a.804.804 0 1 0 0-1.608.804.804 0 0 0 0 1.608Zm12.063 0a.804.804 0 1 0 0-1.608.804.804 0 0 0 0 1.608Zm3.9-.804a.804.804 0 1 0 0-1.608.804.804 0 0 0 0 1.608Zm3.18-2.492a.804.804 0 1 0 0-1.607.804.804 0 0 0 0 1.607Z"
                          fill="#5EAC24"
                        ></path>
                        <path
                          d="M13.544 12.699a4.547 4.547 0 1 0 0-9.093 4.547 4.547 0 0 0 0 9.093Z"
                          fill="#6DC82A"
                        ></path>
                        <path
                          d="M13.544 11.717A3.57 3.57 0 0 1 9.98 8.152a3.57 3.57 0 0 1 3.565-3.566 3.57 3.57 0 0 1 3.566 3.566 3.57 3.57 0 0 1-3.566 3.565Z"
                          fill="#5EAC24"
                        ></path>
                        <path
                          d="M15.736 8.708h-4.384a.558.558 0 0 1-.556-.556c0-.306.25-.557.556-.557h4.384c.305 0 .556.25.556.557 0 .305-.25.556-.556.556Z"
                          fill="#57565C"
                        ></path>
                        <path
                          d="M34.449 12.699a4.547 4.547 0 1 0 0-9.094 4.547 4.547 0 0 0 0 9.094Z"
                          fill="#6DC82A"
                        ></path>
                        <path
                          d="M34.45 11.717a3.57 3.57 0 0 1-3.566-3.565 3.57 3.57 0 0 1 3.566-3.566 3.57 3.57 0 0 1 3.565 3.566 3.57 3.57 0 0 1-3.566 3.565Z"
                          fill="#5EAC24"
                        ></path>
                        <path
                          d="M36.64 8.708h-4.383a.558.558 0 0 1-.556-.556c0-.306.25-.557.556-.557h4.384a.558.558 0 0 1 0 1.112Z"
                          fill="#57565C"
                        ></path>
                        <path
                          d="M13.633 17.555c-.706-.008-2.058-.41-2.18-1.868a.736.736 0 0 1 1.467-.123c.038.456.557.512.724.518h20.713c.167-.006.686-.062.724-.518a.735.735 0 1 1 1.467.123c-.122 1.459-1.474 1.86-2.172 1.868H13.633Z"
                          fill="#6DC82A"
                        ></path>
                        <path
                          d="M42.449 34.38a.736.736 0 0 1-.546-1.23c.313-.346.604-.728.865-1.134a.736.736 0 1 1 1.239.796 10.29 10.29 0 0 1-1.011 1.326.734.734 0 0 1-.547.243Zm2.375-4.764a.736.736 0 0 1-.721-.887c.453-2.155.198-4.32-.716-6.096a.736.736 0 0 1 1.308-.674c1.07 2.075 1.37 4.587.849 7.072a.736.736 0 0 1-.72.585Z"
                          fill="#5EAC24"
                        ></path>
                      </g>
                    </svg>
                    <span class="absolute bottom-[8px] left-1/2 z-[-1] h-[4px] w-[32px] -translate-x-1/2 bg-[#68082e] blur-[6px] duration-200 ease-linear group-hover:w-[16px] group-hover:blur-[4px]"></span>
                  </div>
                  <p class="text-center font-light">Feels like {current.temp_c}°C</p>
                </div>
              </div>
            </div>
            </Grid>
            
           
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
            <Grid item xs={12}>
              <Typography variant="h4" component="h1" gutterBottom>
                Latest News
              </Typography>
              <Stack spacing={2}>
                {articles.slice(0, visibleArticles).map((article, index) => (
                  <Card
                    key={index}
                    variant="outlined"
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleClick(article.url)}
                  >
                    <CardContent>
                      <Typography variant="h6" component="h2" gutterBottom>
                        {article.title}
                      </Typography>
                      {article.author && (
                        <Typography variant="subtitle2" color="textSecondary">
                          {article.author} -{" "}
                          {new Date(article.publishedAt).toLocaleDateString()}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Stack>
              {visibleArticles < articles.length && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                  onClick={handleLoadMore}
                >
                  Load More
                </Button>
              )}
            </Grid>
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
