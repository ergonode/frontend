@create
Feature: CREATE: Category
  This feature allows create category

  Background:
    Given I open "categories/grid" page
    When I click on "new-category" button
    Then Element "modal" is visible

  @success
  Scenario: Add category - success
    When I fill the "category-code" input with the "text_category" term
    * On "modal" I "submit" the data and "create" is "correct"
    Then On "grid" I can see row with "text_category" value and columns data: "{'1': 'text_category', '3': '0'}"

  @success
  Scenario: Add category and go to edit - success
    When I fill the "category-code" input with the "text_category2" term
    * On "modal" I "proceed" the data and "create" is "correct"
    * I see "categories/category/%UUID%/general" page
    * Element "category-code" is visible
    * Element "title-bar-header" is visible
    Then I can see "category-code" input with the "text_category2" term

  @error
  Scenario: Add category - duplication error
    When I fill the "category-code" input with the "text_category" term
    * On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['The category code is not unique.']"
    Then I close modal

  @error
  Scenario: Add category - validation error (empty string)
    When On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['System name is required']"
    Then I close modal

  @error
  Scenario: Add category - validation error (misc string)
    When I fill the "category-code" input with the "@#$%()" term
    * On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['System name can have only letters, digits or underscore symbol']"
    * I close modal
    Then On "grid" I can not see row with "@#$%()" value
