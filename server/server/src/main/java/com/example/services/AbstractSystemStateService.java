package com.example.services;

import com.example.dto.MessageDto;

/**
 * Abstract base class for SystemStateService implementations.
 * Provides extension points for customizing state processing and storage.
 */
public abstract class AbstractSystemStateService implements SystemStateService {

    /**
     * Template method for processing messages before storage.
     * Subclasses can override to add custom logic.
     * @param namespace The namespace.
     * @param message The incoming message.
     * @return The processed message.
     */
    protected MessageDto processMessage(String namespace, MessageDto message) {
        // Default: reverse content as example
        message.setContent(new StringBuilder(message.getContent()).reverse().toString());
        return message;
    }

    /**
     * Template method for generating default state.
     * Subclasses can override to provide custom defaults.
     * @param namespace The namespace.
     * @return The default MessageDto.
     */
    protected MessageDto getDefaultState(String namespace) {
        return new MessageDto("Default state for " + namespace, namespace);
    }

    @Override
    public MessageDto getState(String namespace) {
        return getDefaultState(namespace); // Can be overridden to fetch from custom storage
    }

    @Override
    public MessageDto sendMessage(String namespace, MessageDto message) {
        MessageDto processed = processMessage(namespace, message);
        processed.setNamespace(namespace);
        storeMessage(namespace, processed); // Call protected method
        return processed;
    }

    /**
     * Protected method for storing the message.
     * Subclasses must implement this to define storage mechanism.
     * @param namespace The namespace.
     * @param message The message to store.
     */
    protected abstract void storeMessage(String namespace, MessageDto message);
}