@read
Feature: READ: Attribute groups
  This feature allows read attribute groups

  Background:
    Given I open "attribute-groups/grid" page

  @success
  Scenario: Read attribute groups on grid - success
    When I can see "Attribute Group" text on "title-bar-header" element
    * On "grid" I can see row with "text_attribute_group" value and columns data: "{'0': 'text_attribute_group', '1': '', '2': '0'}"
    * On "grid" I can see row with "text_attribute_group2" value and columns data: "{'0': 'text_attribute_group2', '1': '', '2': '0'}"

  @success
  Scenario: Read attribute group general - success
    When On "grid" I can see row with "text_attribute_group" value and columns data: "{'0': 'text_attribute_group', '1': '', '2': '0'}"
    * On "grid" I click on "edit" button for row with "text_attribute_group" value
    * I see "attribute-groups/group/%UUID%/general" page
    * Element "title-bar-header" is visible
    * I can see "text_attribute_group" text on "title-bar-header" element
    * Element "attribute-group-code" is visible
    * I can see "attribute-group-code" input with the "text_attribute_group" term
    * I can see "attribute-group-code" field as disabled
    Then I click back arrow
    * I see "attribute-groups/grid" page

  @success
  Scenario: Read attribute group translation - success
    When On "grid" I can see row with "text_attribute_group" value and columns data: "{'0': 'text_attribute_group', '1': '', '2': '0'}"
    * On "grid" I click on "edit" button for row with "text_attribute_group" value
    * I see "attribute-groups/group/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "attribute-groups/group/%UUID%/translations" page
    * I choose "[1]" option from "translation-language-select" multi select field
    * I can see "attribute-group-name_en_GB" input with the "" term
    * I can see "attribute-group-name_en_GB" field as enabled
    * I can see "attribute-group-name_pl_PL" input with the "" term
    * I can see "attribute-group-name_pl_PL" field as enabled
    Then I click back arrow
    * I see "attribute-groups/grid" page
