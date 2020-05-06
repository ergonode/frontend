Feature: Attribute adding
  This feature allows adding attributes

  Background:
    Given I am authenticated as "admin"
    Given I open "attributes/grid" page
    When I click on "newAttribute" button
    Then Element "modal" is "visible"

  Scenario: Add text attibute
    When I fill the "attributeName" input with the "text_attribute" term
    And I choose "0" option from "attributeType" select
    Then I can see "Configuration" text on "modal" element
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request to "en/attributes" and the response status code should be "201"

