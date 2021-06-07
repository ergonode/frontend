@update
Feature: UPDATE: Transition workflow
  This feature allows update transition on workflow

  Background:
    Given I open "workflow/designer" page

  @success
  Scenario: Update transition from edit page - success
    When On "workflow-designer" in row 1 I can see the transition from "Draft" to "New"
    * On "workflow-designer" in row 1, I click on the "edit" button for the transition from "Draft" to "New"
    * I see "workflow/transition/%UUID%/general" page
    * I choose "[1]" option from "transition-roleId" multi select field
    Then I click on "submit" button
    * I send a "PUT" request and status code should be 204
    * I click back arrow
    Then I see "workflow/designer" page
