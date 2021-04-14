@update
Feature: UPDATE: Attributes
  This feature allows update attributes

  Background:
    Given I open "attributes/grid" page

  @error
  Scenario Outline: Update <type_txt> attribute from edit page - validation error (too long string)
    When On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '3': '<type_txt>', '4': '<scope_txt>'}"
    * On "grid" I click on "edit" button for row with "<name>" value
    * I see "attributes/attribute/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "attributes/attribute/%UUID%/translations" page
    * I fill the "attribute-label" input with the "text_attribute_text_attribute_text_attribute_text_attribute_text_attribute_text_attribute_text_attribute_text_attribute_text_attribute_" term for "en_GB" translation
    Then I click on "submit" button
    * I send a "PUT" request and status code should be 400
    Then I see a form validation error that says "['Attribute name is too long. It should contain 128 characters or less.']"

    Examples:
      | name                   | type_txt     | scope_txt |
      | textarea_attribute     | Textarea     | global    |
      | text_attribute         | Text         | global    |
      | numeric_attribute      | Numeric      | global    |
      | price_attribute        | Price        | global    |
      | date_attribute         | Date         | global    |
      | unit_attribute         | Unit         | global    |
      | gallery_attribute      | Gallery      | global    |
      | image_attribute        | Image        | global    |
      | file_attribute         | File         | global    |
      | select_attribute       | Select       | global    |
      | multiselect_attribute  | Multi select | global    |

  @success
  Scenario Outline: Update <type_txt> attribute - success
    When On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '3': '<type_txt>', '4': '<scope_old>'}"
    * On "grid" I click on "edit" button for row with "<name>" value
    * I see "attributes/attribute/%UUID%/general" page
    * I choose <scope> option from "attribute-scope" select field
    * I choose "[0,1]" options from "attribute-groups" multi select field
    Then I click on "submit" button
    * I send a "PUT" request and status code should be 204
    * I open "attributes/grid" page
    Then On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '3': '<type_txt>', '4': '<scope_new>'}"

    Examples:
      | name                | type_txt | scope | scope_old | scope_new |
      | textarea_attribute  | Textarea | 1     | global    | local     |
      | text_attribute      | Text     | 1     | global    | local     |
      | numeric_attribute   | Numeric  | 1     | global    | local     |
      | image_attribute     | Image    | 1     | global    | local     |
      | gallery_attribute   | Gallery  | 1     | global    | local     |
      | file_attribute      | File     | 1     | global    | local     |

  @success
  Scenario Outline: Update <type_txt> attribute - success
    When On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '3': '<type_txt>', '4': '<scope_old>'}"
    * On "grid" I click on "edit" button for row with "<name>" value
    * I see "attributes/attribute/%UUID%/general" page
    * I choose <scope> option from "attribute-scope" select field
    * I choose "[0,1]" options from "attribute-groups" multi select field
    * I choose 3 option from "attribute-params" select field
    Then I click on "submit" button
    * I send a "PUT" request and status code should be 204
    * I open "attributes/grid" page
    Then On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '3': '<type_txt>', '4': '<scope_new>'}"

    Examples:
      | name                | type_txt | scope | scope_old | scope_new |
      | price_attribute     | Price    | 1     | global    | local     |
      | date_attribute      | Date     | 1     | global    | local     |
      | unit_attribute      | Unit     | 1     | global    | local     |

  @success
  Scenario Outline: Update <type_txt> attribute with options - success
    When On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '3': '<type_txt>', '4': '<scope_old>'}"
    * On "grid" I click on "edit" button for row with "<name>" value
    * I see "attributes/attribute/%UUID%/general" page
    * I choose <scope> option from "attribute-scope" select field
    * I choose "[0]" options from "attribute-groups" multi select field
    * Element "attribute-add-options" is visible
    * I fill the "attribute-option-0" input with the "<option1>" term
    * I fill the "attribute-option-1" input with the "<option2>" term
    * On "attribute-add-options" element I click button with "ADD OPTION" text
    * I fill the "attribute-option-2" input with the "new_option3" term
    Then I click on "submit" button
    * I send a "PUT" request and status code should be 204
    * I open "attributes/grid" page
    Then On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '3': '<type_txt>', '4': '<scope_new>'}"

  Examples:
    | name                  | type_txt     | scope | scope_old | scope_new | option1  | option2  |
    | select_attribute      | Select       | 1     | global    | local     | o1_new   | o2_new   |
    | multiselect_attribute | Multi select | 1     | global    | local     | opt1_new | opt2_new |

  @success
  Scenario Outline: Update <type_txt> attribute from edit page - success
    When On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '2':'', '3': '<type_txt>', '4': '<scope_txt>'}"
    * On "grid" I click on "edit" button for row with "<name>" value
    * I see "attributes/attribute/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "attributes/attribute/%UUID%/translations" page
    * I choose "[1]" option from "translation-language-select" multi select field
    * I fill the "attribute-label" input with the "<type_txt>_label_EN" term for "en_GB" translation
    * I fill the "attribute-hint" textarea with the "<type_txt>_hint_EN" term for "en_GB" translation
    * I fill the "attribute-placeholder" textarea with the "<type_txt>_placeholder_EN" term for "en_GB" translation
    * I fill the "attribute-label" input with the "<type_txt>_label_PL" term for "pl_PL" translation
    * I fill the "attribute-hint" textarea with the "<type_txt>_hint_PL" term for "pl_PL" translation
    * I fill the "attribute-placeholder" textarea with the "<type_txt>_placeholder_PL" term for "pl_PL" translation
    Then I click on "submit" button
    * I send a "PUT" request and status code should be 204
    * I click back arrow
    * I see "attributes/grid" page
    Then On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '2':'<type_txt>_label_EN', '3': '<type_txt>', '4': '<scope_txt>'}"

    Examples:
      | name                | type_txt | scope_txt |
      | textarea_attribute  | Textarea | global    |
      | textarea_attribute2 | Textarea | local     |
      | text_attribute      | Text     | global    |
      | text_attribute2     | Text     | local     |
      | numeric_attribute   | Numeric  | global    |
      | numeric_attribute2  | Numeric  | local     |

  @success
  Scenario Outline: Update <type_txt> attribute from edit page - success
    When On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '2':'', '3': '<type_txt>', '4': '<scope_txt>'}"
    * On "grid" I click on "edit" button for row with "<name>" value
    * I see "attributes/attribute/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "attributes/attribute/%UUID%/translations" page
    * I choose "[1]" option from "translation-language-select" multi select field
    * I fill the "attribute-label" input with the "<type_txt>_label_EN" term for "en_GB" translation
    * I fill the "attribute-hint" textarea with the "<type_txt>_hint_EN" term for "en_GB" translation
    * I fill the "attribute-label" input with the "<type_txt>_label_PL" term for "pl_PL" translation
    * I fill the "attribute-hint" textarea with the "<type_txt>_hint_PL" term for "pl_PL" translation
    Then I click on "submit" button
    * I send a "PUT" request and status code should be 204
    * I click back arrow
    * I see "attributes/grid" page
    Then On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '2':'<type_txt>_label_EN', '3': '<type_txt>', '4': '<scope_txt>'}"

    Examples:
      | name                | type_txt | scope_txt |
      | price_attribute     | Price    | global    |
      | price_attribute2    | Price    | local     |
      | date_attribute      | Date     | global    |
      | date_attribute2     | Date     | local     |
      | unit_attribute      | Unit     | global    |
      | unit_attribute2     | Unit     | local     |
      | gallery_attribute   | Gallery  | global    |
      | gallery_attribute2  | Gallery  | local     |
      | image_attribute     | Image    | global    |
      | image_attribute2    | Image    | local     |
      | file_attribute      | File     | global    |
      | file_attribute2     | File     | local     |

  @success
  Scenario Outline: Update <type_txt> attribute from edit page - success
    When On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '2':'', '3': '<type_txt>', '4': '<scope_txt>'}"
    * On "grid" I click on "edit" button for row with "<name>" value
    * I see "attributes/attribute/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "attributes/attribute/%UUID%/translations" page
    * I choose "[1]" option from "translation-language-select" multi select field
    * I fill the "attribute-label" input with the "<type_txt>_label_EN" term for "en_GB" translation
    * I fill the "attribute-hint" textarea with the "<type_txt>_hint_EN" term for "en_GB" translation
    * I fill the "attribute-option" input for index 0 with the "<type_txt>_option_0_EN" term for "en_GB" translation
    * I fill the "attribute-option" input for index 1 with the "<type_txt>_option_1_EN" term for "en_GB" translation
    * I fill the "attribute-label" input with the "<type_txt>_label_PL" term for "pl_PL" translation
    * I fill the "attribute-hint" textarea with the "<type_txt>_hint_PL" term for "pl_PL" translation
    * I fill the "attribute-option" input for index 0 with the "<type_txt>_option_0_PL" term for "pl_PL" translation
    * I fill the "attribute-option" input for index 1 with the "<type_txt>_option_1_PL" term for "pl_PL" translation
    Then I click on "submit" button
    * I send a "PUT" option request and status code should be 201
    * I send a "PUT" request and status code should be 204
    * I click back arrow
    * I see "attributes/grid" page
    Then On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '2':'<type_txt>_label_EN', '3': '<type_txt>', '4': '<scope_txt>'}"

    Examples:
      | name                   | type_txt     | scope_txt |
      | select_attribute       | Select       | global    |
      | select_attribute2      | Select       | local     |
      | multiselect_attribute  | Multi select | global    |
      | multiselect_attribute2 | Multi select | local     |
