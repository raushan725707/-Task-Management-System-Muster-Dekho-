package com.task.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.task.dto.DeleteTask;
import com.task.dto.UpdateTaskDTO;
import com.task.entity.Task;
import com.task.repository.TaskRepository;
import com.task.service.TaskService;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private TaskService taskService;
    @Autowired
    TaskRepository taskRepository;

    @PostMapping("/create")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        Task createdTask = taskService.save(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }

//    @GetMapping("/search")
//    public ResponseEntity<List<Task>> searchTasks(@RequestParam String keyword) {
//        List<Task> tasks = taskService.searchTasks(keyword);
//        return ResponseEntity.ok(tasks);
//    }
//
//    @GetMapping("/filter")
//    public ResponseEntity<List<Task>> filterTasks(@RequestParam boolean completed, @RequestParam(required = false) LocalDate dueDate) {
//        List<Task> tasks = taskService.filterTasks(completed, dueDate);
//        return ResponseEntity.ok(tasks);
//    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/getalltask/{username}")
    ResponseEntity<?> getAllTaskOfuser(@PathVariable String username)
    {
    	return taskService.getAllTaskOfuser(username);
    }

    @DeleteMapping("/deletetask")
    public ResponseEntity<?> deleteTask(@RequestBody DeleteTask deleteTask) {
  Task task=  	taskRepository.findByUsernameAndTaskId(deleteTask.getUsername(), deleteTask.getId());
  taskRepository.deleteById(task.getId());
  Map<Object, Object> m=new HashMap<>();
  m.put("status", 200);
  m.put("msg", "task deleted");
  return new ResponseEntity<>(m, HttpStatus.OK);
    // Controller methods for task update, marking as complete/incomplete, etc.
}
   
    
    @PostMapping("/assigntask")
    ResponseEntity<?> assignTask(@RequestParam Long taskid,@RequestParam String username ){
    Task task=	taskRepository.findById(taskid).orElseThrow();
    task.setAssigntaskusername(username);
    Task task1=    taskRepository.save(task);
    Map<Object, Object> m=new HashMap<>();
    m.put("status", 200);
    m.put("response", task1.getAssigntaskusername());
    return new ResponseEntity<>(m, HttpStatus.OK);
    }
    
    
    @GetMapping("/updatetaskpreview")
    ResponseEntity<?> updateTaskPreview(@RequestParam Long taskid,@RequestParam String username) throws Exception{
  try {  Task task=	taskRepository.findByUsernameAndTaskId(username, taskid);
    Map<Object, Object> m=new HashMap<>();
    m.put("task", task);
    m.put("status", 200);
    return new ResponseEntity<>(m,HttpStatus.OK);}
  catch(Exception e){
	  e.printStackTrace();
	  throw new Exception("Task Is Not Present");
  }
    }
    
//    @PutMapping("/updatetask")
//    ResponseEntity<?> updateTask(@RequestParam Long taskid,
//    		@RequestParam String title,
//    		@RequestParam String  description  ,
//    		@RequestParam String  dueDate   ,
//    		@RequestParam String   status  ,
//    		@RequestParam String 	assigntaskusername,
//    		@RequestParam String username){
//    Task t=	taskRepository.findByUsernameAndTaskId(username, taskid);
//    System.out.println("ststus"+status);
//    t.setTitle(title);
//    t.setDescription(description);
//   t.setStatus(status);
//    t.setDueDate(dueDate);
//    t.setAssigntaskusername(assigntaskusername);
//    t.setUsername(username);
//    taskRepository.save(t);
//    Map<Object, Object> m=new HashMap<>();
//    m.put("task", t);
//    m.put("status", 200);
//    return new ResponseEntity<>(m,HttpStatus.OK);}
//}

    
    
    
    
    @PutMapping("/updatetask")
    ResponseEntity<?> updateTask(@RequestBody UpdateTaskDTO updateTaskDTO){
    	 Task t = taskRepository.findByUsernameAndTaskId(updateTaskDTO.getUsername(), updateTaskDTO.getTaskid());

    	    // Update task properties using DTO
    	    if (updateTaskDTO.getTitle() != null && !updateTaskDTO.getTitle().isEmpty()) {
    	        t.setTitle(updateTaskDTO.getTitle());
    	    }
    	    if (updateTaskDTO.getDescription() != null && !updateTaskDTO.getDescription().isEmpty()) {
    	        t.setDescription(updateTaskDTO.getDescription());
    	    }
    	    if (updateTaskDTO.getStatus() != null && !updateTaskDTO.getStatus().isEmpty()) {
    	        t.setStatus(updateTaskDTO.getStatus());
    	    }
    	    if (updateTaskDTO.getDueDate() != null && !updateTaskDTO.getDueDate().isEmpty()) {
    	        t.setDueDate(updateTaskDTO.getDueDate());
    	    }
    	    if (updateTaskDTO.getAssigntaskusername() != null && !updateTaskDTO.getAssigntaskusername().isEmpty()) {
    	        t.setAssigntaskusername(updateTaskDTO.getAssigntaskusername());
    	    }
    	    // Username should always be updated from DTO
    	    t.setUsername(updateTaskDTO.getUsername());

    	    taskRepository.save(t);
    Map<Object, Object> m=new HashMap<>();
    m.put("task", t);
    m.put("status", 200);
    return new ResponseEntity<>(m,HttpStatus.OK);}
}

    
    
    