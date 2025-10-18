package com.example.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Data Transfer Object for JSON payloads in client-server communication.
 * Supports themed displays by including message content and namespace scoping.
 */
public class MessageDto {

    private String content;
    private String namespace;

    public MessageDto() {
    }

    @JsonCreator
    public MessageDto(@JsonProperty("content") String content, @JsonProperty("namespace") String namespace) {
        this.content = content;
        this.namespace = namespace;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getNamespace() {
        return namespace;
    }

    public void setNamespace(String namespace) {
        this.namespace = namespace;
    }
}