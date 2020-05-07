Feature: Category adding
  This feature allows adding category

  Background:
    Given I am authenticated as "admin"
    Given I open "categories/grid" page
    When I click on "newCategory" button
    Then Element "modal" is "visible"

  Scenario: Add category
    When I fill the "categoryName" input with the "category_1" term
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then I close modal
    Then On "grid" I can see row 0 with columns data: "{'1': 'category_1', '3': '0'}"
    And I remove "this" element by "DELETE" request
