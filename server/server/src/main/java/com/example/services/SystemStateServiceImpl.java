package com.example.services;

import com.example.dto.MessageDto;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;

/**
 * Implementation of SystemStateService using in-memory persistence.
 * Manages state and message processing for different namespaces.
 */
@Service
public class SystemStateServiceImpl implements SystemStateService {

    private final ConcurrentHashMap<String, MessageDto> stateStore = new ConcurrentHashMap<>();

    @Override
    public MessageDto getState(String namespace) {
        return stateStore.getOrDefault(namespace, new MessageDto("Default state for " + namespace, namespace));
    }

@Override
public MessageDto sendMessage(String namespace, MessageDto message) {
    // Process and store the message (e.g., reverse content)
    message.setNamespace(namespace); // Ensure namespace is set
    message.setContent(new StringBuilder(message.getContent()).reverse().toString());
    stateStore.put(namespace, message);
    return message; // Return the processed message
}
}