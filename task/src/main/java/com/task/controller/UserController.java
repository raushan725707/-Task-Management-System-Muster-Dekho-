package com.task.controller;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.task.dto.LoginDTO;
import com.task.entity.User;
import com.task.repository.UserRepository;
import com.task.service.UserService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    UserRepository repository;
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody User user) {
        User existingUser = userService.findByUsername(user.getUsername());
        if (existingUser != null) {
        	
        	Map<Object, Object> m=new HashMap<>();
        	m.put("status", 409);
        	m.put("msg", "Username already exists");
            return new ResponseEntity<>(m, HttpStatus.OK);
        }
        
        Map<Object, Object> m=new HashMap<>();
    	m.put("status", 200);
    	m.put("msg", "User signed up successfully");
        userService.save(user);
        return new ResponseEntity<>(m, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        User existingUser = userService.findByUsername(loginDTO.getUsername());
        if (existingUser == null || !existingUser.getPassword().equals(loginDTO.getPassword())) {
        	Map<Object, Object> m=new HashMap<>();
        	m.put("status", 401);
        	m.put("msg", "Invalid username or password");
            return new ResponseEntity<>(m, HttpStatus.OK);
        }
        
        Map<Object, Object> m=new HashMap<>();
    	m.put("status", 200);
    	m.put("msg", "Login success");
        return new ResponseEntity<>(m, HttpStatus.OK);
    }
    
    @GetMapping("/getalluserlist")
    ResponseEntity<?> getALlUserName(){
    	return userService.getALlUserName();
    }

    // Controller methods for user update, etc.
}
