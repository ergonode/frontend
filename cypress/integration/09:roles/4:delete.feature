@delete
Feature: DELETE: Role
  This feature allows delete role

  Background:
    Given I open "user-roles/grid" page

  @other
  Scenario: Delete role by grid button - give up
    When On "grid" I can see row with "Admin" value and columns data: "{'0': 'Admin'}"
    * On "grid" I click on "delete" button for row with "Admin" value
    * Element "modal" is visible
    * I close modal by button
    Then Element "modal" not exist

  @other
  Scenario: Delete role from edit page - give up
    When On "grid" I can see row with "Admin" value and columns data: "{'0': 'Admin'}"
    * On "grid" I click on "edit" button for row with "Admin" value
    * I see "user-roles/role/%UUID%/general" page
    * Element "role-name" is visible
    * Element "title-bar-header" is visible
    * I can see "role-name" input with the "Admin" term
    * I can see "role-name" field as enabled
    * I click on "delete-role" button
    * I close modal
    Then I see "user-roles/role/%UUID%/general" page

  @error
  Scenario: Delete role by grid button - error
    When On "grid" I can see row with "Admin" value and columns data: "{'0': 'Admin'}"
    * On "grid" I click on "delete" button for row with "Admin" value
    * I confirm modal
    Then On "grid" I can see row with "Admin" value and columns data: "{'0': 'Admin'}"

  @success
  Scenario: Delete role by grid button - success
    When On "grid" I can see row with "Data inputer" value and columns data: "{'0': 'Data inputer'}"
    * On "grid" I click on "delete" button for row with "Data inputer" value
    * I confirm modal
    Then On "grid" I can not see row with "Data inputer" value

  @success
  Scenario: Delete role from edit page - success
    When On "grid" I can see row with "Category manager" value and columns data: "{'0': 'Category manager'}"
    * On "grid" I click on "edit" button for row with "Category manager" value
    * I see "user-roles/role/%UUID%/general" page
    * Element "role-name" is visible
    * Element "title-bar-header" is visible
    * I can see "role-name" input with the "Category manager" term
    * I can see "role-name" field as enabled
    * I click on "delete-role" button
    * I confirm modal
    Then I see "user-roles/grid" page
