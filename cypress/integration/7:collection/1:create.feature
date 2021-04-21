@create
Feature: CREATE: Collection
  This feature allows create collection

  Background:
    Given I open "collections/grid" page
    When I click on "new-collection" button
    Then Element "modal" is visible

  @other
  Scenario: Close modal
    When I close modal
    Then Element "modal" not exist

  @success
  Scenario Outline: Add collection - success
    When I fill the "collection-code" input with the "<name>" term
    * I choose <type> option from "collection-typeId" select field
    * I click on "submit" button
    * I send a "POST" request and status code should be 201
    * I open "collections/grid" page
    Then On "grid" I can see row with "<name>" value and columns data: "{'0': '<name>', '1': '<type_txt>', '2': '', '3': ''}"

    Examples:
      | name                  | type | type_txt   |
      | up_sale_collection    | 0    | Up-sell    |
      | cross_sell_collection | 1    | Cross-sell |
      | other_collection      | 2    | Other      |

  @success
  Scenario: Add collection and go to edit - success
    When I fill the "collection-code" input with the "collection_code" term
    * I choose 0 option from "collection-typeId" select field
    * I click on "proceed" button
    * I send a "POST" request and status code should be 201
    * I see "collections/collection/%UUID%/general" page
    * Element "collection-code" is visible
    * Element "title-bar-header" is visible
    Then I can see "collection-code" input with the "collection_code" term

  @error
  Scenario: Add collection - duplication error
    When I fill the "collection-code" input with the "collection_code" term
    * I choose 0 option from "collection-typeId" select field
    * I click on "submit" button
    * I send a "POST" request and status code should be 400
    * I see a form validation error that says "['The product collection code collection_code is not unique.']"
    Then I close modal

  @error
  Scenario: Add collection - validation error (too long string)
    When I fill the "collection-code" input with the "status_status_status_status_status_status_status_status_status_status_status_status_status_status_status_status_" term
    * I choose 0 option from "collection-typeId" select field
    * I click on "submit" button
    * I send a "POST" request and status code should be 400
    * I see a form validation error that says "['System name is too long. It should contain 100 characters or less.']"
    Then I close modal

  @error
  Scenario: Add collection - validation error (empty string)
    When I click on "submit" button
    * I send a "POST" request and status code should be 400
    * I see a form validation error that says "['System name is required', 'Collection type id is required']"
    Then I close modal

  @error
  Scenario: Add collection - validation error (misc string)
    When I fill the "collection-code" input with the "@#$%()" term
    * I choose 0 option from "collection-typeId" select field
    * I click on "submit" button
    * I send a "POST" request and status code should be 400
    * I see a form validation error that says "['Product collection System Name can have only letters, digits or underscore symbol']"
    * I close modal
    Then On "grid" I can not see row with "@#$%()" value
