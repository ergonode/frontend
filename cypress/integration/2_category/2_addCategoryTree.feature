Feature: Category tree adding
  This feature allows adding category tree

  Background:
    Given I am authenticated as "admin"
    Given I open "category-trees/grid" page
    When I click on "new-category-tree" button
    Then Element "modal" is "visible"

  Scenario: Add category tree and delete by request
    When I fill the "category-tree-code" input with the "category_tree_1" term
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then On "grid" I can see row 0 with columns data: "{'0': 'category_tree_1'}"
    And On "grid" I click on "delete" button for row 0
    Then I close modal by button
    And I remove "this" element by "DELETE" request

  Scenario: Add category tree and delete by grid button
    When I fill the "category-tree-code" input with the "category_tree_2" term
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then On "grid" I can see row 0 with columns data: "{'0': 'category_tree_2'}"
    And On "grid" I click on "delete" button for row 0
    Then I confirm modal
    And On "grid" I can not see row 0 with columns data: "{'0': 'category_tree_2'}"

  Scenario: Add category tree and delete from edit
    When I fill the "category-tree-code" input with the "category_tree_3" term
    When On "modal" element I click button with "CREATE & EDIT" text
    Then I send a "POST" request and status code should be 201
    And I see "category-trees/tree/%UUID%/general" page
    Then Element "category-tree-code" is "visible"
    Then Element "title-bar-header" is "visible"
    Then I can see "category_tree_3" text on "title-bar-header" element
    When I click on "delete-category-tree" button
    Then I confirm modal
    And I see "category-trees/grid" page

  Scenario: Add category tree
    When I fill the "category-tree-code" input with the "category_tree" term
    And On "modal" element I click button with "CREATE & EDIT" text
    Then I send a "POST" request and status code should be 201
    And I see "category-trees/tree/%UUID%/general" page
    Then I click tab with "Translations" text
    And I choose "[1]" options from "translation-language-select" multi select field
    Then I fill the "category-tree-name" input with the "category_tree_EN" term for "en" translation
    And I fill the "category-tree-name" input with the "category_tree_PL" term for "pl" translation
    And I click on "save-category-tree" button
