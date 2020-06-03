Feature: Collection adding
  This feature allows adding collection

  Background:
    Given I am authenticated as "admin"
    Given I open "collections/grid" page
    When I click on "new-collection" button
    Then Element "modal" is "visible"

  Scenario: Add collection and delete by request
    When I fill the "collection-code" input with the "collection_1" term
    And I choose 0 option from "collection-typeId" select field
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then On "grid" I can see row 0 with columns data: "{'0': 'collection_1', '4': '0'}"
    And On "grid" I click on "delete" button for row 0
    Then I close modal by button
    And I remove "this" element by "DELETE" request

  Scenario: Add collection and delete by grid button
    When I fill the "collection-code" input with the "collection_2" term
    And I choose 0 option from "collection-typeId" select field
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then On "grid" I can see row 0 with columns data: "{'0': 'collection_2', '4': '0'}"
    And On "grid" I click on "delete" button for row 0
    Then I confirm modal
    And On "grid" I can not see row 0 with columns data: "{'0': 'collection_2'}"

  Scenario: Add collection and delete from edit
    When I fill the "collection-code" input with the "collection_3" term
    And I choose 0 option from "collection-typeId" select field
    When On "modal" element I click button with "CREATE & EDIT" text
    Then I send a "POST" request and status code should be 201
    And I see "collections/collection/%UUID%/general" page
    Then Element "collection-code" is "visible"
    Then Element "title-bar-header" is "visible"
    Then I can see "collection_3" text on "title-bar-header" element
    When I click on "delete-collection" button
    Then I confirm modal
    And I see "collections/grid" page

  Scenario: Add collection1 for use
    When I fill the "collection-code" input with the "collection_1" term
    And I choose 0 option from "collection-typeId" select field
    And On "modal" element I click button with "CREATE & EDIT" text
    Then I send a "POST" request and status code should be 201
    And I see "collections/collection/%UUID%/general" page
    Then I click tab with "Translations" text
    And I choose "[1]" options from "translation-language-select" multi select field
    Then I fill the "collection-name" input with the "collection-name_1_EN" term for "en" translation
    Then I fill the "collection-description" textarea with the "collection-description_1_EN" term for "en" translation
    And I fill the "collection-name" input with the "collection-name_1_PL" term for "pl" translation
    Then I fill the "collection-description" textarea with the "collection-description_1_PL" term for "pl" translation
    And I click on "save-collection" button
