@create
Feature: CREATE: Unit
  This feature allows create unit

  Background:
    Given I open "settings/units" page
    When I click on "new-unit" button
    Then Element "modal" is visible

  @success
  Scenario: Add unit - success
    When I fill the "unit-name" input with the "custom_unit" term
    * I fill the "unit-symbol" input with the "cu" term
    * On "modal" I "submit" the data and "create" is "correct"
    Then On "grid" I can see row with "custom_unit" value and columns data: "{'0': 'custom_unit', '1': 'cu'}"

  @success
  Scenario: Add unit and go to edit - success
    When I fill the "unit-name" input with the "custom_unit_2" term
    * I fill the "unit-symbol" input with the "cu2" term
    * On "modal" I "proceed" the data and "create" is "correct"
    * I see "settings/units/unit/%UUID%/general" page
    Then I can see "unit-name" input with the "custom_unit_2" term
    * I can see "unit-symbol" input with the "cu2" term
    * I can see "custom_unit_2" text on "title-bar-header" element

  @error
  Scenario: Add unit - duplication error
    When I fill the "unit-name" input with the "custom_unit_2" term
    * I fill the "unit-symbol" input with the "cu2" term
    * On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['The unit name should be unique.', 'The unit symbol should be unique.']"
    Then I close modal

  @error
  Scenario: Add unit - validation error (empty string)
    When On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['The unit name should not be empty.', 'The unit symbol should not be empty.']"
    Then I close modal
