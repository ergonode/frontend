@create
Feature: CREATE: Attribute groups
  This feature allows create attribute groups

  Background:
    Given I open "attribute-groups/grid" page
    When I click on "new-attribute-group" button
    Then Element "modal" is visible

  @success
  Scenario Outline: Add attribute group - success
    When I fill the "attribute-group-code" input with the "<name>" term
    * On "modal" I "submit" the data and "create" is "correct"
    Then On "grid" I can see row with "<name>" value and columns data: "{'0': '<name>', '2': '0'}"

    Examples:
      | name                  |
      | text_attribute_group  |
      | text_attribute_group2 |
      | text_attribute_group3 |

  @success
  Scenario: Add attribute group and go to edit - success
    When I fill the "attribute-group-code" input with the "text_attribute_group4" term
    * On "modal" I "proceed" the data and "create" is "correct"
    * I see "attribute-groups/group/%UUID%/general" page
    * Element "attribute-group-code" is visible
    * Element "title-bar-header" is visible
    Then I can see "attribute-group-code" input with the "text_attribute_group4" term

  @error
  Scenario: Add attribute group - duplication error
    When I fill the "attribute-group-code" input with the "text_attribute_group" term
    * On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['The value is not unique.']"
    Then I close modal

  @error
  Scenario: Add attribute group - validation error (empty string)
    When On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['System name is required']"
    Then I close modal

  @error
  Scenario: Add attribute group - validation error (misc string)
    When I fill the "attribute-group-code" input with the "@#$%()" term
    * On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['System name can have only letters, digits or underscore symbol']"
    * I close modal
    Then On "grid" I can not see row with "@#$%()" value
