package com.example.controllers;

import com.example.dto.MessageDto;
import com.example.services.SystemStateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

/**
 * WebSocket controller for real-time state updates using STOMP messaging.
 * Handles incoming messages and broadcasts state changes to subscribed clients.
 */
@Controller
public class WebSocketController {

    @Autowired
    private SystemStateService stateService;

    /**
     * Handle state update messages from clients.
     * Clients send messages to /app/state/{namespace} and receive broadcasts on /topic/state/{namespace}
     *
     * @param namespace the namespace identifier
     * @param message the incoming message
     * @return the processed message to broadcast to all subscribers
     */
    @MessageMapping("/state/{namespace}")
    @SendTo("/topic/state/{namespace}")
    public MessageDto handleStateUpdate(@DestinationVariable String namespace, MessageDto message) {
        // Process the message through the service
        MessageDto processed = stateService.sendMessage(namespace, message);

        // Broadcast the updated state to all subscribers of this namespace
        return processed;
    }

    /**
     * Handle state request messages from clients.
     * Clients can request current state via WebSocket for real-time sync.
     *
     * @param namespace the namespace identifier
     * @return the current state to broadcast
     */
    @MessageMapping("/state/{namespace}/request")
    @SendTo("/topic/state/{namespace}")
    public MessageDto handleStateRequest(@DestinationVariable String namespace) {
        // Return current state for the namespace
        return stateService.getState(namespace);
    }
}