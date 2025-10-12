Feature: Tab Navigation
  As a user of the tabbed interface
  I want to switch between tabs
  So that I can access different namespaces or panels

  Background:
    Given the client application is loaded
    And tabs are configured for namespaces "debug", "control", and "analytics"

  Scenario: Switching to a tab
    Given I am on the "debug" tab
    When I click on the "control" tab
    Then the active tab should change to "control"
    And the content area should display the "control" panel
    And the "control" tab button should have green accent styling

  Scenario: Tab mount hook execution
    Given a tab has an onTabMount hook
    When I switch to that tab
    Then the hook should be executed
    And any associated state updates should occur

  Scenario: Tab with custom styling
    Given a tab has custom style properties
    When I switch to that tab
    Then the content area should apply the custom styles
    And maintain cyberpunk theme consistency