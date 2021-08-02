@update
Feature: UPDATE: Role
  This feature allows update role

  Background:
    Given I open "user-roles/grid" page

  @error
  Scenario: Update role from edit page - validation error (too long string)
    When On "grid" I can see row with "role_name2" value and columns data: "{'0': 'role_name2'}"
    * On "grid" I click on "edit" button for row with "role_name2" value
    * I see "user-roles/role/%UUID%/general" page
    * I fill the "role-name" input with the "role_name role_name role_name role_name role_name role_name role_name role_name role_name role_name role_name role_name " term
    * I fill the "role-description" textarea with the "role_description role_description role_description role_description" term
    * I "submit" the data and "update" is "incorrect"
    Then I see a form validation error that says "['Role name is too long. It should contain 100 characters or less.']"

  @success
  Scenario: Update role from edit page - success
    When On "grid" I can see row with "role_name" value and columns data: "{'0': 'role_name'}"
    * On "grid" I click on "edit" button for row with "role_name" value
    * I see "user-roles/role/%UUID%/general" page
    * I fill the "role-name" input with the "role_name_edit" term
    * I fill the "role-description" textarea with the "role_description_edit" term
    * I "submit" the data and "update" is "correct"
    * I click back arrow
    * I see "user-roles/grid" page
    Then On "grid" I can see row with "role_name_edit" value and columns data: "{'0': 'role_name_edit', '1': 'role_description_edit'}"

  @success
  Scenario: Update role privileges from edit page - success
    When On "grid" I can see row with "role_name2" value and columns data: "{'0': 'role_name2'}"
    * On "grid" I click on "edit" button for row with "role_name2" value
    * I see "user-roles/role/%UUID%/general" page
    * I click tab with "Privileges" text
    Then On "grid" I can see row with "Attribute" value and columns data: "{'0': false, '1': 'Attribute', '2': false, '3': false, '4': false, '5': false}"
    * On "grid" I edit "{'0': true}" fields for row with "Attribute" value
    * On "grid" I can see row with "Attribute" value and columns data: "{'0': true, '1': 'Attribute', '2': true, '3': true, '4': true, '5': true}"
    Then On "grid" I can see row with "Attribute group" value and columns data: "{'0': false, '1': 'Attribute group', '2': false, '3': false, '4': false, '5': false}"
    * On "grid" I edit "{'2': true}" fields for row with "Attribute group" value
    * On "grid" I can see row with "Attribute group" value and columns data: "{'0': true, '1': 'Attribute group', '2': true, '3': false, '4': true, '5': true}"
    Then On "grid" I can see row with "Category" value and columns data: "{'0': false, '1': 'Category', '2': false, '3': false, '4': false, '5': false}"
    * On "grid" I edit "{'3': true}" fields for row with "Category" value
    * On "grid" I can see row with "Category" value and columns data: "{'0': true, '1': 'Category', '2': false, '3': true, '4': true, '5': false}"
    Then On "grid" I can see row with "Category tree" value and columns data: "{'0': false, '1': 'Category tree', '2': false, '3': false, '4': false, '5': false}"
    * On "grid" I edit "{'4': true}" fields for row with "Category tree" value
    * On "grid" I can see row with "Category tree" value and columns data: "{'0': true, '1': 'Category tree', '2': false, '3': false, '4': true, '5': false}"
    Then On "grid" I can see row with "Channel" value and columns data: "{'0': false, '1': 'Channel', '2': false, '3': false, '4': false, '5': false}"
    * On "grid" I edit "{'5': true}" fields for row with "Channel" value
    * On "grid" I can see row with "Channel" value and columns data: "{'0': true, '1': 'Channel', '2': false, '3': false, '4': true, '5': true}"
    * I "submit" the data and "update" is "correct"
