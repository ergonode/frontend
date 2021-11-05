@update
Feature: UPDATE: Attributes
  This feature allows update attributes

  Background:
    Given I open "attributes/grid" page

  @error
  Scenario Outline: Update <type_txt> attribute from edit page - validation error (too long string)
    When On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '3': '<type_txt>'}"
    * On "grid" I click on "edit" button for row with "<name>" value
    * I see "attributes/attribute/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "attributes/attribute/%UUID%/translations" page
    * I fill the "attribute-label" input with the "text_attribute_text_attribute_text_attribute_text_attribute_text_attribute_text_attribute_text_attribute_text_attribute_text_attribute_" term for "en_GB" translation
    * I "submit" the data and "update" is "incorrect"
    Then I see a form validation error that says "['Attribute name is too long. It should contain 128 characters or less.']"

    Examples:
      | name                   | type_txt     |
      | textarea_attribute     | Textarea     |
      | price_attribute        | Price        |
      | gallery_attribute      | Gallery      |
      | select_attribute       | Select       |

  @success
  Scenario Outline: Update <type_txt> attribute - success
    When On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '3': '<type_txt>', '4': '<scope_old>'}"
    * On "grid" I click on "edit" button for row with "<name>" value
    * I see "attributes/attribute/%UUID%/general" page
    * I choose "<scope_new>" option from "attribute-scope" select field
    * I choose "[0]" options from "attribute-groups" multi select field
    * I "submit" the data and "update" is "correct"
    * I click back arrow
    * I see "attributes/grid" page
    Then On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '3': '<type_txt>', '4': '<scope_new>'}"

    Examples:
      | name                | type_txt | scope_old | scope_new |
      | textarea_attribute  | Textarea | global    | local     |
      | numeric_attribute   | Numeric  | global    | local     |
      | image_attribute     | Image    | global    | local     |

  @success
  Scenario Outline: Update <type_txt> attribute - success
    When On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '3': '<type_txt>', '4': '<scope_old>'}"
    * On "grid" I click on "edit" button for row with "<name>" value
    * I see "attributes/attribute/%UUID%/general" page
    * I choose "<scope_new>" option from "attribute-scope" select field
    * I choose "[0]" options from "attribute-groups" multi select field
    * I "submit" the data and "update" is "correct"
    * I click back arrow
    * I see "attributes/grid" page
    Then On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '3': '<type_txt>', '4': '<scope_new>'}"

    Examples:
      | name                | type_txt | param     | scope_old | scope_new |
      | price_attribute     | Price    | US Dollar | local     | global    |
      | date_attribute      | Date     | 99-01-31  | local     | global    |
      | unit_attribute      | Unit     | Watt      | local     | global    |

  @success
  Scenario Outline: Update <type_txt> attribute with options - success
    When On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '3': '<type_txt>', '4': '<scope_old>'}"
    * On "grid" I click on "edit" button for row with "<name>" value
    * I see "attributes/attribute/%UUID%/general" page
    * I choose "<scope_new>" option from "attribute-scope" select field
    * I choose "[0]" options from "attribute-groups" multi select field
    * Element "attribute-add-options" is visible
    * I fill the "attribute-option-0" input with the "<option1>" term
    * I fill the "attribute-option-1" input with the "<option2>" term
    * On "attribute-add-options" element I click button with "ADD OPTION" text
    * I fill the "attribute-option-2" input with the "new_option3" term
    * I "submit" the data and "update" is "correct"
    * I click back arrow
    * I see "attributes/grid" page
    Then On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '3': '<type_txt>', '4': '<scope_new>'}"

  Examples:
    | name                  | type_txt     | scope_old | scope_new | option1  | option2  |
    | select_attribute      | Select       | global    | local     | o1_new   | o2_new   |
    | multiselect_attribute | Multi select | global    | local     | opt1_new | opt2_new |

  @success
  Scenario Outline: Update <type_txt> attribute from edit page - success
    When On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '2':'', '3': '<type_txt>', '4': '<scope_txt>'}"
    * On "grid" I click on "edit" button for row with "<name>" value
    * I see "attributes/attribute/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "attributes/attribute/%UUID%/translations" page
    * I fill the "attribute-label" input with the "<type_txt>_label_EN" term for "en_GB" translation
    * I fill the "attribute-hint" textarea with the "<type_txt>_hint_EN" term for "en_GB" translation
    * I fill the "attribute-placeholder" textarea with the "<type_txt>_placeholder_EN" term for "en_GB" translation
    # * I fill the "attribute-label" input with the "<type_txt>_label_PL" term for "pl_PL" translation
    # * I fill the "attribute-hint" textarea with the "<type_txt>_hint_PL" term for "pl_PL" translation
    # * I fill the "attribute-placeholder" textarea with the "<type_txt>_placeholder_PL" term for "pl_PL" translation
    * I "submit" the data and "update" is "correct"
    * I click back arrow
    * I see "attributes/grid" page
    Then On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '2':'<type_txt>_label_EN', '3': '<type_txt>', '4': '<scope_txt>'}"

    Examples:
      | name                | type_txt | scope_txt |
      | textarea_attribute  | Textarea | local    |

  @success
  Scenario Outline: Update <type_txt> attribute from edit page - success
    When On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '2':'', '3': '<type_txt>'}"
    * On "grid" I click on "edit" button for row with "<name>" value
    * I see "attributes/attribute/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "attributes/attribute/%UUID%/translations" page
    * I fill the "attribute-label" input with the "<type_txt>_label_EN" term for "en_GB" translation
    * I fill the "attribute-hint" textarea with the "<type_txt>_hint_EN" term for "en_GB" translation
    # * I fill the "attribute-label" input with the "<type_txt>_label_PL" term for "pl_PL" translation
    # * I fill the "attribute-hint" textarea with the "<type_txt>_hint_PL" term for "pl_PL" translation
    * I "submit" the data and "update" is "correct"
    * I click back arrow
    * I see "attributes/grid" page
    Then On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '2':'<type_txt>_label_EN', '3': '<type_txt>'}"

    Examples:
      | name                | type_txt |
      | price_attribute     | Price    |
      | gallery_attribute   | Gallery  |

  @success
  Scenario Outline: Update <type_txt> attribute from edit page - success
    When On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '2':'', '3': '<type_txt>', '4': '<scope_txt>'}"
    * On "grid" I click on "edit" button for row with "<name>" value
    * I see "attributes/attribute/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "attributes/attribute/%UUID%/translations" page
    * I fill the "attribute-label" input with the "<type_txt>_label_EN" term for "en_GB" translation
    * I fill the "attribute-hint" textarea with the "<type_txt>_hint_EN" term for "en_GB" translation
    * I fill the "attribute-option" input for index 0 with the "<type_txt>_option_0_EN" term for "en_GB" translation
    * I fill the "attribute-option" input for index 1 with the "<type_txt>_option_1_EN" term for "en_GB" translation
    # * I fill the "attribute-label" input with the "<type_txt>_label_PL" term for "pl_PL" translation
    # * I fill the "attribute-hint" textarea with the "<type_txt>_hint_PL" term for "pl_PL" translation
    # * I fill the "attribute-option" input for index 0 with the "<type_txt>_option_0_PL" term for "pl_PL" translation
    # * I fill the "attribute-option" input for index 1 with the "<type_txt>_option_1_PL" term for "pl_PL" translation
    * I "submit" the data and "update" is "correct"
    * I send a "PUT" option request and status code should be 200
    * I click back arrow
    * I see "attributes/grid" page
    Then On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '2':'<type_txt>_label_EN', '3': '<type_txt>', '4': '<scope_txt>'}"

    Examples:
      | name                   | type_txt     | scope_txt |
      | select_attribute       | Select       | local     |
      | multiselect_attribute  | Multi select | local     |
