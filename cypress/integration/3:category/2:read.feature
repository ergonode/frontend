@read
Feature: READ: categories
  This feature allows read categories

  Background:
    Given I open "categories/grid" page

  @success
  Scenario: Read categories on grid - success
    When I can see "Categories" text on "title-bar-header" element
    * On "grid" I can see row with "text_category" value and columns data: "{'1': 'text_category', '2': '', '3': '0'}"
    * On "grid" I can see row with "text_category2" value and columns data: "{'1': 'text_category2', '2': '', '3': '0'}"

  @success
  Scenario: Read category general - success
    When On "grid" I can see row with "text_category" value and columns data: "{'1': 'text_category', '2': '', '3': '0'}"
    * On "grid" I click on "edit" button for row with "text_category" value
    * I see "categories/category/%UUID%/general" page
    * Element "title-bar-header" is visible
    * I can see "text_category" text on "title-bar-header" element
    * Element "category-code" is visible
    * I can see "category-code" input with the "text_category" term
    * I can see "category-code" field as disabled
    Then I click back arrow
    * I see "categories/grid" page

  @success
  Scenario: Read category translation - success
    When On "grid" I can see row with "text_category" value and columns data: "{'1': 'text_category', '2': '', '3': '0'}"
    * On "grid" I click on "edit" button for row with "text_category" value
    * I see "categories/category/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "categories/category/%UUID%/translations" page
    * I choose "[1]" option from "translation-language-select" multi select field
    * I can see "category-name_en_GB" input with the "" term
    * I can see "category-name_en_GB" field as enabled
    * I can see "category-name_pl_PL" input with the "" term
    * I can see "category-name_pl_PL" field as enabled
    Then I click back arrow
    * I see "categories/grid" page
