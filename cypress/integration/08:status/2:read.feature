@read
Feature: READ: Status
  This feature allows read status

  Background:
    Given I open "product-statuses/grid" page

  @success
  Scenario: Read statuses on grid - success
    When I can see "Product statuses" text on "title-bar-header" element
    * On "grid" I can see row with "status_code_test" value and columns data: "{'0': 'status_code_test', '2': '', '3': ''}"
    * On "grid" I can see row with "status_code_test2" value and columns data: "{'0': 'status_code_test2', '2': '', '3': ''}"

  @success
  Scenario: Read status general - success
    When On "grid" I can see row with "status_code_test" value and columns data: "{'0': 'status_code_test', '2': '', '3': ''}"
    * On "grid" I click on "edit" button for row with "status_code_test" value
    * I see "product-statuses/status/%UUID%/general" page
    * Element "title-bar-header" is visible
    * I can see "status_code_test" text on "title-bar-header" element
    * Element "status-code" is visible
    * I can see "status-code" input with the "status_code_test" term
    * I can see "status-code" field as disabled
    Then I click back arrow
    * I see "product-statuses/grid" page

  @success
  Scenario: Read status translation - success
    When On "grid" I can see row with "status_code_test" value and columns data: "{'0': 'status_code_test', '2': '', '3': ''}"
    * On "grid" I click on "edit" button for row with "status_code_test" value
    * I see "product-statuses/status/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "product-statuses/status/%UUID%/translations" page
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
    * I see "product-statuses/grid" page
