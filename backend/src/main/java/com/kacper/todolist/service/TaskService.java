package com.kacper.todolist.service;

import com.kacper.todolist.model.Task;
import java.util.List;

public interface TaskService {
    public Task saveTask(Task task);
    public List<Task> getAllTasks();
    void deleteTask(int id);
    Task updateTask(int id, Task task);

}
