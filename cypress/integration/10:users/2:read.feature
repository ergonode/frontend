@read
Feature: READ: Users
  This feature allows read users

  Background:
    Given I open "users/grid" page

  @success
  Scenario: Read users on grid - success
    When I can see "Users" text on "title-bar-header" element
    * On "grid" I can see row with "admin@ergonode.com" value and columns data: "{'0': 'admin@ergonode.com', '1': 'Dave', '2': 'Admin', '3': '', '4': 'Admin'}"

  @success
  Scenario: Read user general - success
    When On "grid" I can see row with "admin@ergonode.com" value and columns data: "{'0': 'admin@ergonode.com'}"
    * On "grid" I click on "edit" button for row with "admin@ergonode.com" value
    * I see "users/user/%UUID%/general" page
    * Element "title-bar-header" is visible
    * I can see "Dave Admin" text on "title-bar-header" element
    * Element "user-email" is visible
    * I can see "user-email" input with the "admin@ergonode.com" term
    * I can see "user-email" field as disabled
    * I can see "user-firstName" input with the "Dave" term
    * I can see "user-firstName" field as enabled
    * I can see "user-lastName" input with the "Admin" term
    * I can see "user-lastName" field as enabled
    * I can see "user-password" input with the "" term
    * I can see "user-password" field as enabled
    * I can see "user-passwordRepeat" input with the "" term
    * I can see "user-passwordRepeat" field as enabled
    * I can see "user-language" select with the "English (United Kingdom)" term
    * I can see "user-language" field as enabled
    * I can see "user-isActive" checkbox with the "true" value
    * I can see "user-isActive" field as enabled
    Then I click back arrow
    * I see "users/grid" page

  @success
  Scenario: Read role languages restrictions - success
    When On "grid" I can see row with "admin@ergonode.com" value and columns data: "{'0': 'admin@ergonode.com'}"
    * On "grid" I click on "edit" button for row with "admin@ergonode.com" value
    * I see "users/user/%UUID%/general" page
    * I click tab with "Language restrictions" text
    Then On "grid" I can see row with "English (United Kingdom)" value and columns data: "{'0': true, '1': 'English (United Kingdom)', '2': true, '3': true}"
    * On "grid" I can see row with "Polish (Poland)" value and columns data: "{'0': true, '1': 'Polish (Poland)', '2': true, '3': true}"
