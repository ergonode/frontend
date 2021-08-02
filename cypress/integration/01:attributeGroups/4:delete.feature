@delete
Feature: DELETE: Attribute groups
  This feature allows delete attribute groups

  Background:
    Given I open "attribute-groups/grid" page

  @other
  Scenario: Delete attribute group by grid button - give up
    When On "grid" I can see row with "text_attribute_group" value and columns data: "{'0': 'text_attribute_group', '2': '0'}"
    * On "grid" I click on "delete" button for row with "text_attribute_group" value
    * Element "modal" is visible
    * I close modal by button
    Then Element "modal" not exist

  @other
  Scenario: Delete attribute group from edit page - give up
    When On "grid" I can see row with "text_attribute_group2" value and columns data: "{'0': 'text_attribute_group2', '2': '0'}"
    * On "grid" I click on "edit" button for row with "text_attribute_group2" value
    * I see "attribute-groups/group/%UUID%/general" page
    * Element "attribute-group-code" is visible
    * Element "title-bar-header" is visible
    * I can see "attribute-group-code" input with the "text_attribute_group2" term
    * I can see "attribute-group-code" field as disabled
    * I click on "delete-attribute-group" button
    * I close modal
    Then I see "attribute-groups/group/%UUID%/general" page

  @success
  Scenario: Delete attribute group by grid button - success
    When On "grid" I can see row with "text_attribute_group" value and columns data: "{'0': 'text_attribute_group', '2': '0'}"
    * On "grid" I click on "delete" button for row with "text_attribute_group" value
    * I confirm modal
    Then On "grid" I can not see row with "text_attribute_group" value

  @success
  Scenario: Delete attribute group from edit page - success
    When On "grid" I can see row with "text_attribute_group2" value and columns data: "{'0': 'text_attribute_group2', '2': '0'}"
    * On "grid" I click on "edit" button for row with "text_attribute_group2" value
    * I see "attribute-groups/group/%UUID%/general" page
    * Element "attribute-group-code" is visible
    * Element "title-bar-header" is visible
    * I can see "attribute-group-code" input with the "text_attribute_group2" term
    * I can see "attribute-group-code" field as disabled
    * I click on "delete-attribute-group" button
    * I confirm modal
    Then I see "attribute-groups/grid" page
