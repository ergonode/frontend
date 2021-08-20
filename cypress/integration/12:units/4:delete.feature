@delete
Feature: DELETE: Unit
  This feature allows delete unit

  Background:
    Given I open "settings/units" page

  @other
  Scenario: Delete unit by grid button - give up
    When On "grid" I can see row with "custom_unit" value and columns data: "{'0': 'custom_unit', '1': 'cu'}"
    * On "grid" I click on "delete" button for row with "custom_unit" value
    * Element "modal" is visible
    * I close modal by button
    Then Element "modal" not exist

  @other
  Scenario: Delete unit from edit page - give up
    When On "grid" I can see row with "custom_unit" value and columns data: "{'0': 'custom_unit', '1': 'cu'}"
    * On "grid" I click on "edit" button for row with "custom_unit" value
    * I see "settings/units/unit/%UUID%/general" page
    * I can see "unit-name" input with the "custom_unit" term
    * I can see "unit-symbol" input with the "cu" term
    * I click on "delete-unit" button
    * I close modal
    Then I see "settings/units/unit/%UUID%/general" page

  @success
  Scenario: Delete unit by grid button - success
    When On "grid" I can see row with "custom_unit" value and columns data: "{'0': 'custom_unit', '1': 'cu'}"
    * On "grid" I click on "delete" button for row with "custom_unit" value
    * I confirm modal
    Then On "grid" I can not see row with "custom_unit2" value

  @success
  Scenario: Delete unit from edit page - success
    When On "grid" I can see row with "custom_unit_2" value and columns data: "{'0': 'custom_unit_2', '1': 'cu2'}"
    * On "grid" I click on "edit" button for row with "custom_unit_2" value
    * I see "settings/units/unit/%UUID%/general" page
    * I can see "unit-name" input with the "custom_unit_2" term
    * I can see "unit-symbol" input with the "cu2" term
    * I click on "delete-unit" button
    * I confirm modal
    * I see "settings/units" page
    Then On "grid" I can not see row with "custom_unit_2" value
