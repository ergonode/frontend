Feature: Attribute adding
  This feature allows adding attributes

  Background:
    Given I open "attributes/grid" page
    When I click on "new-attribute" button
    Then Element "modal" is "visible"

  Scenario Outline: Add <type_txt> attribute and remove it from Grid
    When I fill the "attribute-code" input with the "<name>" term
    And I choose "[0]" options from "attribute-group" multi select field
    And I choose <type> option from "attribute-type" select field
    And I choose <scope> option from "attribute-scope" select field
    Then I can see "Configuration" text on "modal" element
    When I click on "submit" button
    Then I send a "POST" request and status code should be 201
    And I open "attributes/grid" page
    Then On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '3': '<type_txt>', '4': '<scope_txt>'}"
    And I remove element by request

    Examples:
      | name                | type | type_txt | scope | scope_txt |
      | text_attribute      | 8    | Text     | 0     | global    |
      | text_attribute2     | 8    | Text     | 1     | local     |
      | textarea_attribute  | 9    | Textarea | 0     | global    |
      | textarea_attribute2 | 9    | Textarea | 1     | local     |
      | image_attribute     | 3    | Image    | 0     | global    |
      | image_attribute2    | 3    | Image    | 1     | local     |
      | numeric_attribute   | 5    | Numeric  | 0     | global    |
      | numeric_attribute2  | 5    | Numeric  | 1     | local     |
      | file_attribute      | 1    | File     | 0     | global    |
      | file_attribute2     | 1    | File     | 1     | local     |
      | gallery_attribute   | 2    | Gallery  | 0     | global    |
      | gallery_attribute2  | 2    | Gallery  | 1     | local     |


  Scenario Outline: Add <type_txt> attribute and delete by grid button
    When I fill the "attribute-code" input with the "<name>" term
    And I choose "[0]" options from "attribute-group" multi select field
    And I choose <type> option from "attribute-type" select field
    And I choose <scope> option from "attribute-scope" select field
    Then I can see "Configuration" text on "modal" element
    And I choose 0 option from "attribute-params" select field
    When I click on "submit" button
    Then I send a "POST" request and status code should be 201
    And I open "attributes/grid" page
    Then On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '3': '<type_txt>', '4': '<scope_txt>'}"
    And On "grid" I click on "delete" button for row with "<name>" value
    Then I confirm modal
    And On "grid" I can not see row with "<name>" value

    Examples:
      | name             | type | type_txt | scope | scope_txt |
      | price_attribute  | 6    | Price    | 0     | global    |
      | price_attribute2 | 6    | Price    | 1     | local     |
      | date_attribute   | 0    | Date     | 0     | global    |
      | date_attribute2  | 0    | Date     | 1     | local     |
      | unit_attribute   | 10   | Unit     | 0     | global    |
      | unit_attribute2  | 10   | Unit     | 1     | local     |

  Scenario Outline: Add <type_txt> attribute and delete from edit
    When I fill the "attribute-code" input with the "<name>" term
    And I choose "[0]" options from "attribute-group" multi select field
    And I choose <type> option from "attribute-type" select field
    And I choose <scope> option from "attribute-scope" select field
    And Element "attribute-add-options" is "visible"
    When On "attribute-add-options" element I click button with "ADD OPTION KEY" text
    Then I fill the "attribute-option-0" input with the "attribute_option_0" term
    And On "attribute-add-options" element I click button with "ADD OPTION KEY" text
    Then I fill the "attribute-option-1" input with the "attribute_option_1" term
    When I click on "submit" button
    Then I send a "POST" request and status code should be 201
    And I open "attributes/grid" page
    Then On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '3': '<type_txt>', '4': '<scope_txt>'}"
    And On "grid" I click on "edit" button for row with "<name>" value
    And I see "attributes/attribute/%UUID%/general" page
    Then Element "attribute-code" is "visible"
    Then Element "title-bar-header" is "visible"
    # Then I can see "<name>" text on "title-bar-header" element
    When I click on "delete-attribute" button
    Then I confirm modal
    And I see "attributes/grid" page

  Examples:
    | name                   | type | type_txt     | scope | scope_txt |
    | select_attribute       | 7    | Select       | 0     | global    |
    | select_attribute2      | 7    | Select       | 1     | local     |
    | multiselect_attribute  | 4    | Multi select | 0     | global    |
    | multiselect_attribute2 | 4    | Multi select | 1     | local     |

  Scenario: Add text attribute with local scope and edit
    When I fill the "attribute-code" input with the "text_attribute3" term
    And I choose 8 option from "attribute-type" select field
    And I choose 0 option from "attribute-scope" select field
    Then I can see "Configuration" text on "modal" element
    When I click on "proceed" button
    Then I send a "POST" request and status code should be 201
    And I see "attributes/attribute/%UUID%/general" page
    And Element "attribute-group" is "visible"
    And I choose "[0]" options from "attribute-group" multi select field
    Then I choose 1 option from "attribute-scope" select field
    And Element "title-bar-header" is "visible"
    # Then I can see "text_attribute" text on "title-bar-header" element
    When I click tab with "Translations" text
    Then I choose "[1]" options from "translation-language-select" multi select field
    And I fill the "attribute-label" input with the "attribute_txt_label_EN" term for "en_GB" translation
    And I fill the "attribute-placeholder" textarea with the "attribute_txt_placeholder_EN" term for "en_GB" translation
    And I fill the "attribute-hint" textarea with the "attribute_txt_hint_EN" term for "en_GB" translation
    And I fill the "attribute-label" input with the "attribute_txt_label_PL" term for "pl_PL" translation
    And I fill the "attribute-placeholder" textarea with the "attribute_txt_placeholder_PL" term for "pl_PL" translation
    And I fill the "attribute-hint" textarea with the "attribute_txt_hint_PL" term for "pl_PL" translation
    Then I click on "submit" button
    And I open "attributes/grid" page

  Scenario: Add price attribute with global scope and edit
    When I fill the "attribute-code" input with the "price_attribute3" term
    And I choose 6 option from "attribute-type" select field
    And I choose 1 option from "attribute-scope" select field
    Then I can see "Configuration" text on "modal" element
    And I choose 0 option from "attribute-params" select field
    When I click on "proceed" button
    Then I send a "POST" request and status code should be 201
    And I see "attributes/attribute/%UUID%/general" page
    And Element "attribute-group" is "visible"
    And I choose "[0]" options from "attribute-group" multi select field
    Then I choose 0 option from "attribute-scope" select field
    And I choose 3 option from "attribute-params" select field
    And Element "title-bar-header" is "visible"
    # Then I can see "price_attribute" text on "title-bar-header" element
    When I click tab with "Translations" text
    Then I choose "[1]" options from "translation-language-select" multi select field
    And I fill the "attribute-label" input with the "attribute_price_label_EN" term for "en_GB" translation
    And I fill the "attribute-hint" textarea with the "attribute_price_hint_EN" term for "en_GB" translation
    And I fill the "attribute-label" input with the "attribute_price_label_PL" term for "pl_PL" translation
    And I fill the "attribute-hint" textarea with the "attribute_price_hint_PL" term for "pl_PL" translation
    Then I click on "submit" button
    And I open "attributes/grid" page


  Scenario: Add select attribute with local scope and edit
    When I fill the "attribute-code" input with the "select_attribute3" term
    And I choose 7 option from "attribute-type" select field
    And I choose 0 option from "attribute-scope" select field
    Then I can see "Configuration" text on "modal" element
    When I click on "proceed" button
    Then I send a "POST" request and status code should be 201
    And I see "attributes/attribute/%UUID%/general" page
    And Element "attribute-group" is "visible"
    And I choose "[0]" options from "attribute-group" multi select field
    Then I choose 1 option from "attribute-scope" select field
    And Element "title-bar-header" is "visible"
    # Then I can see "select_attribute" text on "title-bar-header" element
    When On "attribute-add-options" element I click button with "ADD OPTION KEY" text
    Then I fill the "attribute-option-0" input with the "attribute_select_option_0" term
    When I click tab with "Translations" text
    Then I choose "[1]" options from "translation-language-select" multi select field
    And I fill the "attribute-label" input with the "attribute_select_label_EN" term for "en_GB" translation
    And I fill the "attribute-hint" textarea with the "attribute_select_hint_EN" term for "en_GB" translation
    And I fill the "attribute-option" input for index 0 with the "attribute_select_option_0_EN" term for "en_GB" translation
    And I fill the "attribute-label" input with the "attribute_select_label_PL" term for "pl_PL" translation
    And I fill the "attribute-hint" textarea with the "attribute_select_hint_PL" term for "pl_PL" translation
    And I fill the "attribute-option" input for index 0 with the "attribute_select_option_0_PL" term for "pl_PL" translation
    Then I click on "submit" button
    And I open "attributes/grid" page

  Scenario: Add image attribute with local scope and edit
    When I fill the "attribute-code" input with the "img_attribute3" term
    And I choose 3 option from "attribute-type" select field
    And I choose 0 option from "attribute-scope" select field
    Then I can see "Configuration" text on "modal" element
    When I click on "proceed" button
    Then I send a "POST" request and status code should be 201
    And I see "attributes/attribute/%UUID%/general" page
    And Element "attribute-group" is "visible"
    And I choose "[0]" options from "attribute-group" multi select field
    Then I choose 1 option from "attribute-scope" select field
    And Element "title-bar-header" is "visible"
    # Then I can see "img_attribute" text on "title-bar-header" element
    When I click tab with "Translations" text
    Then I choose "[1]" options from "translation-language-select" multi select field
    And I fill the "attribute-label" input with the "attribute_img_label_EN" term for "en_GB" translation
    And I fill the "attribute-hint" textarea with the "attribute_img_hint_EN" term for "en_GB" translation
    And I fill the "attribute-label" input with the "attribute_img_label_PL" term for "pl_PL" translation
    And I fill the "attribute-hint" textarea with the "attribute_img_hint_PL" term for "pl_PL" translation
    Then I click on "submit" button
    And I open "attributes/grid" page
