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
    * On "workflow-designer" I can see column with "status_EN" value

  @other
  Scenario: Add workflow transition - give up
    When On "workflow-designer" in row 2 I create transition from "New" to "status_EN"
    * On "workflow-designer" I click on the "remove" button for the transition from "New" to "status_EN"
    Then I confirm modal

  @success
  Scenario: Add workflow transition - success
    When On "workflow-designer" in row 2 I create transition from "New" to "status_EN"
    Then On "workflow-designer" I can see the transition from "New" to "status_EN"
    * On "workflow-designer" in row 3 I create transition from "Draft" to "New"
    Then On "workflow-designer" I can see the transition from "Draft" to "New"
    * I click on "submit" button
