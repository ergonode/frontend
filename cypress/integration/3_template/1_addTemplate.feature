Feature: Template adding
  This feature allows adding template

  Background:
    Given I open "product-templates" page
    When I click on "new-template" button
    Then Element "modal" is "visible"

  Scenario: Add template and delete by request
    When I fill the "template-name" input with the "template_1" term
    And I choose 0 option from "template-default-label" select field
    When I click on "submit" button
    Then I send a "POST" request and status code should be 201
    And I open "product-templates" page
    Then I set "table" view on the grid
    Then On "grid" I can see row with "template_1" value and columns data: "{'0': 'template_1'}"
    And On "grid" I click on "delete" button for row with "template_1" value
    Then I close modal by button
    And I remove "this" element by "DELETE" request

  Scenario: Add template and delete by grid button
    When I fill the "template-name" input with the "template_2" term
    And I choose 0 option from "template-default-label" select field
    When I click on "submit" button
    Then I send a "POST" request and status code should be 201
    And I open "product-templates" page
    Then I set "table" view on the grid
    Then On "grid" I can see row with "template_2" value and columns data: "{'0': 'template_2'}"
    And On "grid" I click on "delete" button for row with "template_2" value
    Then I confirm modal
    And On "grid" I can not see row with "template_2" value

  Scenario: Add template and delete from edit
    When I fill the "template-name" input with the "template_3" term
    And I choose 0 option from "template-default-label" select field
    When I click on "proceed" button
    Then I send a "POST" request and status code should be 201
    And I see "product-templates/template/%UUID%/general" page
    Then Element "template-name" is "visible"
    Then Element "title-bar-header" is "visible"
    Then I can see "template_3" text on "title-bar-header" element
    When I click on "delete-template" button
    Then I confirm modal
    And I see "product-templates" page

  Scenario: Add template and edit
    When I fill the "template-name" input with the "template_4" term
    And I choose 0 option from "template-default-label" select field
    And I click on "proceed" button
    Then I send a "POST" request and status code should be 201
    And I see "product-templates/template/%UUID%/general" page
