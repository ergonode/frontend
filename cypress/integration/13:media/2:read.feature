@read
Feature: READ: resources
  This feature allows read resources

  Background:
    Given I open "media/grid" page

  @success
  Scenario: Read resource general - success
    When On "grid" I can see row with "product-1.jpg" value and columns data: "{'1': 'product-1.jpg'}"
    * On "grid" I click on "edit" button for row with "product-1.jpg" value
    * I see "media/resource/%UUID%/general" page
    * I can see "product-1.jpg" text on "title-bar-header" element
    * I can see "resource-name" input with the "product-1" term
    Then I click back arrow
    * I see "media/grid" page

  @success
  Scenario: Read resource translations - success
    When On "grid" I can see row with "product-1.jpg" value and columns data: "{'1': 'product-1.jpg'}"
    * On "grid" I click on "edit" button for row with "product-1.jpg" value
    * I see "media/resource/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "media/resource/%UUID%/translations" page
    Then I choose "[1]" option from "translation-language-select" multi select field
    * I can see "resource-alt_en_GB" textarea with the "" term
    * I can see "resource-alt_pl_PL" textarea with the "" term
    Then I click back arrow
    * I see "media/grid" page

