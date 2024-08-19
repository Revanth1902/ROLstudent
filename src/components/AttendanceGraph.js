// src/components/AttendanceGraphs.js
import React, { useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const AttendanceGraphs = ({ data }) => {
  useEffect(() => {
    return () => {
      // Clean up Chart instances
      ChartJS.getChart('attendancePieChart')?.destroy();
      ChartJS.getChart('attendanceBarChart')?.destroy();
    };
  }, []);

  const pieData = {
    labels: ['Present', 'Leave', 'Holiday'],
    datasets: [{
      data: [data.present, data.leave, data.holiday],
      backgroundColor: ['#4caf50', '#f44336', '#ffeb3b'],
    }],
  };

  const barData = {
    labels: ['Weekly', 'Monthly', 'Semester'],
    datasets: [{
      label: 'Attendance',
      data: [data.weekly, data.monthly, data.semester],
      backgroundColor: '#2196f3',
    }],
  };

  return (
    <div>
      <Pie data={pieData} id="attendancePieChart" />
      <Bar data={barData} id="attendanceBarChart" />
    </div>
  );
};

export default AttendanceGraphs;
