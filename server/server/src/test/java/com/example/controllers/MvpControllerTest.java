package com.example.controllers;

import com.example.dto.MessageDto;
import com.example.services.SystemStateService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MvpControllerTest {

    @Mock
    private SystemStateService stateService;

    @InjectMocks
    private MvpController controller;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getState_ReturnsServiceResult() {
        MessageDto expected = new MessageDto("Test state", "test");
        when(stateService.getState("test")).thenReturn(expected);

        ResponseEntity<MessageDto> response = controller.getState("test");

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(expected, response.getBody());
        verify(stateService).getState("test");
    }

@Test
void sendMessage_CallsServiceAndReturnsResult() {
    MessageDto message = new MessageDto("Test message", "test");
    MessageDto processed = new MessageDto("egassem tseT", "test"); // Reversed
    when(stateService.sendMessage("test", message)).thenReturn(processed);

    ResponseEntity<MessageDto> response = controller.sendMessage("test", message);

    assertEquals(200, response.getStatusCodeValue());
    assertEquals(processed, response.getBody());
    verify(stateService).sendMessage("test", message);
}

    @Test
    @SuppressWarnings("unchecked")
    void heartbeat_ReturnsAliveStatus() {
        ResponseEntity<?> response = controller.heartbeat();

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertTrue(response.getBody() instanceof java.util.Map);
        java.util.Map<String, Object> body = (java.util.Map<String, Object>) response.getBody();
        assertEquals("alive", body.get("status"));
        assertNotNull(body.get("timestamp"));
    }
}