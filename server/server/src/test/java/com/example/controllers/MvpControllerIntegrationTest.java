package com.example.controllers;

import com.example.dto.MessageDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.ajp.mvp.server.ServerApplication;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(classes = ServerApplication.class)
@AutoConfigureWebMvc
class MvpControllerIntegrationTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    public void setUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    void getState_Success() throws Exception {
        mockMvc.perform(get("/api/state/test"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.content").value("Default state for test"))
                .andExpect(jsonPath("$.namespace").value("test"));
    }

    @Test
    void getState_NonExistentNamespace() throws Exception {
        mockMvc.perform(get("/api/state/nonexistent"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.content").value("Default state for nonexistent"))
                .andExpect(jsonPath("$.namespace").value("nonexistent"));
    }

    @Test
    void sendMessage_Success() throws Exception {
        MessageDto message = new MessageDto("Test message", "test");

        mockMvc.perform(post("/api/message/test")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(message)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.content").value("Test message"))
                .andExpect(jsonPath("$.namespace").value("test"));
    }

    @Test
    void sendMessage_InvalidRequest() throws Exception {
        mockMvc.perform(post("/api/message/test")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("invalid json"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void heartbeat_Success() throws Exception {
        mockMvc.perform(get("/api/heartbeat"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.status").value("alive"))
                .andExpect(jsonPath("$.timestamp").exists());
    }
}