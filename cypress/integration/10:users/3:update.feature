@update
Feature: UPDATE: User
  This feature allows update user

  Background:
    Given I open "users/grid" page

  @error
  Scenario: Update user from edit page - validation error (wrong password)
    When On "grid" I can see row with "admin@ergonode.com" value and columns data: "{'0': 'admin@ergonode.com'}"
    * On "grid" I click on "edit" button for row with "admin@ergonode.com" value
    * I see "users/user/%UUID%/general" page
    Then I fill the "user-firstName" input with the "Johnny" term
    * I fill the "user-lastName" input with the "Bravo" term
    * I fill the "user-password" input with the "User1" term
    * I fill the "user-passwordRepeat" input with the "User2" term
    * I "submit" the data and "update" is "incorrect"
    Then I see a form validation error that says "['Password and password repeat must be identical', 'User password is too short. It should have at least 6 characters.', 'This value should be the same as password']"

  @success
  Scenario: Update user from edit page - success
    When On "grid" I can see row with "admin@ergonode.com" value and columns data: "{'0': 'admin@ergonode.com'}"
    * On "grid" I click on "edit" button for row with "admin@ergonode.com" value
    * I see "users/user/%UUID%/general" page
    Then I fill the "user-firstName" input with the "Johnny" term
    * I fill the "user-lastName" input with the "Bravo" term
    * I fill the "user-password" input with the "UserEmail123" term
    * I fill the "user-passwordRepeat" input with the "UserEmail123" term
    * I choose "Arabic (Egypt)" option from "user-language" select field
    * I "submit" the data and "update" is "correct"
    * I click back arrow
    * I see "users/grid" page
    Then On "grid" I can see row with "admin@ergonode.com" value and columns data: "{'0': 'admin@ergonode.com', '1': 'Johnny', '2': 'Bravo'}"

  @success
  Scenario: Update user language from edit page - success
    When On "grid" I can see row with "admin@ergonode.com" value and columns data: "{'0': 'admin@ergonode.com'}"
    * On "grid" I click on "edit" button for row with "admin@ergonode.com" value
    * I see "users/user/%UUID%/general" page
    * I click tab with "Language restrictions" text
    Then On "grid" I can see row with "English (United Kingdom)" value and columns data: "{'0': true, '1': 'English (United Kingdom)', '2': true, '3': true}"
    * On "grid" I can see row with "Polish (Poland)" value and columns data: "{'0': true, '1': 'Polish (Poland)', '2': true, '3': true}"
    * On "grid" I edit "{'0': false}" fields for row with "Polish (Poland)" value
    * On "grid" I can see row with "Polish (Poland)" value and columns data: "{'0': false, '1': 'Polish (Poland)', '2': false, '3': false}"
    * I "submit" the data and "update" is "correct"
