@update
Feature: UPDATE: Category
  This feature allows update category

  Background:
    Given I open "categories/grid" page

  @error
  Scenario: Update category from edit page - validation error (too long string)
    When On "grid" I can see row with "text_category" value and columns data: "{'1': 'text_category', '2': '', '3': '0'}"
    * On "grid" I click on "edit" button for row with "text_category" value
    * I see "categories/category/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "categories/category/%UUID%/translations" page
    * I fill the "category-name" input with the "category_category_category_category_category_category_category_category_category_category_category_category_category_category_category_category_" term for "en_GB" translation
    * I "submit" the data and "update" is "incorrect"
    Then I see a form validation error that says "['Category name is too long. It should contain 128 characters or less.']"

  @success
  Scenario: Update category from edit page - success
    When On "grid" I can see row with "text_category" value and columns data: "{'1': 'text_category', '2': '', '3': '0'}"
    * On "grid" I click on "edit" button for row with "text_category" value
    * I see "categories/category/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "categories/category/%UUID%/translations" page
    * I choose "[1]" option from "translation-language-select" multi select field
    * I fill the "category-name" input with the "category_EN" term for "en_GB" translation
    * I fill the "category-name" input with the "category_PL" term for "pl_PL" translation
    * I "submit" the data and "update" is "correct"
    * I click back arrow
    * I see "categories/grid" page
    Then On "grid" I can see row with "text_category" value and columns data: "{'1': 'text_category', '2': 'category_EN', '3': '0'}"
