Feature: Category tree adding
  This feature allows adding category tree

  Background:
    Given I am authenticated as "admin"
    Given I open "category-trees/grid" page
    When I click on "newCategoryTree" button
    Then Element "modal" is "visible"

  Scenario: Add category tree
    When I fill the "categoryTreeName" input with the "category_tree_1" term
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then I close modal
    Then On "grid" I can see row 0 with columns data: "{'0': 'category_tree_1'}"
    And I remove "this" element by "DELETE" request
