@read
Feature: READ: Collection
  This feature allows read collection

  Background:
    Given I open "collections/grid" page

  @success
  Scenario: Read collections on grid - success
    When I can see "Collections" text on "title-bar-header" element
    * On "grid" I can see row with "up_sale_collection" value and columns data: "{'0': 'up_sale_collection', '1': 'Up-sell', '2': '', '3': ''}"

  @success
  Scenario: Read collection general - success
    When On "grid" I can see row with "collection_code" value and columns data: "{'0': 'collection_code', '1': 'Up-sell'}"
    * On "grid" I click on "edit" button for row with "collection_code" value
    * I see "collections/collection/%UUID%/general" page
    * Element "title-bar-header" is visible
    * I can see "collection_code" text on "title-bar-header" element
    * Element "collection-code" is visible
    * I can see "collection-code" input with the "collection_code" term
    * I can see "collection-code" field as disabled
    Then I click back arrow
    * I see "collections/grid" page

  @success
  Scenario: Read collection translation - success
    When On "grid" I can see row with "collection_code" value and columns data: "{'0': 'collection_code', '1': 'Up-sell', '2': '', '3': ''}"
    * On "grid" I click on "edit" button for row with "collection_code" value
    * I see "collections/collection/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "collections/collection/%UUID%/translations" page
    * I choose "[1]" option from "translation-language-select" multi select field
    * I can see "collection-name_en_GB" input with the "" term
    * I can see "collection-name_en_GB" field as enabled
    * I can see "collection-description_en_GB" textarea with the "" term
    * I can see "collection-description_en_GB" field as enabled
    * I can see "collection-name_pl_PL" input with the "" term
    * I can see "collection-name_pl_PL" field as enabled
    * I can see "collection-description_pl_PL" textarea with the "" term
    * I can see "collection-description_pl_PL" field as enabled
    Then I click back arrow
    * I see "collections/grid" page
