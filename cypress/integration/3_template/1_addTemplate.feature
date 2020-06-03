Feature: Template adding
  This feature allows adding template

  Background:
    Given I am authenticated as "admin"
    Given I open "product-templates" page
    When I click on "new-template" button
    Then Element "modal" is "visible"

  Scenario: Add template and delete by request
    When I fill the "template-name" input with the "template_1" term
    And I choose 0 option from "template-default-label" select field
    And I choose 0 option from "template-default-image" select field
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
