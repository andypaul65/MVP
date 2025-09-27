package com.example.services;

import com.example.dto.MessageDto;
import org.ajp.mvp.server.ServerApplication;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(classes = ServerApplication.class)
class SystemStateServiceIntegrationTest {

    @Autowired
    private SystemStateService systemStateService;

    @Test
    void getState_ReturnsDefaultForNewNamespace() {
        MessageDto result = systemStateService.getState("newNamespace");

        assertNotNull(result);
        assertEquals("Default state for newNamespace", result.getContent());
        assertEquals("newNamespace", result.getNamespace());
    }

@Test
void sendMessage_UpdatesAndReturnsMessage() {
    MessageDto message = new MessageDto("Updated message", "testNamespace");

    MessageDto result = systemStateService.sendMessage("testNamespace", message);

    assertNotNull(result);
    assertEquals("egassem detadpU", result.getContent()); // Reversed
    assertEquals("testNamespace", result.getNamespace());

    // Verify state is updated
    MessageDto retrieved = systemStateService.getState("testNamespace");
    assertEquals("egassem detadpU", retrieved.getContent());
    assertEquals("testNamespace", retrieved.getNamespace());
}

    @Test
    void getState_AfterSendMessage() {
        MessageDto message = new MessageDto("Another message", "anotherNamespace");
        systemStateService.sendMessage("anotherNamespace", message);

        MessageDto result = systemStateService.getState("anotherNamespace");

        assertEquals("egassem rehtonA", result.getContent()); // Reversed
        assertEquals("anotherNamespace", result.getNamespace());
    }
}