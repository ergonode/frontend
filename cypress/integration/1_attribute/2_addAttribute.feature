Feature: Attribute adding
  This feature allows adding attributes

  Background:
    Given I am authenticated as "admin"
    Given I open "attributes/grid" page
    When I click on "new-attribute" button
    Then Element "modal" is "visible"

  Scenario: Add text attibute with local scope and delete by request
    When I fill the "attribute-code" input with the "text_attribute" term
    And I choose "[0]" options from "attribute-group" multi select field
    And I choose 6 option from "attribute-type" select field
    And I choose 1 option from "attribute-scope" select field
    Then I can see "Configuration" text on "modal" element
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then On "grid" I can see row 0 with columns data: "{'1': 'text_attribute', '3': 'Text', '4': 'local'}"
    And On "grid" I click on "delete" button for row 0
    Then I close modal by button
    And I remove "this" element by "DELETE" request

  Scenario: Add textarea attibute with local scope and delete by grid button
    When I fill the "attribute-code" input with the "textarea_attribute" term
    And I choose "[0]" options from "attribute-group" multi select field
    And I choose 7 option from "attribute-type" select field
    And I choose 1 option from "attribute-scope" select field
    Then I can see "Configuration" text on "modal" element
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then On "grid" I can see row 0 with columns data: "{'1': 'textarea_attribute', '3': 'Textarea', '4': 'local'}"
    And On "grid" I click on "delete" button for row 0
    Then I confirm modal
    And On "grid" I can not see row 0 with columns data: "{'1': 'textarea_attribute'}"

  Scenario: Add numeric attibute with global scope and delete by grid button
    When I fill the "attribute-code" input with the "numeric_attribute" term
    And I choose "[0]" options from "attribute-group" multi select field
    And I choose 3 option from "attribute-type" select field
    And I choose 0 option from "attribute-scope" select field
    Then I can see "Configuration" text on "modal" element
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then On "grid" I can see row 0 with columns data: "{'1': 'numeric_attribute', '3': 'Numeric', '4': 'global'}"
    And On "grid" I click on "delete" button for row 0
    Then I confirm modal
    And On "grid" I can not see row 0 with columns data: "{'1': 'numeric_attribute'}"

  Scenario: Add price attibute with global scope and delete by request
    When I fill the "attribute-code" input with the "price_attribute" term
    And I choose "[0]" options from "attribute-group" multi select field
    And I choose 4 option from "attribute-type" select field
    And I choose 0 option from "attribute-scope" select field
    Then I can see "Configuration" text on "modal" element
    And I choose 0 option from "attribute-params" select field
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then On "grid" I can see row 0 with columns data: "{'1': 'price_attribute', '3': 'Price', '4': 'global'}"
    And I remove "this" element by "DELETE" request

  Scenario: Add date attibute with local scope and delete by request
    When I fill the "attribute-code" input with the "date_attribute" term
    And I choose "[0]" options from "attribute-group" multi select field
    And I choose 0 option from "attribute-type" select field
    And I choose 1 option from "attribute-scope" select field
    Then I can see "Configuration" text on "modal" element
    And I choose 0 option from "attribute-params" select field
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then On "grid" I can see row 0 with columns data: "{'1': 'date_attribute', '3': 'Date', '4': 'local'}"
    And I remove "this" element by "DELETE" request

  Scenario: Add unit attibute with local scope and delete by request
    When I fill the "attribute-code" input with the "unit_attribute" term
    And I choose "[0]" options from "attribute-group" multi select field
    And I choose 8 option from "attribute-type" select field
    And I choose 1 option from "attribute-scope" select field
    Then I can see "Configuration" text on "modal" element
    And I choose 0 option from "attribute-params" select field
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then On "grid" I can see row 0 with columns data: "{'1': 'unit_attribute', '3': 'Unit', '4': 'local'}"
    And I remove "this" element by "DELETE" request

  Scenario: Add image attibute with global scope and delete by request
    When I fill the "attribute-code" input with the "image_attribute" term
    And I choose "[0]" options from "attribute-group" multi select field
    And I choose 1 option from "attribute-type" select field
    And I choose 0 option from "attribute-scope" select field
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then On "grid" I can see row 0 with columns data: "{'1': 'image_attribute', '3': 'Image', '4': 'global'}"
    And I remove "this" element by "DELETE" request

  Scenario: Add select attibute with local scope and delete by request
    When I fill the "attribute-code" input with the "select_attribute" term
    And I choose "[0]" options from "attribute-group" multi select field
    And I choose 5 option from "attribute-type" select field
    And I choose 1 option from "attribute-scope" select field
    And Element "attribute-add-options" is "visible"
    When On "attribute-add-options" element I click button with "ADD OPTION KEY" text
    Then I fill the "attribute-option-0" input with the "attribute_select_option_0" term
    And On "attribute-add-options" element I click button with "ADD OPTION KEY" text
    Then I fill the "attribute-option-1" input with the "attribute_select_option_1" term
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then On "grid" I can see row 0 with columns data: "{'1': 'select_attribute', '3': 'Select', '4': 'local'}"
    And I remove "this" element by "DELETE" request

  Scenario: Add multiselect attibute with local scope and delete by request
    When I fill the "attribute-code" input with the "multiselect_attribute" term
    And I choose "[0]" options from "attribute-group" multi select field
    And I choose 2 option from "attribute-type" select field
    And I choose 1 option from "attribute-scope" select field
    And Element "attribute-add-options" is "visible"
    When On "attribute-add-options" element I click button with "ADD OPTION KEY" text
    Then I fill the "attribute-option-0" input with the "attribute_multiselect_option_0" term
    And On "attribute-add-options" element I click button with "ADD OPTION KEY" text
    Then I fill the "attribute-option-1" input with the "attribute_multiselect_option_1" term
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then On "grid" I can see row 0 with columns data: "{'1': 'multiselect_attribute', '3': 'Multi select', '4': 'local'}"
    And I remove "this" element by "DELETE" request

  Scenario: Add text attibute with local scope and edit
    When I fill the "attribute-code" input with the "text_attribute" term
    And I choose 6 option from "attribute-type" select field
    And I choose 0 option from "attribute-scope" select field
    Then I can see "Configuration" text on "modal" element
    When On "modal" element I click button with "CREATE & EDIT" text
    Then I send a "POST" request and status code should be 201
    And I see "attributes/attribute/%UUID%/general" page
    And Element "attribute-group" is "visible"
    And I choose "[0]" options from "attribute-group" multi select field
    Then I choose 1 option from "attribute-scope" select field
    And Element "title-bar-header" is "visible"
    Then I can see "text_attribute" text on "title-bar-header" element
    When I click tab with "Translations" text
    Then I choose "[1]" options from "translation-language-select" multi select field
    And I fill the "attribute-label" input with the "attribute_txt_label_EN" term for "en" translation
    And I fill the "attribute-placeholder" textarea with the "attribute_txt_placeholder_EN" term for "en" translation
    And I fill the "attribute-hint" textarea with the "attribute_txt_hint_EN" term for "en" translation
    And I fill the "attribute-label" input with the "attribute_txt_label_PL" term for "pl" translation
    And I fill the "attribute-placeholder" textarea with the "attribute_txt_placeholder_PL" term for "pl" translation
    And I fill the "attribute-hint" textarea with the "attribute_txt_hint_PL" term for "pl" translation
    Then I click on "save-attribute" button
    And I open "attributes/grid" page

  Scenario: Add price attibute with global scope and edit
    When I fill the "attribute-code" input with the "price_attribute" term
    And I choose 4 option from "attribute-type" select field
    And I choose 1 option from "attribute-scope" select field
    Then I can see "Configuration" text on "modal" element
    And I choose 0 option from "attribute-params" select field
    When On "modal" element I click button with "CREATE & EDIT" text
    Then I send a "POST" request and status code should be 201
    And I see "attributes/attribute/%UUID%/general" page
    And Element "attribute-group" is "visible"
    And I choose "[0]" options from "attribute-group" multi select field
    Then I choose 0 option from "attribute-scope" select field
    And I choose 3 option from "attribute-params" select field
    And Element "title-bar-header" is "visible"
    Then I can see "price_attribute" text on "title-bar-header" element
    When I click tab with "Translations" text
    Then I choose "[1]" options from "translation-language-select" multi select field
    And I fill the "attribute-label" input with the "attribute_price_label_EN" term for "en" translation
    And I fill the "attribute-hint" textarea with the "attribute_price_hint_EN" term for "en" translation
    And I fill the "attribute-label" input with the "attribute_price_label_PL" term for "pl" translation
    And I fill the "attribute-hint" textarea with the "attribute_price_hint_PL" term for "pl" translation
    Then I click on "save-attribute" button
    And I open "attributes/grid" page


  Scenario: Add select attibute with local scope and edit
    When I fill the "attribute-code" input with the "select_attribute" term
    And I choose 5 option from "attribute-type" select field
    And I choose 0 option from "attribute-scope" select field
    Then I can see "Configuration" text on "modal" element
    When On "modal" element I click button with "CREATE & EDIT" text
    Then I send a "POST" request and status code should be 201
    And I see "attributes/attribute/%UUID%/general" page
    And Element "attribute-group" is "visible"
    And I choose "[0]" options from "attribute-group" multi select field
    Then I choose 1 option from "attribute-scope" select field
    And Element "title-bar-header" is "visible"
    Then I can see "select_attribute" text on "title-bar-header" element
    When On "attribute-add-options" element I click button with "ADD OPTION KEY" text
    Then I fill the "attribute-option-0" input with the "attribute_select_option_0" term
    When I click tab with "Translations" text
    Then I choose "[1]" options from "translation-language-select" multi select field
    And I fill the "attribute-label" input with the "attribute_select_label_EN" term for "en" translation
    And I fill the "attribute-hint" textarea with the "attribute_select_hint_EN" term for "en" translation
    And I fill the "attribute-option" input for index 0 with the "attribute_select_option_0_EN" term for "en" translation
    And I fill the "attribute-label" input with the "attribute_select_label_PL" term for "pl" translation
    And I fill the "attribute-hint" textarea with the "attribute_select_hint_PL" term for "pl" translation
    And I fill the "attribute-option" input for index 0 with the "attribute_select_option_0_PL" term for "pl" translation
    Then I click on "save-attribute" button
    And I open "attributes/grid" page

  Scenario: Add image attibute with local scope and edit
    When I fill the "attribute-code" input with the "img_attribute" term
    And I choose 1 option from "attribute-type" select field
    And I choose 0 option from "attribute-scope" select field
    Then I can see "Configuration" text on "modal" element
    When On "modal" element I click button with "CREATE & EDIT" text
    Then I send a "POST" request and status code should be 201
    And I see "attributes/attribute/%UUID%/general" page
    And Element "attribute-group" is "visible"
    And I choose "[0]" options from "attribute-group" multi select field
    Then I choose 1 option from "attribute-scope" select field
    And Element "title-bar-header" is "visible"
    Then I can see "img_attribute" text on "title-bar-header" element
    When I click tab with "Translations" text
    Then I choose "[1]" options from "translation-language-select" multi select field
    And I fill the "attribute-label" input with the "attribute_img_label_EN" term for "en" translation
    And I fill the "attribute-hint" textarea with the "attribute_img_hint_EN" term for "en" translation
    And I fill the "attribute-label" input with the "attribute_img_label_PL" term for "pl" translation
    And I fill the "attribute-hint" textarea with the "attribute_img_hint_PL" term for "pl" translation
    Then I click on "save-attribute" button
    And I open "attributes/grid" page
