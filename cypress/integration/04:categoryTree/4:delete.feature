@delete
Feature: DELETE: Category tree
  This feature allows delete category tree

  Background:
    Given I open "category-trees/grid" page

  @other
  Scenario: Delete category tree by grid button - give up
    When On "grid" I can see row with "category_tree" value and columns data: "{'0': 'category_tree'}"
    * On "grid" I click on "delete" button for row with "category_tree" value
    * Element "modal" is visible
    * I close modal by button
    Then Element "modal" not exist

  @other
  Scenario: Delete category tree from edit page - give up
    When On "grid" I can see row with "category_tree2" value and columns data: "{'0': 'category_tree2'}"
    * On "grid" I click on "edit" button for row with "category_tree2" value
    * I see "category-trees/tree/%UUID%/general" page
    * Element "category-tree-code" is visible
    * Element "title-bar-header" is visible
    * I can see "category-tree-code" input with the "category_tree2" term
    * I can see "category-tree-code" field as disabled
    * I click on "delete-category-tree" button
    * I close modal
    Then I see "category-trees/tree/%UUID%/general" page

  @success
  Scenario: Delete category tree by grid button - success
    When On "grid" I can see row with "category_tree" value and columns data: "{'0': 'category_tree'}"
    * On "grid" I click on "delete" button for row with "category_tree" value
    * I confirm modal
    Then On "grid" I can not see row with "category_tree" value

  @success
  Scenario: Delete category tree from edit page - success
    When On "grid" I can see row with "category_tree2" value and columns data: "{'0': 'category_tree2'}"
    * On "grid" I click on "edit" button for row with "category_tree2" value
    * I see "category-trees/tree/%UUID%/general" page
    * Element "category-tree-code" is visible
    * Element "title-bar-header" is visible
    * I can see "category-tree-code" input with the "category_tree2" term
    * I can see "category-tree-code" field as disabled
    * I click on "delete-category-tree" button
    * I confirm modal
    Then I see "category-trees/grid" page
