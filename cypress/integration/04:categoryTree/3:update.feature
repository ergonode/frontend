@update
Feature: UPDATE: Category tree
  This feature allows update category tree

  Background:
    Given I open "category-trees/grid" page

  # TODO: Create test for Designe tab
  # FIXME: No validation for too long information
  # @error
  # Scenario: Update category tree from edit page - validation error (too long string)
  #   When On "grid" I can see row with "category_tree" value and columns data: "{'0': 'category_tree', '1': ''}"
  #   * On "grid" I click on "edit" button for row with "category_tree" value
  #   * I see "category-trees/tree/%UUID%/general" page
  #   * I click tab with "Translations" text
  #   * I see "category-trees/tree/%UUID%/translations" page
  #   * I fill the "category-tree-name" input with the "category_tree_category_tree_category_tree_category_tree_category_" term for "en_GB" translation
  #   * I "submit" the data and "update" is "incorrect"
  #   Then I see a form validation error that says "['Category tree name is too long. It should contain 32 characters or less.']"

  @success
  Scenario: Update category tree from edit page - success
    When On "grid" I can see row with "category_tree" value and columns data: "{'0': 'category_tree', '1': ''}"
    * On "grid" I click on "edit" button for row with "category_tree" value
    * I see "category-trees/tree/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "category-trees/tree/%UUID%/translations" page
    * I choose "[1]" option from "translation-language-select" multi select field
    * I fill the "category-tree-name" input with the "category_tree_EN" term for "en_GB" translation
    * I fill the "category-tree-name" input with the "category_tree_PL" term for "pl_PL" translation
    * I "submit" the data and "update" is "correct"
    * I click back arrow
    * I see "category-trees/grid" page
    Then On "grid" I can see row with "category_tree" value and columns data: "{'0': 'category_tree', '1': 'category_tree_EN'}"
