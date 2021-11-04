@create
Feature: CREATE: User
  This feature allows create user

  Background:
    Given I open "users/grid" page
    When I click on "new-user" button
    Then Element "modal" is visible

  @success
  Scenario: Add user - success
    When I fill the "user-email" input with the "user@email.com" term
    * I fill the "user-firstName" input with the "User" term
    * I fill the "user-lastName" input with the "Email" term
    * I fill the "user-password" input with the "UserEmail123" term
    * I fill the "user-passwordRepeat" input with the "UserEmail123" term
    * I choose "Arabic (Egypt)" option from "user-language" select field
    * I choose "Admin" option from "user-role" select field
    * On "modal" I "submit" the data and "create" is "correct"
    Then On "grid" I can see row with "user@email.com" value and columns data: "{'0': 'user@email.com', '1': 'User', '2': 'Email'}"

  @success
  Scenario: Add user and go to edit - success
    When I fill the "user-email" input with the "user2@email.com" term
    * I fill the "user-firstName" input with the "User2" term
    * I fill the "user-lastName" input with the "Email2" term
    * I fill the "user-password" input with the "UserEmail123" term
    * I fill the "user-passwordRepeat" input with the "UserEmail123" term
    * I choose "Arabic (Egypt)" option from "user-language" select field
    * I choose "Admin" option from "user-role" select field
    * On "modal" I "proceed" the data and "create" is "correct"
    * I see "users/user/%UUID%/general" page
    * Element "title-bar-header" is visible
    * Element "user-email" is visible
    * I can see "user-email" input with the "user2@email.com" term
    * I can see "user-email" field as disabled
    * I can see "user-firstName" input with the "User2" term
    * I can see "user-firstName" field as enabled
    * I can see "user-lastName" input with the "Email2" term
    * I can see "user-lastName" field as enabled
    * I can see "user-password" input with the "" term
    * I can see "user-password" field as enabled
    * I can see "user-passwordRepeat" input with the "" term
    * I can see "user-passwordRepeat" field as enabled
    * I can see "user-language" select with the "Arabic (Egypt)" term
    * I can see "user-language" field as enabled
    * I can see "user-role" select with the "Admin" term
    * I can see "user-role" field as enabled
    * I can see "user-isActive" checkbox with the "true" value
    * I can see "user-isActive" field as enabled

  @error
  Scenario: Add user - duplication error
    When I fill the "user-email" input with the "admin@ergonode.com" term
    * I fill the "user-firstName" input with the "Admin" term
    * I fill the "user-lastName" input with the "Ergo" term
    * I fill the "user-password" input with the "UserEmail123" term
    * I fill the "user-passwordRepeat" input with the "UserEmail123" term
    * I choose "Arabic (Egypt)" option from "user-language" select field
    * I choose "Admin" option from "user-role" select field
    * On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['User admin@ergonode.com already exists.']"
    Then I close modal

  @error
  Scenario: Add user - validation error (too short string and wrong email)
    When I fill the "user-email" input with the "test" term
    * I fill the "user-firstName" input with the "Admin" term
    * I fill the "user-lastName" input with the "Ergo" term
    * I fill the "user-password" input with the "UserEmail123" term
    * I fill the "user-passwordRepeat" input with the "UserEmail123" term
    * I choose "Arabic (Egypt)" option from "user-language" select field
    * I choose "Admin" option from "user-role" select field
    * On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['This value is not a valid email address. User email is too short. It should have at least 5 characters.']"
    Then I close modal

  @error
  Scenario: Add user - validation error (empty string)
    When On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['User first name is required', 'User last name is required', 'User email is required', 'User password is required', 'User password repeat is required', 'User language is required', 'Role Id is required']"
    Then I close modal
