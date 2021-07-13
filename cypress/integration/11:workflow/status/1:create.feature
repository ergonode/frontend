@create
Feature: CREATE: Status on workflow
  This feature allows create status on workflow

  Background:
    Given I open "workflow/designer" page
    When I click on "new-status" button
    Then Element "modal" is visible

  @success
  Scenario: Add workflow status - success
    When I fill the "status-code" input with the "status_code" term
    * I choose 0 option from "status-color" color picker field
    * I click on "submit" button in "modal"
    * I send a "POST" request and status code should be 201
    Then On "workflow-designer" I can see column with "status_code" value

  @success
  Scenario: Add workflow status and go to edit - success
    When I fill the "status-code" input with the "status_code2" term
    * I choose 0 option from "status-color" color picker field
    * I click on "proceed" button in "modal"
    * I send a "POST" request and status code should be 201
    * I see "workflow/status/%UUID%/general" page
    * Element "status-code" is visible
    * Element "title-bar-header" is visible
    Then I can see "status-code" input with the "status_code2" term

  @error
  Scenario: Add workflow status - duplication error
    When I fill the "status-code" input with the "status_code" term
    * I choose 0 option from "status-color" color picker field
    * I click on "submit" button in "modal"
    * I send a "POST" request and status code should be 400
    * I see a form validation error that says "['Status status_code is not unique']"
    Then I close modal

  @error
  Scenario: Add workflow status - validation error (empty string)
    When I click on "submit" button in "modal"
    * I send a "POST" request and status code should be 400
    * I see a form validation error that says "['This value should not be blank.', 'This value should not be blank.']"
    Then I close modal

  @error
  Scenario: Add workflow status - validation error (misc string)
    When I fill the "status-code" input with the "@#$%()" term
    * I choose 0 option from "status-color" color picker field
    * I click on "submit" button in "modal"
    * I send a "POST" request and status code should be 400
    * I see a form validation error that says "['This value is not valid.']"
    Then I close modal
