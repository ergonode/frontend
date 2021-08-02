@delete
Feature: DELETE: Status
  This feature allows delete status

  Background:
    Given I open "product-statuses/grid" page

  @other
  Scenario: Delete status by grid button - give up
    When On "grid" I can see row with "status_code_test" value and columns data: "{'0': 'status_code_test'}"
    * On "grid" I click on "delete" button for row with "status_code_test" value
    * Element "modal" is visible
    * I close modal by button
    Then Element "modal" not exist

  @other
  Scenario: Delete status from edit page - give up
    When On "grid" I can see row with "status_code_test2" value and columns data: "{'0': 'status_code_test2'}"
    * On "grid" I click on "edit" button for row with "status_code_test2" value
    * I see "product-statuses/status/%UUID%/general" page
    * Element "status-code" is visible
    * Element "title-bar-header" is visible
    * I can see "status-code" input with the "status_code_test2" term
    * I can see "status-code" field as disabled
    * I click on "delete-status" button
    * I close modal
    Then I see "product-statuses/status/%UUID%/general" page

  @success
  Scenario: Delete status by grid button - success
    When On "grid" I can see row with "status_code_test" value and columns data: "{'0': 'status_code_test'}"
    * On "grid" I click on "delete" button for row with "status_code_test" value
    * I confirm modal
    Then On "grid" I can not see row with "status_code_test" value

  @success
  Scenario: Delete status from edit page - success
    When On "grid" I can see row with "status_code_test2" value and columns data: "{'0': 'status_code_test2'}"
    * On "grid" I click on "edit" button for row with "status_code_test2" value
    * I see "product-statuses/status/%UUID%/general" page
    * Element "status-code" is visible
    * Element "title-bar-header" is visible
    * I can see "status-code" input with the "status_code_test2" term
    * I can see "status-code" field as disabled
    * I click on "delete-status" button
    * I confirm modal
    Then I see "product-statuses/grid" page
