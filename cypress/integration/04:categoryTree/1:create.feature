@create
Feature: CREATE: Category tree
  This feature allows create category tree

  Background:
    Given I open "category-trees/grid" page
    When I click on "new-category-tree" button
    Then Element "modal" is visible

  @success
  Scenario: Add category tree - success
    When I fill the "category-tree-code" input with the "category_tree" term
    * On "modal" I "submit" the data and "create" is "correct"
    Then On "grid" I can see row with "category_tree" value and columns data: "{'0': 'category_tree', '1': ''}"

  @success
  Scenario: Add category tree and go to edit - success
    When I fill the "category-tree-code" input with the "category_tree2" term
    * On "modal" I "proceed" the data and "create" is "correct"
    * I see "category-trees/tree/%UUID%/general" page
    * Element "category-tree-code" is visible
    * Element "title-bar-header" is visible
    Then I can see "category-tree-code" input with the "category_tree2" term

  @error
  Scenario: Add category tree - duplication error
    When I fill the "category-tree-code" input with the "category_tree" term
    * On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['Category tree code category_tree is not unique.']"
    Then I close modal

  @error
  Scenario: Add category tree - validation error (empty string)
    When On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['Category tree system name is required']"
    Then I close modal

  @error
  Scenario: Add category tree- validation error (misc string)
    When I fill the "category-tree-code" input with the "@#$%()" term
    * On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['System name can have only letters, digits or underscore symbol']"
    * I close modal
    Then On "grid" I can not see row with "@#$%()" value
