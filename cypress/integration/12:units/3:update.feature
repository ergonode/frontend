@update
Feature: UPDATE: Unit
  This feature allows update unit

  Background:
    Given I open "settings/units" page

  @error
  Scenario: Update unit from edit page - validation error (too long string)
    When On "grid" I can see row with "custom_unit" value and columns data: "{'0': 'custom_unit', '1': 'cu'}"
    * On "grid" I click on "edit" button for row with "custom_unit" value
    * I see "settings/units/unit/%UUID%/general" page
    * I fill the "unit-name" input with the "custom_unit_3_custom_unit_3_custom_unit_3_custom_unit_3_custom_unit_3_custom_unit_3_custom_unit_3_custom_unit_3_custom_unit_3custom_unit_3_custom_unit_3_custom_unit_3_custom_unit_3_custom_unit_3_custom_unit_3_custom_unit_3_custom_unit_3_custom_unit_3custom_unit_3_custom_unit_3_custom_unit_3_custom_unit_3_custom_unit_3_custom_unit_3_custom_unit_3_custom_unit_3_custom_unit_3" term
    * I fill the "unit-symbol" input with the "cu3cu3cu3cu3cu3cu3cu3cu3cu3cu3cu3cu3cu3cu3cu3" term
    * I "submit" the data and "update" is "incorrect"
    * I click back arrow
    * I see "settings/units" page
    Then I see a form validation error that says "['Unit name is too long. It should contain 255 characters or less.', 'Unit symbol is too long. It should contain 16 characters or less.']"

#  FIXME: Doesnt wait for getDictionary

#  @success
#  Scenario: Update unit from edit page - success
#    When On "grid" I can see row with "custom_unit" value and columns data: "{'0': 'custom_unit', '1': 'cu'}"
#    * On "grid" I click on "edit" button for row with "custom_unit" value
#    * I see "settings/units/unit/%UUID%/general" page
#    * I fill the "unit-name" input with the "custom_unit_3" term
#    * I fill the "unit-symbol" input with the "cu3" term
#    * I "submit" the data and "update" is "correct"
#    * I click back arrow
#    * I see "settings/units" page
#    Then On "grid" I can see row with "custom_unit_3" value and columns data: "{'0': 'custom_unit_3', '1': 'cu3'}"
