import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Appbar from './components/Appbar';
import Calendar from './components/Calendar';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import TaskCompletionGauge from './components/TaskCompletionGauge';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const taskListRef = useRef();
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);

  const fetchTasksForDate = async (date) => {
    try {
      const response = await fetch('http://localhost:8080/task/getAll');
      if (response.ok) {
        const data = await response.json();
        const tasksForDate = data.filter((task) => task.date === date);
        setCompletedTasks(tasksForDate.filter((task) => task.completed).length);
        setTotalTasks(tasksForDate.length);
      } else {
        console.error('Error fetching tasks for selected date.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchTaskDays = async () => {
    if (taskListRef.current) {
      await taskListRef.current.fetchTasks();
    }
  };

  const refreshTasks = async () => {
    await fetchTaskDays(); // Odśwież taskDays w kalendarzu
    if (selectedDate) {
      fetchTasksForDate(selectedDate); // Odśwież dane wykresu
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchTasksForDate(selectedDate);
    }
  }, [selectedDate]);

  return (
    <div className="App">
      <Appbar />
      <div className="content">
        <div className="left-panel">
          <div className="calendar">
            <Calendar setSelectedDate={setSelectedDate} refreshTasks={refreshTasks} />
          </div>
          <div className='addtask'>
          <AddTask selectedDate={selectedDate} refreshTasks={refreshTasks} />
          </div>
          <div className='gauge'> 
            <TaskCompletionGauge completedTasks={completedTasks} totalTasks={totalTasks} />
          </div>
        </div>
        <div className="right-panel">
          <TaskList selectedDate={selectedDate} ref={taskListRef} refreshTasks={refreshTasks} />
        </div>
      </div>
    </div>
  );
}

export default App;
