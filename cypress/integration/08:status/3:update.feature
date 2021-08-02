@update
Feature: UPDATE: Status
  This feature allows update status

  Background:
    Given I open "product-statuses/grid" page

  @error
  Scenario: Update status from edit page - validation error (too long string)
    When On "grid" I can see row with "status_code_test" value and columns data: "{'0': 'status_code_test', '2': '', '3': ''}"
    * On "grid" I click on "edit" button for row with "status_code_test" value
    * I see "product-statuses/status/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "product-statuses/status/%UUID%/translations" page
    * I fill the "status-name" input with the "status_status_status_status_status_status_status_status_status_status_status_status_status_status_status_status_" term for "en_GB" translation
    * I "submit" the data and "update" is "incorrect"
    Then I see a form validation error that says "['Status name is too long. It should contain 100 characters or less.']"

  @success
  Scenario: Update status from edit page - success
    When On "grid" I can see row with "status_code_test" value and columns data: "{'0': 'status_code_test', '2': '', '3': ''}"
    * On "grid" I click on "edit" button for row with "status_code_test" value
    * I see "product-statuses/status/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "product-statuses/status/%UUID%/translations" page
    * I choose "[1]" option from "translation-language-select" multi select field
    * I fill the "status-name" input with the "status_EN" term for "en_GB" translation
    * I fill the "status-description" textarea with the "status_desc_EN" term for "en_GB" translation
    * I fill the "status-name" input with the "status_PL" term for "pl_PL" translation
    * I fill the "status-description" textarea with the "status_desc_PL" term for "pl_PL" translation
    * I "submit" the data and "update" is "correct"
    * I click back arrow
    * I see "product-statuses/grid" page
    Then On "grid" I can see row with "status_code_test" value and columns data: "{'0': 'status_code_test', '2': 'status_EN', '3': 'status_desc_EN'}"
