package com.task.service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.task.entity.User;
import com.task.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

	public ResponseEntity<?> getALlUserName() {
		// TODO Auto-generated method stub
		List<String> user= userRepository.findAllUsernames();
		Map<Object, Object> m=new HashMap<>();
		m.put("status", 200);
		m.put("response", user);
		return new ResponseEntity<>(m, HttpStatus.OK);
	}

    // Additional methods for user update, etc.
}
