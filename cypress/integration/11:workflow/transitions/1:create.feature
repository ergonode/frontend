@create
Feature: CREATE: Transition on workflow
  This feature allows create transition on workflow

  Background:
    Given I open "/workflow" page

  @success
  Scenario: Add workflow transition - success
    When On "workflow-designer" in row 4 I create transition from "Published" to "Draft"
    * I click on "submit" button
    Then On "workflow-designer" I can see the transition from "Published" to "Draft"
