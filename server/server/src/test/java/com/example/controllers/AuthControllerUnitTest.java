package com.example.controllers;

import com.example.dto.AuthResponse;
import com.example.dto.LoginRequest;
import com.example.dto.UserDto;
import com.example.security.JwtUtil;
import com.example.services.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthControllerUnitTest {

    @Mock
    private UserService userService;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthController controller;

    @Test
    void login_ValidCredentials_ReturnsToken() {
        LoginRequest request = new LoginRequest("user@example.com", "password");
        UserDto user = new UserDto(1L, "user@example.com", "User");
        when(userService.authenticate("user@example.com", "password")).thenReturn(user);
        when(jwtUtil.generateToken("user@example.com")).thenReturn("token");

        ResponseEntity<AuthResponse> response = controller.login(request);

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals("token", response.getBody().getToken());
        assertEquals(user, response.getBody().getUser());
    }

    @Test
    void login_InvalidCredentials_Returns401() {
        LoginRequest request = new LoginRequest("user@example.com", "wrong");
        when(userService.authenticate("user@example.com", "wrong")).thenReturn(null);

        ResponseEntity<AuthResponse> response = controller.login(request);

        assertEquals(401, response.getStatusCodeValue());
    }

    @Test
    void logout_Returns200() {
        ResponseEntity<Void> response = controller.logout();

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void me_ValidToken_ReturnsUser() {
        UserDto user = new UserDto(1L, "user@example.com", "User");
        when(jwtUtil.extractUsername("token")).thenReturn("user@example.com");
        when(jwtUtil.validateToken("token", "user@example.com")).thenReturn(true);
        when(userService.getUserByUsername("user@example.com")).thenReturn(user);

        ResponseEntity<UserDto> response = controller.me("Bearer token");

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(user, response.getBody());
    }

    @Test
    void me_InvalidToken_Returns401() {
        ResponseEntity<UserDto> response = controller.me("Bearer invalid");

        assertEquals(401, response.getStatusCodeValue());
    }

    @Test
    void me_NoToken_Returns401() {
        ResponseEntity<UserDto> response = controller.me(null);

        assertEquals(401, response.getStatusCodeValue());
    }
}