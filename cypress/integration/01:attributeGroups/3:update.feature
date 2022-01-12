@update
Feature: UPDATE: Attribute groups
  This feature allows update attribute groups

  Background:
    Given I open "attribute-groups/grid" page

  @error
  Scenario: Update attribute group from edit page - validation error (too long string)
    When On "grid" I can see row with "text_attribute_group" value and columns data: "{'0': 'text_attribute_group', '1': '', '2': '0'}"
    * On "grid" I click on "edit" button for row with "text_attribute_group" value
    * I see "attribute-groups/group/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "attribute-groups/group/%UUID%/translations" page
    * I fill the "attribute-group-name" input with the "attribute_group_attribute_group_attribute_group_attribute_group_attribute_group_attribute_group_attribute_group_attribute_group_attribute_group_attribute_group_" term for "en_GB" translation
    * I "submit" the data and "update" is "incorrect"
    Then I see a form validation error that says "['Attribute group name is too long. It should contain 128 characters or less.']"

  @success
  Scenario: Update attribute group from edit page - success
    When On "grid" I can see row with "text_attribute_group" value and columns data: "{'0': 'text_attribute_group', '1': '', '2': '0'}"
    * On "grid" I click on "edit" button for row with "text_attribute_group" value
    * I see "attribute-groups/group/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "attribute-groups/group/%UUID%/translations" page
    * I choose "[1]" option from "translation-language-select" multi select field
    * I fill the "attribute-group-name" input with the "attribute_group_EN" term for "en_GB" translation
    * I fill the "attribute-group-name" input with the "attribute_group_PL" term for "pl_PL" translation
    * I "submit" the data and "update" is "correct"
    * I click back arrow
    * I see "attribute-groups/grid" page
    Then On "grid" I can see row with "text_attribute_group" value and columns data: "{'0': 'text_attribute_group', '1': 'attribute_group_EN', '2': '0'}"
