package com.example.dto;

/**
 * Data Transfer Object for JSON payloads in client-server communication.
 * Supports themed displays by including message content.
 */
public class MessageDto {

    private String message;

    public MessageDto() {
    }

    public MessageDto(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}