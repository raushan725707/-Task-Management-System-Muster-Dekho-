package com.task.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.task.entity.Task;
import com.task.repository.TaskRepository;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task save(Task task) {
        return taskRepository.save(task);
    }

//    public List<Task> searchTasks(String keyword) {
//        return taskRepository.findByTitleContainingOrDescriptionContaining(keyword, keyword);
//    }
//
//    public List<Task> filterTasks(boolean completed, LocalDate dueDate) {
//        if (dueDate != null) {
////            return taskRepository.findByCompletedAndDueDate(completed, dueDate);
//        	return null;
//        } else {
//            return taskRepository.findByCompleted(completed);
//        }
//    }

    public void deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
    }

	public ResponseEntity<?> getAllTaskOfuser(String username) {
		// TODO Auto-generated method stub
List<Task> task=		taskRepository.findByusername(username);
Map<Object, Object> m= new HashMap<>();
m.put("status", 200);
m.put("task", task);
		return new ResponseEntity<>(m, HttpStatus.OK);
				
	}

    // Additional methods for task update, marking as complete/incomplete, etc.
}
