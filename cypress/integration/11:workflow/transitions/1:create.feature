@create
Feature: CREATE: Transition on workflow
  This feature allows create transition on workflow

  Background:
    Given I open "workflow/designer" page

  @success
  Scenario: Read statuses on designer - success
    When I can see "Statuses & transitions" text on "title-bar-header" element
    * On "workflow-designer" I can see column with "New" value
    * On "workflow-designer" I can see column with "Draft" value
