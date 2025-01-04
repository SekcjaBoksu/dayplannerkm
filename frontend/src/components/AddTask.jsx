import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';

export default function AddTask({ selectedDate, refreshTasks }) {
  const [taskInfo, setTaskInfo] = useState('');

  const handleAddTask = async (event) => {
    event.preventDefault();

    if (!selectedDate) {
      alert('Select a date on the calendar!');
      return;
    }

    if (!taskInfo.trim()) {
      alert('Enter the task description!');
      return;
    }

    const newTask = {
      date: selectedDate,
      info: taskInfo,
      completed: false,
    };

    try {
      const response = await fetch('http://localhost:8080/task/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        setTaskInfo('');
        refreshTasks(); // Task list refresh after adding task
      } else {
        console.error('Error while adding the task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleAddTask}>
      <Stack spacing={1}>
        <Input
          placeholder="What are you planning?"
          value={taskInfo}
          onChange={(e) => setTaskInfo(e.target.value)}
          required
        />
        <Button type="submit">Add Task</Button>
      </Stack>
    </form>
  );
}
