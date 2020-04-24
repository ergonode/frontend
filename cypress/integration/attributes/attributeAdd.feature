Feature: Attribute adding
  This feature allows adding attributes

  Background:
    Given I am authenticated as admin
    Then I open "attributes/grid" page
    And I click on "newAttribute" button
    When Element "modal" is "visible"

  Scenario: Add text attibute
    Then I fill the "attributeName" input with the "textAttributeName" term
    Then I choose "Text" option from "attributeType" field
