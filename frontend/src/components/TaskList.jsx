import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Checkbox, IconButton, TextField, InputAdornment, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../styles/TaskList.css';

const TaskList = forwardRef(({ selectedDate, refreshTasks }, ref) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedInfo, setEditedInfo] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8080/task/getAll');
      const data = await response.json();
      const sortedTasks = data
        .filter((task) => task.date === (selectedDate || today))
        .sort((a, b) => a.completed - b.completed);
      setTasks(sortedTasks);
      setFilteredTasks(sortedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchTasks,
  }));

  useEffect(() => {
    fetchTasks();
  }, [selectedDate]);

  useEffect(() => {
    const filtered = tasks.filter((task) =>
      task.info.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [searchQuery, tasks]);

  const handleDelete = async (id) => {
    try {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

      const response = await fetch(`http://localhost:8080/task/delete/${id}`, { method: 'DELETE' });

      if (response.ok) {
        refreshTasks();
      } else {
        console.error('Error deleting task on server.');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleStatus = async (task) => {
    const originalTasks = [...tasks];
    const updatedTask = { ...task, completed: !task.completed };

    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
    );

    try {
      const response = await fetch(`http://localhost:8080/task/update/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        refreshTasks();
      } else {
        console.error('Error updating task status on server.');
        setTasks(originalTasks);
      }
    } catch (error) {
      console.error('Error updating task:', error);
      setTasks(originalTasks);
    }
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditedInfo(task.info);
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditedInfo('');
  };

  const saveEditedTask = async (task) => {
    const updatedTask = { ...task, info: editedInfo };

    try {
      const response = await fetch(`http://localhost:8080/task/update/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
        );
        setEditingTaskId(null);
        refreshTasks();
      } else {
        console.error('Error saving task.');
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <div className='general'>
      <div className='bar'>
      <h3>Tasks for the: {selectedDate || today}</h3>
      <TextField
        variant="outlined"
        placeholder="Search for a task..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      </div>
      <TransitionGroup>
        {filteredTasks.map((task) => (
          <CSSTransition key={task.id} timeout={300} classNames="task">
            <div className={`task-item ${task.completed ? 'task-completed' : ''}`}>
              <Checkbox
                className="checkbox"
                checked={task.completed}
                onChange={() => handleToggleStatus(task)}
              />
              {editingTaskId === task.id ? (
                <TextField
                  value={editedInfo}
                  onChange={(e) => setEditedInfo(e.target.value)}
                  onBlur={() => saveEditedTask(task)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEditedTask(task);
                    if (e.key === 'Escape') cancelEditing();
                  }}
                  autoFocus
                />
              ) : (
                <Tooltip title={task.info} arrow>
                  <span className="task-info">{task.info}</span>
                </Tooltip>
              )}
              <div className="task-actions">
                {editingTaskId === task.id ? (
                  <>
                    <IconButton onClick={() => saveEditedTask(task)}>
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={cancelEditing}>
                      <CancelIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton onClick={() => startEditing(task)}>
                    <EditIcon />
                  </IconButton>
                )}
                <IconButton onClick={() => handleDelete(task.id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
});

export default TaskList;
