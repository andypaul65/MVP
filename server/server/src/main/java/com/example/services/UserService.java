package com.example.services;

import com.example.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * Interface for user management services.
 */
public interface UserService {

    UserDto authenticate(String username, String password);

    UserDto getUserByUsername(String username);

    UserDetails loadUserByUsername(String username);
}