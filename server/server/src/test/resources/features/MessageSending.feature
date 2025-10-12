Feature: Message Sending
  As a user of the MVP framework
  I want to send messages to a namespace
  So that I can update the system state in real-time

  Background:
    Given the server is running
    And the client is connected

  Scenario: Successful message sending
    Given a namespace "test" exists
    When I send a message with content "update" to namespace "test"
    Then the server should accept the message
    And respond with 202 Accepted
    And the client should confirm the message was sent

  Scenario: Message sending to non-existent namespace
    Given a namespace "invalid" does not exist
    When I send a message with content "test" to namespace "invalid"
    Then I should receive a 404 error response
    And the client should display an error message "Namespace not found"

  Scenario: Message sending with invalid data
    Given a namespace "test" exists
    When I send a message with invalid JSON
    Then I should receive a 400 Bad Request response
    And the client should display an error message "Invalid message format"