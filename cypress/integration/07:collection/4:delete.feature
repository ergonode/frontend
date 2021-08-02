@delete
Feature: DELETE: Collection
  This feature allows delete collection

  Background:
    Given I open "collections/grid" page

  @other
  Scenario: Delete collection by grid button - give up
    When On "grid" I can see row with "collection_code" value and columns data: "{'0': 'collection_code', '1': 'Up-sell'}"
    * On "grid" I click on "delete" button for row with "collection_code" value
    * Element "modal" is visible
    * I close modal by button
    Then Element "modal" not exist

  @other
  Scenario: Delete collection from edit page - give up
    When On "grid" I can see row with "collection_code" value and columns data: "{'0': 'collection_code', '1': 'Up-sell'}"
    * On "grid" I click on "edit" button for row with "collection_code" value
    * I see "collections/collection/%UUID%/general" page
    * Element "collection-code" is visible
    * Element "title-bar-header" is visible
    * I can see "collection-code" input with the "collection_code" term
    * I can see "collection-code" field as disabled
    * I click on "delete-collection" button
    * I close modal
    Then I see "collections/collection/%UUID%/general" page

  @success
  Scenario: Delete collection by grid button - success
    When On "grid" I can see row with "collection_code" value and columns data: "{'0': 'collection_code', '1': 'Up-sell'}"
    * On "grid" I click on "delete" button for row with "collection_code" value
    * I confirm modal
    Then On "grid" I can not see row with "collection_code" value

  @success
  Scenario: Delete collection from edit page - success
    When On "grid" I can see row with "up_sale_collection" value and columns data: "{'0': 'up_sale_collection', '1': 'Up-sell'}"
    * On "grid" I click on "edit" button for row with "up_sale_collection" value
    * I see "collections/collection/%UUID%/general" page
    * Element "collection-code" is visible
    * Element "title-bar-header" is visible
    * I can see "collection-code" input with the "up_sale_collection" term
    * I can see "collection-code" field as disabled
    * I click on "delete-collection" button
    * I confirm modal
    Then I see "collections/grid" page
