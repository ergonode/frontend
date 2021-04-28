@delete
Feature: DELETE: User
  This feature allows delete user

  Background:
    Given I open "users/grid" page

  @success
  Scenario: No delete action on grid - success
    When On "grid" I can see row with "admin@ergonode.com" value and columns data: "{'0': 'admin@ergonode.com'}"
    * On "grid" for a row with value "admin@ergonode.com", there is no "delete" button


  @success
  Scenario: Delete user from edit page - success
    When On "grid" I can see row with "admin@ergonode.com" value and columns data: "{'0': 'admin@ergonode.com'}"
    * On "grid" I click on "edit" button for row with "admin@ergonode.com" value
    * I see "users/user/%UUID%/general" page
    * Element "title-bar-header" is visible
    * Element "user-email" is visible
    * I can see "user-email" input with the "admin@ergonode.com" term
    * I can see "user-email" field as disabled
    * Element "delete-role" not exist
    Then I click back arrow
    * I see "users/grid" page
