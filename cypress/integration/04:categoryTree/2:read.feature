@read
Feature: READ: Category trees
  This feature allows read category trees

  Background:
    Given I open "category-trees/grid" page

  @success
  Scenario: Read category trees on grid - success
    When I can see "Category trees" text on "title-bar-header" element
    * On "grid" I can see row with "category_tree" value and columns data: "{'0': 'category_tree', '1': ''}"
    * On "grid" I can see row with "category_tree2" value and columns data: "{'0': 'category_tree2', '1': ''}"

  @success
  Scenario: Read category tree general - success
    When On "grid" I can see row with "category_tree" value and columns data: "{'0': 'category_tree', '1': ''}"
    * On "grid" I click on "edit" button for row with "category_tree" value
    * I see "category-trees/tree/%UUID%/general" page
    * Element "title-bar-header" is visible
    * I can see "category_tree" text on "title-bar-header" element
    * Element "category-tree-code" is visible
    * I can see "category-tree-code" input with the "category_tree" term
    * I can see "category-tree-code" field as disabled
    Then I click back arrow
    * I see "category-trees/grid" page

  @success
  Scenario: Read category tree translation - success
    When On "grid" I can see row with "category_tree" value and columns data: "{'0': 'category_tree', '1': ''}"
    * On "grid" I click on "edit" button for row with "category_tree" value
    * I see "category-trees/tree/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "category-trees/tree/%UUID%/translations" page
    * I choose "[1]" option from "translation-language-select" multi select field
    * I can see "category-tree-name_en_GB" input with the "" term
    * I can see "category-tree-name_en_GB" field as enabled
    * I can see "category-tree-name_pl_PL" input with the "" term
    * I can see "category-tree-name_pl_PL" field as enabled
    Then I click back arrow
    * I see "category-trees/grid" page
