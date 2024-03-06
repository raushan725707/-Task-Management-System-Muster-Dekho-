package com.task.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.task.entity.Task;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
//	@Query("SELECT t FROM Task t WHERE t.title LIKE %:title% OR t.description LIKE %:description%")
//	List<Task> findByTitleContainingOrDescriptionContaining(@Param("title") String title, @Param("description") String description);
//	@Query("SELECT t FROM Task t WHERE t.status = :completed")
//	List<Task> findByCompleted(@Param("completed") boolean completed);
//	@Query("SELECT t FROM Task t WHERE t.dueDate = :dueDate")
//	List<Task> findByDueDate(@Param("dueDate") LocalDate dueDate);
//	@Query("SELECT t FROM Task t WHERE t.status = :completed AND t.dueDate = :dueDate")
//	List<Task> findByCompletedAndDueDate(@Param("completed") boolean completed, @Param("dueDate") LocalDate dueDate);
	List<Task> findByusername(String username);
	@Query("SELECT t FROM Task t WHERE t.username = :username AND t.id = :id")
	Task findByUsernameAndTaskId(@Param("username") String username, @Param("id") Long taskId);
}
