@update
Feature: UPDATE: Resource
  This feature allows update resource

  Background:
    Given I open "media/grid" page

  @error
  Scenario: Update resource from edit page - validation error (too long string)
    When On "grid" I can see row with "product-1.jpg" value and columns data: "{'1': 'product-1.jpg'}"
    * On "grid" I click on "edit" button for row with "product-1.jpg" value
    * I see "media/resource/%UUID%/general" page
    * I fill the "resource-name" input with the "product-1_3_product-1_3_product-1_3_product-1_3_product-1_3_product-1_3_product-1_3_product-1_3_product-1_3product-1_3_product-1_3_product-1_3_product-1_3_product-1_3_product-1_3_product-1_3_product-1_3_product-1_3product-1_3_product-1_3_product-1_3_product-1_3_product-1_3_product-1_3_product-1_3_product-1_3_product-1_3" term
    * I "submit" the data and "update" is "incorrect"
    Then I see a form validation error that says "['Multimedia name is too long. It should contain 128 characters or less.']"

  @success
  Scenario: Update resource from edit page - success
    When On "grid" I can see row with "product-1.jpg" value and columns data: "{'1': 'product-1.jpg'}"
    * On "grid" I click on "edit" button for row with "product-1.jpg" value
    * I see "media/resource/%UUID%/general" page
    * I fill the "resource-name" input with the "product-1_3" term
    * I "submit" the data and "update" is "correct"
    * I click back arrow
    * I see "media/grid" page
    Then On "grid" I can see row with "product-1_3.jpg" value and columns data: "{'1': 'product-1_3.jpg'}"

  @success
  Scenario: Update resource from edit page - success
    When On "grid" I can see row with "product-2.jpg" value and columns data: "{'1': 'product-2.jpg'}"
    * On "grid" I click on "edit" button for row with "product-2.jpg" value
    * I see "media/resource/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "media/resource/%UUID%/translations" page
    * I choose "[1]" option from "translation-language-select" multi select field
    * I fill the "resource-alt" textarea with the "alt_EN" term for "en_GB" translation
    * I fill the "resource-alt" textarea with the "alt_PL" term for "pl_PL" translation
    * I "submit" the data and "update" is "correct"
    * I click back arrow
    * I see "media/grid" page
    Then On "grid" I can see row with "product-2.jpg" value and columns data: "{'1': 'product-2.jpg'}"
