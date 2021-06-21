@delete
Feature: DELETE: Transition on workflow
  This feature allows delete transition on workflow

  Background:
    Given I open "workflow/designer" page

  @other
  Scenario: Delete workflow transition from edit page - give up
    When On "workflow-designer" in row 1 I can see the transition from "Draft" to "New"
    * On "workflow-designer" in row 1, I click on the "edit" button for the transition from "Draft" to "New"
    * I see "workflow/transition/%UUID%/general" page
    * I can see "transition-source" select with the "Draft" term
    * I can see "transition-destination" select with the "New" term
    * Element "title-bar-header" is visible
    * I click on "delete-transition" button
    * I close modal
    Then I see "workflow/transition/%UUID%/general" page

  @other
  Scenario: Delete workflow transition from workflow designer - give up
    When On "workflow-designer" in row 3 I can see the transition from "Draft" to "#Processed"
    * On "workflow-designer" in row 3, I click on the "remove" button for the transition from "Draft" to "#Processed"
    * I close modal
    Then I see "workflow/designer" page


  @success
  Scenario: Delete workflow transition from edit page - success
    When On "workflow-designer" in row 3 I can see the transition from "Draft" to "#Blocked"
    * On "workflow-designer" in row 3, I click on the "edit" button for the transition from "Draft" to "#Blocked"
    * I see "workflow/transition/%UUID%/general" page
    * I can see "transition-source" select with the "Draft" term
    * I can see "transition-destination" select with the "#Blocked" term
    * Element "title-bar-header" is visible
    * I click on "delete-transition" button
    * I confirm modal
    Then I see "workflow/designer" page

  @success
  Scenario: Delete workflow transition from workflow designer - success
    When On "workflow-designer" in row 3 I can see the transition from "Draft" to "#Processed"
    * On "workflow-designer" in row 3, I click on the "remove" button for the transition from "Draft" to "#Processed"
    * I confirm modal
    * I see "workflow/designer" page
    Then I click on "submit" button
