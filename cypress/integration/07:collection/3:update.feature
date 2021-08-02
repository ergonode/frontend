@update
Feature: UPDATE: Collection
  This feature allows update collection

  Background:
    Given I open "collections/grid" page

  @error
  Scenario: Update collection from edit page - validation error (too long string)
    When On "grid" I can see row with "collection_code" value and columns data: "{'0': 'collection_code', '1': 'Up-sell', '2': '', '3': ''}"
    * On "grid" I click on "edit" button for row with "collection_code" value
    * I see "collections/collection/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "collections/collection/%UUID%/translations" page
    * I fill the "collection-name" input with the "collection-namecollection-namecollection-namecollection-namecollection-namecollection-namecollection-namecollection-name" term for "en_GB" translation
    * I "submit" the data and "update" is "incorrect"
    Then I see a form validation error that says "['Product collection name is too long. It should contain 100 characters or less.']"

  @success
  Scenario: Update collection from edit page - success
    When On "grid" I can see row with "collection_code" value and columns data: "{'0': 'collection_code', '1': 'Up-sell', '2': '', '3': ''}"
    * On "grid" I click on "edit" button for row with "collection_code" value
    * I see "collections/collection/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "collections/collection/%UUID%/translations" page
    * I choose "[1]" option from "translation-language-select" multi select field
    * I fill the "collection-name" input with the "collection_EN" term for "en_GB" translation
    * I fill the "collection-description" textarea with the "collection_desc_EN" term for "en_GB" translation
    * I fill the "collection-name" input with the "collection_PL" term for "pl_PL" translation
    * I fill the "collection-description" textarea with the "collection_desc_PL" term for "pl_PL" translation
    * I "submit" the data and "update" is "correct"
    * I click back arrow
    * I see "collections/grid" page
    Then On "grid" I can see row with "collection_code" value and columns data: "{'0': 'collection_code', '1': 'Up-sell', '2': 'collection_EN', '3': 'collection_desc_EN'}"
