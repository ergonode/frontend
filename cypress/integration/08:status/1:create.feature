@create
Feature: CREATE: Status
  This feature allows create status

  Background:
    Given I open "product-statuses/grid" page
    When I click on "new-status" button
    Then Element "modal" is visible

  @success
  Scenario: Add status - success
    When I fill the "status-code" input with the "status_code_test" term
    * I choose 0 option from "status-color" color picker field
    * On "modal" I "submit" the data and "create" is "correct"
    Then On "grid" I can see row with "status_code_test" value and columns data: "{'0': 'status_code_test', '2': '', '3': ''}"

  @success
  Scenario: Add status and go to edit - success
    When I fill the "status-code" input with the "status_code_test2" term
    * I choose 0 option from "status-color" color picker field
    * On "modal" I "proceed" the data and "create" is "correct"
    * I see "product-statuses/status/%UUID%/general" page
    * Element "status-code" is visible
    * Element "title-bar-header" is visible
    Then I can see "status-code" input with the "status_code_test2" term

  @error
  Scenario: Add status - duplication error
    When I fill the "status-code" input with the "status_code_test" term
    * I choose 0 option from "status-color" color picker field
    * On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['Status status_code_test is not unique']"
    Then I close modal

  @error
  Scenario: Add status - validation error (empty string)
    When On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['This value should not be blank.', 'This value should not be blank.']"
    Then I close modal

  @error
  Scenario: Add status - validation error (misc string)
    When I fill the "status-code" input with the "@#$%()" term
    * I choose 0 option from "status-color" color picker field
    * On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['This value is not valid.']"
    * I close modal
    Then On "grid" I can not see row with "@#$%()" value
