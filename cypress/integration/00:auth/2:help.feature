@other
Feature: HELP: Help page
  This feature allows see help page

  Background:
    Given I open "" page
    * I click on "help-button" button

  @other
  Scenario: Help - check content
    When I can see "Help" text on "login-header" element

  @other
  Scenario: Help - go back to login page
    When I can see "Help" text on "login-header" element
    * I click on "submit" button
    * Element "login-form" is visible

  @other
  Scenario: Help - change language
    When I can see "Help" text on "login-header" element
    * I choose "Polish" option from "change-language" select field
    * I can see "Pomoc" text on "login-header" element
