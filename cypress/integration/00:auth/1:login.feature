@other
Feature: LOGIN: Login user
  This feature allows login user

  Background:
    Given I open "" page

  @other
  Scenario: Login user - validation error (misc string)
    When I fill the "login-pass" input with the "password" term
    * I click "show-password" check
    * On "login-pass" input I can see "password" term

  @error
  Scenario: Login user - validation error (misc string)
    When I fill the "login-email" input with the "login" term
    * I fill the "login-pass" input with the "password" term
    * I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['Invalid credentials.']"

  @error
  Scenario: Login user - validation error (empty string)
    When I click on "submit" button
    * I see a form validation error that says "['E-mail is required','Password is required']"

  @success
  Scenario: Login user - success
    When On login page I fill the "login-email" input with the "adminEmail" term
    * On login page I fill the "login-pass" input with the "adminPass" term
    * I "submit" the data and "create" is "correct"
    * I see "/dashboard" page
    Then I am logout
