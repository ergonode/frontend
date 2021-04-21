@delete
Feature: DELETE: Status
  This feature allows delete status

  Background:
    Given I open "product-statuses/grid" page

  @other
  Scenario: Delete status by grid button - give up
    When On "grid" I can see row with "status_code" value and columns data: "{'0': 'status_code'}"
    * On "grid" I click on "delete" button for row with "status_code" value
    * Element "modal" is visible
    * I close modal by button
    Then Element "modal" not exist

  @other
  Scenario: Delete status from edit page - give up
    When On "grid" I can see row with "status_code2" value and columns data: "{'0': 'status_code2'}"
    * On "grid" I click on "edit" button for row with "status_code2" value
    * I see "product-statuses/status/%UUID%/general" page
    * Element "status-code" is visible
    * Element "title-bar-header" is visible
    * I can see "status-code" input with the "status_code2" term
    * I can see "status-code" field as disabled
    * I click on "delete-status" button
    * I close modal
    Then I see "product-statuses/status/%UUID%/general" page

  @success
  Scenario: Delete status by grid button - success
    When On "grid" I can see row with "status_code" value and columns data: "{'0': 'status_code'}"
    * On "grid" I click on "delete" button for row with "status_code" value
    * I confirm modal
    * I send a "DELETE" request and status code should be 204
    Then On "grid" I can not see row with "status_code" value

  @success
  Scenario: Delete status from edit page - success
    When On "grid" I can see row with "status_code2" value and columns data: "{'0': 'status_code2'}"
    * On "grid" I click on "edit" button for row with "status_code2" value
    * I see "product-statuses/status/%UUID%/general" page
    * Element "status-code" is visible
    * Element "title-bar-header" is visible
    * I can see "status-code" input with the "status_code2" term
    * I can see "status-code" field as disabled
    * I click on "delete-status" button
    * I confirm modal
    Then I see "product-statuses/grid" page
