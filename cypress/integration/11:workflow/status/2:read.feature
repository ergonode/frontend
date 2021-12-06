@read
Feature: READ: Status on workflow
  This feature allows read status on workflow

  Background:
    Given I open "/workflow" page

  @success
  Scenario: Read statuses on designer - success
    When I can see "Statuses & transitions" text on "title-bar-header" element
    * On "workflow-designer" I can see column with "New" value
    * On "workflow-designer" I can see column with "Draft" value

  @success
  Scenario: Read status general - success
    When On "workflow-designer" I can see column with "New" value
    * On "workflow-designer" I click on "edit" button for column with "New" value
    * I see "workflow/status/%UUID%/general" page
    * I can see "new" text on "title-bar-header" element
    * I can see "status-code" input with the "new" term
    * I can see "status-code" field as disabled
    Then I click back arrow
    * I see "workflow" page

  @success
  Scenario: Read status translation - success
    When On "workflow-designer" I can see column with "Draft" value
    * On "workflow-designer" I click on "edit" button for column with "Draft" value
    * I see "workflow/status/%UUID%general" page
    * I click tab with "Translations" text
    * I see "workflow/status/%UUID%/translations" page
    * I choose "[1]" option from "translation-language-select" multi select field
    * I can see "status-name_en_GB" input with the "Draft" term
    * I can see "status-name_en_GB" field as enabled
    * I can see "status-description_en_GB" textarea with the "Draft" term
    * I can see "status-description_en_GB" field as enabled
    * I can see "status-name_pl_PL" input with the "Szkic" term
    * I can see "status-name_pl_PL" field as enabled
    * I can see "status-description_pl_PL" textarea with the "Szkic" term
    * I can see "status-description_pl_PL" field as enabled
    Then I click back arrow
    * I see "workflow" page
