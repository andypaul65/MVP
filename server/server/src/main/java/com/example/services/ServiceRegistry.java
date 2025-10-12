package com.example.services;

import java.util.List;

/**
 * Interface for registering and managing services dynamically.
 * Allows other projects to add custom services to the framework.
 */
public interface ServiceRegistry {

    /**
     * Registers a new service implementation.
     * @param serviceName The name of the service (e.g., "systemState").
     * @param service The service instance to register.
     */
    void registerService(String serviceName, Object service);

    /**
     * Unregisters a service by its name.
     * @param serviceName The name of the service to remove.
     */
    void unregisterService(String serviceName);

    /**
     * Retrieves a registered service by name.
     * @param serviceName The name of the service.
     * @param serviceClass The class type of the service.
     * @return The service instance if found, null otherwise.
     */
    <T> T getService(String serviceName, Class<T> serviceClass);

    /**
     * Lists all registered service names.
     * @return List of service names.
     */
    List<String> getRegisteredServiceNames();
}