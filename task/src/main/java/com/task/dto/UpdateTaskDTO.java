package com.task.dto;

import org.springframework.web.bind.annotation.RequestParam;

public class UpdateTaskDTO {
	private Long taskid;
	private String title;
	private String  description;
	private String  dueDate   ;
	private String   status  ;
	private String 	assigntaskusername;
	private String username;
	public Long getTaskid() {
		return taskid;
	}
	public void setTaskid(Long taskid) {
		this.taskid = taskid;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getDueDate() {
		return dueDate;
	}
	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getAssigntaskusername() {
		return assigntaskusername;
	}
	public void setAssigntaskusername(String assigntaskusername) {
		this.assigntaskusername = assigntaskusername;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
}
