@update
Feature: UPDATE: Statuson workflow
  This feature allows update status on workflow

  Background:
    Given I open "/workflow" page

  @error
  Scenario: Update status from edit page - validation error (too long string)
    When On "workflow-designer" I can see column with "To correct" value
    * On "workflow-designer" I click on "edit" button for column with "To correct" value
    * I see "workflow/status/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "workflow/status/%UUID%/translations" page
    * I fill the "status-name" input with the "status_status_status_status_status_status_status_status_status_status_status_status_status_status_status_status_" term for "en_GB" translation
    * I "submit" the data and "update" is "incorrect"
    Then I see a form validation error that says "['Status name is too long. It should contain 100 characters or less.']"

  @success
  Scenario: Update status from edit page - success
    When On "workflow-designer" I can see column with "To correct" value
    * On "workflow-designer" I click on "edit" button for column with "To correct" value
    * I see "workflow/status/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "workflow/status/%UUID%/translations" page
    * I choose "[1]" option from "translation-language-select" multi select field
    * I fill the "status-name" input with the "status_EN" term for "en_GB" translation
    * I fill the "status-description" textarea with the "status_desc_EN" term for "en_GB" translation
    * I fill the "status-name" input with the "status_PL" term for "pl_PL" translation
    * I fill the "status-description" textarea with the "status_desc_PL" term for "pl_PL" translation
    * I "submit" the data and "update" is "correct"
    * I click back arrow
    Then I see "workflow" page
