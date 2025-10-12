Feature: Error Handling
  As a user of the MVP framework
  I want to see appropriate error messages
  So that I can understand and respond to issues

  Background:
    Given the server is running
    And the client is connected

  Scenario: Network error during state retrieval
    Given the network connection is interrupted
    When I request state for namespace "test"
    Then the client should display "Network error occurred"
    And retry the request up to 3 times

  Scenario: Server business rule violation
    Given a business rule is violated on the server
    When I send an invalid message
    Then the request should fail immediately
    And I should receive a 400 error with descriptive message
    And the client should display the error

  Scenario: Client-side rendering error
    Given a tab component fails to render
    When I switch to that tab
    Then an error boundary should catch the error
    And display a fallback UI with error details