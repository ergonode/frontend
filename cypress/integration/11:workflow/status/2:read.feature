@read
Feature: READ: Status on workflow
  This feature allows read status on workflow

  Background:
    Given I open "workflow/designer" page

  @success
  Scenario: Read statuses on designer - success
    When I can see "Statuses & transitions" text on "title-bar-header" element
    * On "workflow-designer" I can see column with "status_code" value
    * On "workflow-designer" I can see column with "status_code2" value

  @success
  Scenario: Read status general - success
    When On "workflow-designer" I can see column with "status_code" value
    * On "workflow-designer" I click on "edit" button for column with "status_code" value
    * I see "workflow/status/%UUID%/general" page
    * Element "title-bar-header" is visible
    * I can see "status_code" text on "title-bar-header" element
    * Element "status-code" is visible
    * I can see "status-code" input with the "status_code" term
    * I can see "status-code" field as disabled
    Then I click back arrow
    * I see "workflow/designer" page

  @success
  Scenario: Read status translation - success
    When On "workflow-designer" I can see column with "status_code" value
    * On "workflow-designer" I click on "edit" button for column with "status_code" value
    * I see "workflow/status/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "workflow/status/%UUID%/translations" page
    * I choose "[1]" option from "translation-language-select" multi select field
    * I can see "status-name_en_GB" input with the "" term
    * I can see "status-name_en_GB" field as enabled
    * I can see "status-description_en_GB" textarea with the "" term
    * I can see "status-description_en_GB" field as enabled
    * I can see "status-name_pl_PL" input with the "" term
    * I can see "status-name_pl_PL" field as enabled
      * I can see "status-description_pl_PL" textarea with the "" term
    * I can see "status-description_pl_PL" field as enabled
    Then I click back arrow
    * I see "workflow/designer" page
