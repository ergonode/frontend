# TODO: Create with image
@create
Feature: CREATE: Template
  This feature allows create template

  Background:
    Given I open "product-templates" page
    When On "title-bar" element I click "new-template" button
    Then Element "modal" is visible

  @success
  Scenario: Add template - success
    When I fill the "template-code" input with the "template_code" term
    * I fill the "template-name" input with the "template_name" term
    * On "modal" I "submit" the data and "create" is "correct"
    * I set "table" view on the grid
    Then On "grid" I can see row with "template_code" value and columns data: "{'0': 'template_code', '1': 'template_name'}"

  @success
  Scenario: Add template and go to edit - success
    When I fill the "template-code" input with the "template_code2" term
    * I fill the "template-name" input with the "template_name2" term
    * On "modal" I "proceed" the data and "create" is "correct"
    * I see "product-templates/template/%UUID%/general" page
    * Element "template-name" is visible
    * Element "title-bar-header" is visible
    Then I can see "template-code" input with the "template_code2" term
    * I can see "template-name" input with the "template_name2" term

  @error
  Scenario: Add template - duplication error
    When I fill the "template-code" input with the "template_code" term
    * I fill the "template-name" input with the "template_name" term
    * On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['Template code is not unique.']"
    Then I close modal

  @error
  Scenario: Add template - validation error (empty string)
    When On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['Template code is required', 'Template name is required']"
    Then I close modal

   @error
   Scenario: Add template - validation error (misc string)
     When I fill the "template-code" input with the "@#$%()" term
     * I fill the "template-name" input with the "template_name" term
     * On "modal" I "submit" the data and "create" is "incorrect"
     * I see a form validation error that says "['Template code can have only letters, digits or underscore symbol']"
     * I close modal
     * I set "table" view on the grid
     Then On "grid" I can not see row with "@#$%()" value
