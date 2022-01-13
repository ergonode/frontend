@delete
Feature: DELETE: Transition on workflow
  This feature allows delete transition on workflow

  Background:
    Given I open "workflow" page

  @other
  Scenario: Delete workflow transition from edit page - give up
    When On "workflow-designer" I can see the transition from "New" to "Draft"
    * On "workflow-designer" I click on the "edit" button for the transition from "New" to "Draft"
    * I see "workflow/transition/%UUID%/general" page
    * I can see "transition-from" select with the "New" term
    * I can see "transition-to" select with the "Draft" term
    * I click on "delete-transition" button
    * I close modal

  @other
  Scenario: Delete workflow transition from workflow designer - give up
    When On "workflow-designer" I can see the transition from "New" to "Draft"
    * On "workflow-designer" I click on the "remove" button for the transition from "New" to "Draft"
    * I close modal


  @success
  Scenario: Delete workflow transition from edit page - success
    When On "workflow-designer" I can see the transition from "New" to "Draft"
    * On "workflow-designer" I click on the "edit" button for the transition from "New" to "Draft"
    * I see "workflow/transition/%UUID%/general" page
    * I can see "transition-from" select with the "New" term
    * I can see "transition-to" select with the "Draft" term
    * I click on "delete-transition" button
    * I confirm modal

  @success
  Scenario: Delete workflow transition from workflow designer - success
    When On "workflow-designer" I can see the transition from "Published" to "Draft"
    * On "workflow-designer" I click on the "remove" button for the transition from "Published" to "Draft"
    * I confirm modal
    Then I click on "submit" button
