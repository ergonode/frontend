@read
Feature: READ: Status on workflow
  This feature allows read status on workflow

  Background:
    Given I open "workflow" page

  @success
  Scenario: Read statuses on designer - success
    When I can see "Statuses & transitions" text on "title-bar-header" element
    * On "workflow-designer" I can see column with "New" value
    * On "workflow-designer" I can see column with "Draft" value

  @success
  Scenario: Read transition - success
    When On "workflow-designer" I can see the transition from "New" to "Draft"
    * On "workflow-designer" I click on the "edit" button for the transition from "New" to "Draft"
    * I see "workflow/transition/%UUID%/general" page
    * Element "title-bar-header" is visible
    * I can see "New -> Draft" text on "title-bar-header" element
    * Element "transition-from" is visible
    * I can see "transition-from" select with the "New" term
    * I can see "transition-from" field as disabled
    * I can see "transition-to" select with the "Draft" term
    * I can see "transition-to" field as disabled
    * I can see "transition-roleId" select with the "" term
    * I can see "transition-roleId" field as enabled
    Then I click back arrow
    * I see "workflow" page
