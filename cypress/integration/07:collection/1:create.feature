@create
Feature: CREATE: Collection
  This feature allows create collection

  Background:
    Given I open "collections/grid" page
    When I click on "new-collection" button
    Then Element "modal" is visible

  @success
  Scenario Outline: Add collection - success
    When I fill the "collection-code" input with the "<name>" term
    * I choose "<type_txt>" option from "collection-typeId" select field
    * On "modal" I "submit" the data and "create" is "correct"
    Then On "grid" I can see row with "<name>" value and columns data: "{'0': '<name>', '1': '<type_txt>', '2': '', '3': ''}"

    Examples:
      | name                  | type_txt   |
      | up_sale_collection    | Up-sell    |

  @success
  Scenario: Add collection and go to edit - success
    When I fill the "collection-code" input with the "collection_code" term
    * I choose "Up-sell" option from "collection-typeId" select field
    * On "modal" I "proceed" the data and "create" is "correct"
    * I see "collections/collection/%UUID%/general" page
    * Element "collection-code" is visible
    * Element "title-bar-header" is visible
    Then I can see "collection-code" input with the "collection_code" term

  @error
  Scenario: Add collection - duplication error
    When I fill the "collection-code" input with the "collection_code" term
    * I choose "Up-sell" option from "collection-typeId" select field
    * On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['The product collection code collection_code is not unique.']"
    Then I close modal

  @error
  Scenario: Add collection - validation error (too long string)
    When I fill the "collection-code" input with the "status_status_status_status_status_status_status_status_status_status_status_status_status_status_status_status_" term
    * I choose "Up-sell" option from "collection-typeId" select field
    * On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['System name is too long. It should contain 64 characters or less.']"
    Then I close modal

  @error
  Scenario: Add collection - validation error (empty string)
    When On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['System name is required', 'Collection type id is required']"
    Then I close modal

  @error
  Scenario: Add collection - validation error (misc string)
    When I fill the "collection-code" input with the "@#$%()" term
    * I choose "Up-sell" option from "collection-typeId" select field
    * On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['Product collection System Name can have only letters, digits or underscore symbol']"
    * I close modal
    Then On "grid" I can not see row with "@#$%()" value
