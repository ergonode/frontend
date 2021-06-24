@create
Feature: CREATE: Category tree
  This feature allows create category tree

  Background:
    Given I open "category-trees/grid" page
    When I click on "new-category-tree" button
    Then Element "modal" is visible

  @other
  Scenario: Close modal
    When I close modal
    Then Element "modal" not exist

  @success
  Scenario: Add category tree - success
    When I fill the "category-tree-code" input with the "category_tree" term
    * I click on "submit" button
    * I send a "POST" request and status code should be 201
    * I open "category-trees/grid" page
    Then On "grid" I can see row with "category_tree" value and columns data: "{'0': 'category_tree', '1': ''}"

  @success
  Scenario: Add category tree and go to edit - success
    When I fill the "category-tree-code" input with the "category_tree2" term
    * I click on "proceed" button
    * I send a "POST" request and status code should be 201
    * I see "category-trees/tree/%UUID%/general" page
    * Element "category-tree-code" is visible
    * Element "title-bar-header" is visible
    Then I can see "category-tree-code" input with the "category_tree2" term

  @error
  Scenario: Add category tree - duplication error
    When I fill the "category-tree-code" input with the "category_tree" term
    * I click on "submit" button
    * I send a "POST" request and status code should be 400
    * I see a form validation error that says "['Category tree code category_tree is not unique.']"
    Then I close modal

  @error
  Scenario: Add category tree - validation error (empty string)
    When I click on "submit" button
    * I send a "POST" request and status code should be 400
    * I see a form validation error that says "['Category tree system name is required']"
    Then I close modal

  @error
  Scenario: Add category tree- validation error (misc string)
    When I fill the "category-tree-code" input with the "@#$%()" term
    * I click on "submit" button
    * I send a "POST" request and status code should be 400
    * I see a form validation error that says "['System name can have only letters, digits or underscore symbol']"
    * I close modal
    Then On "grid" I can not see row with "@#$%()" value
