@other
Feature: PASSWORD: Password recovery
  This feature allows see password recovery

  Background:
    Given I open "" page
    * I click on "forgot-password" button

  @other
  Scenario: Password - check content
    When I can see "Password recovery" text on "login-header" element

  @error
  Scenario: Password - validation error (empty string)
    When I click on "submit" button
    * Element "password-recovery-form" is visible
    * I see a form validation error that says "['E-mail is required']"

  @error
  Scenario: Password - validation error (misc string)
    When I fill the "recovery-email" input with the "login" term
    * I click on "submit" button
    * Element "password-recovery-form" is visible
    * I see a form validation error that says "['This value is not a valid email address.']"

  @success
  Scenario: Password - success
    When I fill the "recovery-email" input with the "login@test.pl" term
    * I click on "submit" button
    * I can see "Check your e-mail" text on "login-header" element
    * I click on "submit" button
    * Element "login-form" is visible
