@read
Feature: READ: units
  This feature allows read units

  Background:
    Given I open "settings/units" page

  @success
  Scenario: Read units on grid - success
    When I can see "Settings" text on "title-bar-header" element
    * On "grid" I can see row with "custom_unit" value and columns data: "{'0': 'custom_unit', '1': 'cu'}"
    * On "grid" I can see row with "custom_unit_2" value and columns data: "{'0': 'custom_unit_2', '1': 'cu2'}"

  @success
  Scenario: Read units general - success
    When On "grid" I can see row with "custom_unit" value and columns data: "{'0': 'custom_unit', '1': 'cu'}"
    * On "grid" I click on "edit" button for row with "custom_unit" value
    * I see "settings/units/unit/%UUID%/general" page
    * I can see "custom_unit" text on "title-bar-header" element
    * I can see "unit-name" input with the "custom_unit" term
    * I can see "unit-symbol" input with the "cu" term
    Then I click back arrow
    * I see "settings/units" page
