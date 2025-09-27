package com.example.services;

import com.example.dto.UserDto;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * In-memory implementation of UserService for demo purposes.
 */
@Service
public class UserServiceImpl implements UserService {

    private final Map<String, UserDto> users = new HashMap<>();

    public UserServiceImpl() {
        // Demo user
        users.put("user@example.com", new UserDto(1L, "user@example.com", "Demo User"));
    }

    @Override
    public UserDto authenticate(String username, String password) {
        // Simple check: password is "656frfRRf"
        if ("656frfRRf".equals(password) && users.containsKey(username)) {
            return users.get(username);
        }
        return null;
    }

    @Override
    public UserDto getUserByUsername(String username) {
        return users.get(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        UserDto user = users.get(username);
        if (user != null) {
            return org.springframework.security.core.userdetails.User.withUsername(user.getUsername())
                    .password("") // Not used for JWT
                    .roles("USER")
                    .build();
        }
        return null;
    }
}