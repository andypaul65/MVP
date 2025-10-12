Feature: System State Retrieval
  As a user of the MVP framework
  I want to retrieve the current system state for a namespace
  So that I can view real-time data in the tabbed interface

  Background:
    Given the server is running
    And the client is connected

  Scenario: Successful state retrieval
    Given a namespace "test" exists with state "active"
    When I request the state for namespace "test"
    Then I should receive a response with content "active" and namespace "test"
    And the client should display the state in the active tab

  Scenario: State retrieval for non-existent namespace
    Given a namespace "unknown" does not exist
    When I request the state for namespace "unknown"
    Then I should receive a 404 error response
    And the client should display an error message "Namespace not found"

  Scenario: Server unavailable during state retrieval
    Given the server is down
    When I request the state for namespace "test"
    Then the client should display a network error message
    And retry logic should be applied