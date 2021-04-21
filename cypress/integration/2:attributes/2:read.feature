@read
Feature: READ: Attributes
  This feature allows read attributes

  Background:
    Given I open "attributes/grid" page

  @success
  Scenario: Read attribute on grid - success
    When I can see "Attributes" text on "title-bar-header" element
    * On "grid" I can see row with "text_attribute" value and columns data: "{'1': 'text_attribute', '3': 'Text', '4': 'global'}"
    * On "grid" I can see row with "price_attribute" value and columns data: "{'1': 'price_attribute', '3': 'Price', '4': 'local'}"
    * On "grid" I can see row with "select_attribute" value and columns data: "{'1': 'select_attribute', '3': 'Select', '4': 'global'}"

  @success
  Scenario: Read text attribute general - success
    When On "grid" I can see row with "text_attribute" value and columns data: "{'1': 'text_attribute', '3': 'Text', '4': 'global'}"
    * On "grid" I click on "edit" button for row with "text_attribute" value
    * I see "attributes/attribute/%UUID%/general" page
    * Element "title-bar-header" is visible
    * I can see "text_attribute" text on "title-bar-header" element
    * I can see "attribute-type" select with the "Text" term
    * I can see "attribute-type" field as disabled
    * I can see "attribute-code" input with the "text_attribute" term
    * I can see "attribute-code" field as disabled
    * I can see "attribute-scope" select with the "global" term
    * I can see "attribute-scope" field as enabled
    * I can see "attribute-groups" select as not empty
    * I can see "attribute-groups" field as enabled
    Then I click back arrow
    * I see "attributes/grid" page

  @success
  Scenario: Read text attribute translation - success
    When On "grid" I can see row with "text_attribute" value and columns data: "{'1': 'text_attribute', '3': 'Text', '4': 'global'}"
    * On "grid" I click on "edit" button for row with "text_attribute" value
    * I see "attributes/attribute/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "attributes/attribute/%UUID%/translations" page
    Then I choose "[1]" option from "translation-language-select" multi select field
    * I can see "attribute-label_en_GB" input with the "" term
    * I can see "attribute-label_en_GB" field as enabled
    * I can see "attribute-label_pl_PL" input with the "" term
    * I can see "attribute-label_pl_PL" field as enabled
    * I can see "attribute-hint_en_GB" textarea with the "" term
    * I can see "attribute-hint_en_GB" field as enabled
    * I can see "attribute-hint_pl_PL" textarea with the "" term
    * I can see "attribute-hint_pl_PL" field as enabled
    * I can see "attribute-placeholder_en_GB" textarea with the "" term
    * I can see "attribute-placeholder_en_GB" field as enabled
    * I can see "attribute-placeholder_pl_PL" textarea with the "" term
    * I can see "attribute-placeholder_pl_PL" field as enabled
    Then I click back arrow
    * I see "attributes/grid" page

  @success
  Scenario: Read select attribute general - success
    When On "grid" I can see row with "select_attribute" value and columns data: "{'1': 'select_attribute', '3': 'Select', '4': 'global'}"
    * On "grid" I click on "edit" button for row with "select_attribute" value
    * I see "attributes/attribute/%UUID%/general" page
    * Element "title-bar-header" is visible
    * I can see "select_attribute" text on "title-bar-header" element
    * I can see "attribute-type" select with the "Select" term
    * I can see "attribute-type" field as disabled
    * I can see "attribute-code" input with the "select_attribute" term
    * I can see "attribute-code" field as disabled
    * I can see "attribute-scope" select with the "global" term
    * I can see "attribute-scope" field as enabled
    * I can see "attribute-groups" select as not empty
    * I can see "attribute-groups" field as enabled
    * I can see "attribute-option-0" field as enabled
    * I can see "attribute-option-0" input with the "o1" term
    * I can see "attribute-option-1" field as enabled
    * I can see "attribute-option-1" input with the "o2" term
    Then I click back arrow
    * I see "attributes/grid" page

  @success
  Scenario: Read select attribute translation - success
    When On "grid" I can see row with "select_attribute" value and columns data: "{'1': 'select_attribute', '3': 'Select', '4': 'global'}"
    * On "grid" I click on "edit" button for row with "select_attribute" value
    * I see "attributes/attribute/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "attributes/attribute/%UUID%/translations" page
    Then I choose "[1]" option from "translation-language-select" multi select field
    * I can see "attribute-label_en_GB" input with the "" term
    * I can see "attribute-label_en_GB" field as enabled
    * I can see "attribute-label_pl_PL" input with the "" term
    * I can see "attribute-label_pl_PL" field as enabled
    * I can see "attribute-hint_en_GB" textarea with the "" term
    * I can see "attribute-hint_en_GB" field as enabled
    * I can see "attribute-hint_pl_PL" textarea with the "" term
    * I can see "attribute-hint_pl_PL" field as enabled
    * I can see "attribute-option_en_GB_0" input with the "" term
    * I can see "attribute-option_en_GB_0" field as enabled
    * I can see "attribute-option_pl_PL_0" input with the "" term
    * I can see "attribute-option_pl_PL_0" field as enabled
    * I can see "attribute-option_en_GB_1" input with the "" term
    * I can see "attribute-option_en_GB_1" field as enabled
    * I can see "attribute-option_pl_PL_1" input with the "" term
    * I can see "attribute-option_pl_PL_1" field as enabled
    Then I click back arrow
    * I see "attributes/grid" page

  @success
  Scenario: Read price attribute general - success
    When On "grid" I can see row with "price_attribute" value and columns data: "{'1': 'price_attribute', '3': 'Price', '4': 'local'}"
    * On "grid" I click on "edit" button for row with "price_attribute" value
    * I see "attributes/attribute/%UUID%/general" page
    * Element "title-bar-header" is visible
    * I can see "price_attribute" text on "title-bar-header" element
    * I can see "attribute-type" select with the "Price" term
    * I can see "attribute-type" field as disabled
    * I can see "attribute-code" input with the "price_attribute" term
    * I can see "attribute-code" field as disabled
    * I can see "attribute-scope" select with the "local" term
    * I can see "attribute-scope" field as enabled
    * I can see "attribute-groups" select as not empty
    * I can see "attribute-groups" field as enabled
    * I can see "attribute-params" select as not empty
    * I can see "attribute-params" field as enabled
    Then I click back arrow
    * I see "attributes/grid" page

  @success
  Scenario: Read price attribute translation - success
    When On "grid" I can see row with "price_attribute" value and columns data: "{'1': 'price_attribute', '3': 'Price', '4': 'local'}"
    * On "grid" I click on "edit" button for row with "price_attribute" value
    * I see "attributes/attribute/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "attributes/attribute/%UUID%/translations" page
    Then I choose "[1]" option from "translation-language-select" multi select field
    * I can see "attribute-label_en_GB" input with the "" term
    * I can see "attribute-label_en_GB" field as enabled
    * I can see "attribute-label_pl_PL" input with the "" term
    * I can see "attribute-label_pl_PL" field as enabled
    * I can see "attribute-hint_en_GB" textarea with the "" term
    * I can see "attribute-hint_en_GB" field as enabled
    * I can see "attribute-hint_pl_PL" textarea with the "" term
    * I can see "attribute-hint_pl_PL" field as enabled
    Then I click back arrow
    * I see "attributes/grid" page
