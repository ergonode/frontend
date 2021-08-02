@read
Feature: READ: Roles
  This feature allows read roles

  Background:
    Given I open "user-roles/grid" page

  @success
  Scenario: Read roles on grid - success
    When I can see "User roles" text on "title-bar-header" element
    * On "grid" I can see row with "Admin" value and columns data: "{'0': 'Admin'}"
    * On "grid" I can see row with "Data inputer" value and columns data: "{'0': 'Data inputer'}"
    * On "grid" I can see row with "Category manager" value and columns data: "{'0': 'Category manager'}"

  @success
  Scenario: Read role general - success
    When On "grid" I can see row with "Admin" value and columns data: "{'0': 'Admin'}"
    * On "grid" I click on "edit" button for row with "Admin" value
    * I see "user-roles/role/%UUID%/general" page
    * Element "title-bar-header" is visible
    * I can see "Admin" text on "title-bar-header" element
    * Element "role-name" is visible
    * I can see "role-name" input with the "Admin" term
    * I can see "role-name" field as enabled
    * I can see "role-description" textarea with the "Manages Ergonode system, manages access to all permissions for other users." term
    * I can see "role-description" field as enabled
    Then I click back arrow
    * I see "user-roles/grid" page

  @success
  Scenario: Read role privileges - success
    When On "grid" I can see row with "Data inputer" value and columns data: "{'0': 'Data inputer'}"
    * On "grid" I click on "edit" button for row with "Data inputer" value
    * I see "user-roles/role/%UUID%/general" page
    * I click tab with "Privileges" text
    Then On "grid" I can see row with "Attribute" value and columns data: "{'0': true, '1': 'Attribute', '2': true, '3': true, '4': true, '5': true}"
    * On "grid" I can see row with "Attribute group" value and columns data: "{'0': true, '1': 'Attribute group', '2': true, '3': true, '4': true, '5': true}"
    * On "grid" I can see row with "Category" value and columns data: "{'0': true, '1': 'Category', '2': true, '3': false, '4': true, '5': true}"
    * On "grid" I can see row with "Category tree" value and columns data: "{'0': true, '1': 'Category tree', '2': false, '3': false, '4': true, '5': true}"
    * On "grid" I can see row with "Channel" value and columns data: "{'0': false, '1': 'Channel', '2': false, '3': false, '4': false, '5': false}"
    * On "grid" I can see row with "Import" value and columns data: "{'0': true, '1': 'Import', '2': true, '3': true, '4': true, '5': true}"
    * On "grid" I can see row with "Multimedia" value and columns data: "{'0': true, '1': 'Multimedia', '2': true, '3': false, '4': true, '5': true}"
