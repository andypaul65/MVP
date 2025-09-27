package com.example.services;

import com.example.dto.MessageDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class SystemStateServiceImplTest {

    private SystemStateServiceImpl service;

    @BeforeEach
    void setUp() {
        service = new SystemStateServiceImpl();
    }

    @Test
    void getState_ReturnsDefaultForNewNamespace() {
        MessageDto result = service.getState("newNamespace");

        assertNotNull(result);
        assertEquals("Default state for newNamespace", result.getContent());
        assertEquals("newNamespace", result.getNamespace());
    }

    @Test
    void getState_ReturnsStoredState() {
        MessageDto message = new MessageDto("Stored message", "test");
        service.sendMessage("test", message);

        MessageDto result = service.getState("test");

        assertNotNull(result);
        assertEquals("egassem derotS", result.getContent());
        assertEquals("test", result.getNamespace());
    }

    @Test
    void sendMessage_StoresAndReturnsMessage() {
        MessageDto message = new MessageDto("Test message", "test");

        MessageDto result = service.sendMessage("test", message);

        assertNotNull(result);
        assertEquals("egassem tseT", result.getContent());
        assertEquals("test", result.getNamespace());

        // Verify it's stored
        MessageDto retrieved = service.getState("test");
        assertEquals("egassem tseT", retrieved.getContent());
    }

    @Test
    void sendMessage_OverwritesPreviousState() {
        MessageDto first = new MessageDto("First message", "test");
        service.sendMessage("test", first);

        MessageDto second = new MessageDto("Second message", "test");
        service.sendMessage("test", second);

        MessageDto result = service.getState("test");
        assertEquals("egassem dnoceS", result.getContent());
    }

    @Test
    void sendMessage_SetsNamespaceIfNotProvided() {
        MessageDto message = new MessageDto("Message without namespace", null);

        MessageDto result = service.sendMessage("forcedNamespace", message);

        assertEquals("forcedNamespace", result.getNamespace());
    }
}