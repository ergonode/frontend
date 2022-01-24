@update
Feature: UPDATE: Transition workflow
  This feature allows update transition on workflow

  Background:
    Given I open "workflow" page

  @success
  Scenario: Update transition from edit page - success
    When On "workflow-designer" I can see the transition from "New" to "Draft"
    * On "workflow-designer" I click on the "edit" button for the transition from "New" to "Draft"
    * I see "workflow/transition/%UUID%/general" page
    * I choose "[1]" option from "transition-roleId" multi select field
    * On "form" I "submit" the data and "update" is "correct"
    * I click back arrow
    Then I see "workflow" page
