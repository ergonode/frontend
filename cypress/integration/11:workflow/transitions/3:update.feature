@update
Feature: UPDATE: Transition workflow
  This feature allows update transition on workflow

  Background:
    Given I open "workflow/designer" page

  @success
  Scenario: Update transition from edit page - success
    When On "workflow-designer" I can see the transition from "New" to "Processed"
    * On "workflow-designer" I click on the "edit" button for the transition from "New" to "Processed"
    * I see "workflow/transition/%UUID%/general" page
    * I choose "[1]" option from "transition-roleId" multi select field
    * On "form" I "submit" the data and "update" it "correctly"
    * I click back arrow
    Then I see "workflow/designer" page
