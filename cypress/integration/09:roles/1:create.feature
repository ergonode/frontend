@create
Feature: CREATE: Role
  This feature allows create role

  Background:
    Given I open "user-roles/grid" page
    When I click on "new-role" button
    Then Element "modal" is visible

  @success
  Scenario: Add role - success
    When I fill the "role-name" input with the "role_name" term
    * I fill the "role-description" textarea with the "role_description" term
    * On "modal" I "submit" the data and "create" is "correct"
    Then On "grid" I can see row with "role_name" value and columns data: "{'0': 'role_name', '1': 'role_description', '2': '0'}"

  @success
  Scenario: Add role and go to edit - success
    When I fill the "role-name" input with the "role_name2" term
    * I fill the "role-description" textarea with the "role_description2" term
    * On "modal" I "proceed" the data and "create" is "correct"
    * I see "user-roles/role/%UUID%/general" page
    * Element "role-name" is visible
    * Element "title-bar-header" is visible
    Then I can see "role-name" input with the "role_name2" term
    * I can see "role-description" textarea with the "role_description2" term

  @error
  Scenario: Add role - duplication error
    When I fill the "role-name" input with the "role_name" term
    * On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['The role name should be unique.']"
    Then I close modal

  @error
  Scenario: Add role - validation error (empty string)
    When On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['Role name is required']"
    Then I close modal
