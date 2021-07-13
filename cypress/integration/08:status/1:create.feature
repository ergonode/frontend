@create
Feature: CREATE: Status
  This feature allows create status

  Background:
    Given I open "product-statuses/grid" page
    When I click on "new-status" button
    Then Element "modal" is visible

  @success
  Scenario: Add status - success
    When I fill the "status-code" input with the "status_code" term
    * I choose 0 option from "status-color" color picker field
    * I click on "submit" button
    * I send a "POST" request and status code should be 201
    Then On "grid" I can see row with "status_code" value and columns data: "{'0': 'status_code', '2': '', '3': ''}"

  @success
  Scenario: Add status and go to edit - success
    When I fill the "status-code" input with the "status_code2" term
    * I choose 0 option from "status-color" color picker field
    * I click on "proceed" button
    * I send a "POST" request and status code should be 201
    * I see "product-statuses/status/%UUID%/general" page
    * Element "status-code" is visible
    * Element "title-bar-header" is visible
    Then I can see "status-code" input with the "status_code2" term

  @error
  Scenario: Add status - duplication error
    When I fill the "status-code" input with the "status_code" term
    * I choose 0 option from "status-color" color picker field
    * I click on "submit" button
    * I send a "POST" request and status code should be 400
    * I see a form validation error that says "['Status status_code is not unique']"
    Then I close modal

  @error
  Scenario: Add status - validation error (empty string)
    When I click on "submit" button
    * I send a "POST" request and status code should be 400
    * I see a form validation error that says "['This value should not be blank.', 'This value should not be blank.']"
    Then I close modal

  @error
  Scenario: Add status - validation error (misc string)
    When I fill the "status-code" input with the "@#$%()" term
    * I choose 0 option from "status-color" color picker field
    * I click on "submit" button
    * I send a "POST" request and status code should be 400
    * I see a form validation error that says "['This value is not valid.']"
    * I close modal
    Then On "grid" I can not see row with "@#$%()" value
