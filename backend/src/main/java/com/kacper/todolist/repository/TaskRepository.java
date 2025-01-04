package com.kacper.todolist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.kacper.todolist.model.Task;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task,Integer> {

}
