package com.example.dto;

/**
 * Data Transfer Object for user information.
 */
public class UserDto {

    private Long id;
    private String username;
    private String name;

    public UserDto() {}

    public UserDto(Long id, String username, String name) {
        this.id = id;
        this.username = username;
        this.name = name;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}