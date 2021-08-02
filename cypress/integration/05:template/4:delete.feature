@delete
Feature: DELETE: Template
  This feature allows delete template

  Background:
    Given I open "product-templates" page

  @other
  Scenario: Delete tamplate by grid button - give up
    When I see "product-templates" page
    * I set "table" view on the grid
    Then On "grid" I can see row with "template_name" value and columns data: "{'0': 'template_name'}"
    * On "grid" I click on "delete" button for row with "template_name" value
    * Element "modal" is visible
    * I close modal by button
    Then Element "modal" not exist

  @other
  Scenario: Delete template from edit page - give up
    When I see "product-templates" page
    * I set "table" view on the grid
    Then On "grid" I can see row with "template_name2" value and columns data: "{'0': 'template_name2'}"
    * On "grid" I click on "edit" button for row with "template_name2" value
    * I see "product-templates/template/%UUID%/general" page
    * Element "template-name" is visible
    * Element "title-bar-header" is visible
    * I can see "template-name" input with the "template_name2" term
    * I can see "template-name" field as disabled
    * I click on "delete-template" button
    * I close modal
    Then I see "product-templates/template/%UUID%/general" page

  @success
  Scenario: Delete template by grid button - success
    When I see "product-templates" page
    * I set "table" view on the grid
    Then On "grid" I can see row with "template_name" value and columns data: "{'0': 'template_name'}"
    * On "grid" I click on "delete" button for row with "template_name" value
    * I confirm modal
    Then On "grid" I can not see row with "template_name" value

  @success
  Scenario: Delete template from edit page - success
    When I see "product-templates" page
    * I set "table" view on the grid
    Then On "grid" I can see row with "template_name2" value and columns data: "{'0': 'template_name2'}"
    * On "grid" I click on "edit" button for row with "template_name2" value
    * I see "product-templates/template/%UUID%/general" page
    * Element "template-name" is visible
    * Element "title-bar-header" is visible
    * I can see "template-name" input with the "template_name2" term
    * I can see "template-name" field as disabled
    * I click on "delete-template" button
    * I confirm modal
    Then I see "product-templates" page
