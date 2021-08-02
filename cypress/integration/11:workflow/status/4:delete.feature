@delete
Feature: DELETE: Status on workflow
  This feature allows delete status on workflow

  Background:
    Given I open "/workflow/designer" page

  @other
  Scenario: Delete workflow status from edit page - give up
    When On "workflow-designer" I can see column with "Processed" value
    * On "workflow-designer" I click on "edit" button for column with "Processed" value
    * I see "workflow/status/%UUID%/general" page
    * Element "status-code" is visible
    * I can see "status-code" input with the "processed" term
    * I can see "status-code" field as disabled
    * I click on "delete-status" button
    * I close modal
    Then I see "workflow/status/%UUID%/general" page


  @success
  Scenario: Delete workflow status from edit page - success
    When On "workflow-designer" I can see column with "status_code" value
    * On "workflow-designer" I click on "edit" button for column with "status_code" value
    * I see "workflow/status/%UUID%/general" page
    * Element "status-code" is visible
    * I can see "status-code" input with the "status_code" term
    * I can see "status-code" field as disabled
    * I click on "delete-status" button
    * I confirm modal
    Then I see "/workflow/designer" page
