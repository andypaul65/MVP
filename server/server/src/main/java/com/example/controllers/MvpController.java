package com.example.controllers;

import com.example.dto.MessageDto;
import com.example.services.SystemStateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for MVP API endpoints.
 * Handles state retrieval and message sending for extensible namespaces.
 */
@RestController
@RequestMapping("/api")
public class MvpController {

    @Autowired
    private SystemStateService stateService;

    /**
     * Retrieves the state for a given namespace.
     * @param namespace the namespace identifier
     * @return ResponseEntity with MessageDto containing state info
     */
    @GetMapping("/state/{namespace}")
    public ResponseEntity<MessageDto> getState(@PathVariable String namespace) {
        MessageDto dto = stateService.getState(namespace);
        return ResponseEntity.ok(dto); // Supports themed client rendering
    }

    /**
     * Sends a message to a specified namespace.
     * @param namespace the namespace identifier
     * @param message the message payload
     * @return ResponseEntity indicating acceptance
     */
    @PostMapping("/message/{namespace}")
    public ResponseEntity<Void> sendMessage(@PathVariable String namespace, @RequestBody MessageDto message) {
        stateService.sendMessage(namespace, message);
        return ResponseEntity.accepted().build();
    }
}