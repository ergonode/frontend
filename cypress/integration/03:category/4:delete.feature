@delete
Feature: DELETE: Category
  This feature allows delete category

  Background:
    Given I open "categories/grid" page

  @other
  Scenario: Delete category by grid button - give up
    When On "grid" I can see row with "text_category" value and columns data: "{'1': 'text_category', '3': '0'}"
    * On "grid" I click on "delete" button for row with "text_category" value
    * Element "modal" is visible
    * I close modal by button
    Then Element "modal" not exist

  @other
  Scenario: Delete category from edit page - give up
    When On "grid" I can see row with "text_category2" value and columns data: "{'1': 'text_category2', '3': '0'}"
    * On "grid" I click on "edit" button for row with "text_category2" value
    * I see "categories/category/%UUID%/general" page
    * Element "category-code" is visible
    * Element "title-bar-header" is visible
    * I can see "category-code" input with the "text_category2" term
    * I can see "category-code" field as disabled
    * I click on "delete-category" button
    * I close modal
    Then I see "categories/category/%UUID%/general" page

  @success
  Scenario: Delete category by grid button - success
    When On "grid" I can see row with "text_category" value and columns data: "{'1': 'text_category', '3': '0'}"
    * On "grid" I click on "delete" button for row with "text_category" value
    * I confirm modal
    Then On "grid" I can not see row with "text_category" value

  @success
  Scenario: Delete category from edit page - success
    When On "grid" I can see row with "text_category2" value and columns data: "{'1': 'text_category2', '3': '0'}"
    * On "grid" I click on "edit" button for row with "text_category2" value
    * I see "categories/category/%UUID%/general" page
    * Element "category-code" is visible
    * Element "title-bar-header" is visible
    * I can see "category-code" input with the "text_category2" term
    * I can see "category-code" field as disabled
    * I click on "delete-category" button
    * I confirm modal
    Then I see "categories/grid" page
