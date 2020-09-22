Feature: Category adding
  This feature allows adding category

  Background:
    Given I open "categories" page
    When I click on "new-category" button
    Then Element "modal" is "visible"

  Scenario: Add category and remove it from Grid
    When I fill the "category-code" input with the "category_1" term
    When I click on "submit" button
    Then I send a "POST" request and status code should be 201
    And I open "categories/grid" page
    Then On "grid" I can see row with "category_1" value and columns data: "{'1': 'category_1', '3': '0'}"
    And On "grid" I click on "delete" button for row with "category_1" value
    Then I close modal by button
    And I remove element by request

  Scenario: Add category and delete by grid button
    When I fill the "category-code" input with the "category_2" term
    When I click on "submit" button
    Then I send a "POST" request and status code should be 201
    And I open "categories/grid" page
    Then On "grid" I can see row with "category_2" value and columns data: "{'1': 'category_2', '3': '0'}"
    And On "grid" I click on "delete" button for row with "category_2" value
    Then I confirm modal
    And On "grid" I can not see row with "category_2" value

  Scenario: Add category and delete from edit
    When I fill the "category-code" input with the "category_3" term
    When I click on "proceed" button
    Then I send a "POST" request and status code should be 201
    And I see "categories/category/%UUID%/general" page
    Then Element "category-code" is "visible"
    Then Element "title-bar-header" is "visible"
    When I click on "delete-category" button
    Then I confirm modal
    And I see "categories/grid" page

  Scenario: Add category1 for use in tree
    When I fill the "category-code" input with the "category_1" term
    And I click on "proceed" button
    Then I send a "POST" request and status code should be 201
    And I see "categories/category/%UUID%/general" page
    Then I click tab with "Translations" text
    And I choose "[1]" options from "translation-language-select" multi select field
    Then I fill the "category-name" input with the "category_1_EN" term for "en_GB" translation
    And I fill the "category-name" input with the "category_1_PL" term for "pl_PL" translation
    And I click on "submit" button

  Scenario: Add category2 for use in tree
    When I fill the "category-code" input with the "category_2" term
    And I click on "proceed" button
    Then I send a "POST" request and status code should be 201
    And I see "categories/category/%UUID%/general" page
    Then I click tab with "Translations" text
    And I choose "[1]" options from "translation-language-select" multi select field
    Then I fill the "category-name" input with the "category_2_EN" term for "en_GB" translation
    And I fill the "category-name" input with the "category_2_PL" term for "pl_PL" translation
    And I click on "submit" button

  Scenario: Add category3 for use in tree
    When I fill the "category-code" input with the "category_3" term
    And I click on "proceed" button
    Then I send a "POST" request and status code should be 201
    And I see "categories/category/%UUID%/general" page
    Then I click tab with "Translations" text
    And I choose "[1]" options from "translation-language-select" multi select field
    Then I fill the "category-name" input with the "category_3_EN" term for "en_GB" translation
    And I fill the "category-name" input with the "category_3_PL" term for "pl_PL" translation
    And I click on "submit" button
