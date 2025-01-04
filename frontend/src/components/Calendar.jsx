import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

function TaskDay(props) {
  const { taskDays = [], day, outsideCurrentMonth, ...other } = props;

  // check day tasks
  const dayInfo = taskDays.find((taskDay) => taskDay.date === day.format('YYYY-MM-DD'));
  const hasTask = !!dayInfo && !outsideCurrentMonth;
  const allCompleted = dayInfo && dayInfo.allCompleted;

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      color={hasTask ? (allCompleted ? 'success' : 'primary') : 'default'}
      variant={hasTask ? 'dot' : 'standard'}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export default function TaskCalendar({ setSelectedDate, refreshTasks }) {
  const [taskDays, setTaskDays] = useState([]);

  const fetchTaskDays = async () => {
    try {
      const response = await fetch('http://localhost:8080/task/getAll');
      if (response.ok) {
        const data = await response.json();

        // group and check status for a date
        const groupedByDate = data.reduce((acc, task) => {
          if (!acc[task.date]) {
            acc[task.date] = { date: task.date, allCompleted: true };
          }
          if (!task.completed) {
            acc[task.date].allCompleted = false;
          }
          return acc;
        }, {});

        // change status
        setTaskDays(Object.values(groupedByDate));
      } else {
        console.error('Error fetching task data.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchTaskDays();
  }, [refreshTasks]); // refresh after change

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        onChange={(newValue) => {
          if (newValue) setSelectedDate(newValue.format('YYYY-MM-DD'));
        }}
        slots={{
          day: TaskDay,
        }}
        slotProps={{
          day: {
            taskDays,
          },
        }}
      />
    </LocalizationProvider>
  );
}
