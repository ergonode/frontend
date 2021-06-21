@read
Feature: READ: Status on workflow
  This feature allows read status on workflow

  Background:
    Given I open "workflow/designer" page

  @success
  Scenario: Read statuses on designer - success
    When I can see "Statuses & transitions" text on "title-bar-header" element
    * On "workflow-designer" I can see column with "New" value
    * On "workflow-designer" I can see column with "Draft" value

  @success
  Scenario: Read transition - success
    When On "workflow-designer" in row 1 I can see the transition from "Draft" to "New"
    * On "workflow-designer" in row 1, I click on the "edit" button for the transition from "Draft" to "New"
    * I see "workflow/transition/%UUID%/general" page
    * Element "title-bar-header" is visible
    * I can see "Draft -> New" text on "title-bar-header" element
    * Element "transition-source" is visible
    * I can see "transition-source" select with the "Draft" term
    * I can see "transition-source" field as disabled
    * I can see "transition-destination" select with the "New" term
    * I can see "transition-destination" field as disabled
    * I can see "transition-roleId" select with the "" term
    * I can see "transition-roleId" field as enabled
    Then I click back arrow
    * I see "workflow/designer" page
