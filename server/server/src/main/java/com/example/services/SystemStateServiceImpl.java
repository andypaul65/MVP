package com.example.services;

import com.example.dto.MessageDto;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;

/**
 * Implementation of SystemStateService using in-memory persistence.
 * Extends AbstractSystemStateService for customizable processing.
 */
@Service
public class SystemStateServiceImpl extends AbstractSystemStateService {

    private final ConcurrentHashMap<String, MessageDto> stateStore = new ConcurrentHashMap<>();

    @Override
    public MessageDto getState(String namespace) {
        return stateStore.getOrDefault(namespace, getDefaultState(namespace));
    }

    @Override
    protected void storeMessage(String namespace, MessageDto message) {
        stateStore.put(namespace, message);
    }
}