package com.example.services;

import com.example.dto.MessageDto;

/**
 * Interface for system state management services.
 * Provides methods to retrieve and send state messages for different namespaces.
 */
public interface SystemStateService {

    /**
     * Retrieves the current state for the given namespace.
     * @param namespace the namespace identifier
     * @return MessageDto containing the state information
     */
    MessageDto getState(String namespace);

    /**
     * Sends a message to the specified namespace.
     * @param namespace the namespace identifier
     * @param message the message to send
     */
    void sendMessage(String namespace, MessageDto message);
}