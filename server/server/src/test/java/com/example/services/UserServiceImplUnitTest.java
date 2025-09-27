package com.example.services;

import com.example.dto.UserDto;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class UserServiceImplUnitTest {

    private final UserServiceImpl service = new UserServiceImpl();

    @Test
    void authenticate_ValidCredentials_ReturnsUser() {
        UserDto result = service.authenticate("user@example.com", "password");

        assertNotNull(result);
        assertEquals("user@example.com", result.getUsername());
        assertEquals("Demo User", result.getName());
    }

    @Test
    void authenticate_InvalidCredentials_ReturnsNull() {
        UserDto result = service.authenticate("user@example.com", "wrong");

        assertNull(result);
    }

    @Test
    void authenticate_UnknownUser_ReturnsNull() {
        UserDto result = service.authenticate("unknown@example.com", "password");

        assertNull(result);
    }

    @Test
    void getUserByUsername_ExistingUser_ReturnsUser() {
        UserDto result = service.getUserByUsername("user@example.com");

        assertNotNull(result);
        assertEquals("user@example.com", result.getUsername());
    }

    @Test
    void getUserByUsername_UnknownUser_ReturnsNull() {
        UserDto result = service.getUserByUsername("unknown@example.com");

        assertNull(result);
    }

    @Test
    void loadUserByUsername_ExistingUser_ReturnsUserDetails() {
        var result = service.loadUserByUsername("user@example.com");

        assertNotNull(result);
        assertEquals("user@example.com", result.getUsername());
        assertTrue(result.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_USER")));
    }

    @Test
    void loadUserByUsername_UnknownUser_ReturnsNull() {
        var result = service.loadUserByUsername("unknown@example.com");

        assertNull(result);
    }
}