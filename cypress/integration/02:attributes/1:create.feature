@create
Feature: CREATE: Attributes
  This feature allows create attributes

  Background:
    Given I open "attributes/grid" page
    When I click on "new-attribute" button
    Then Element "modal" is visible

  @success
  Scenario Outline: Add <type_txt> attribute - success
    When I choose "<type_txt>" option from "attribute-type" select field
    * I fill the "attribute-code" input with the "<name>" term
    * I choose "<scope_txt>" option from "attribute-scope" select field
    * I choose "[0]" options from "attribute-groups" multi select field
    * On "modal" I "submit" the data and "create" is "correct"
    Then On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '3': '<type_txt>', '4': '<scope_txt>'}"

    Examples:
      | name               | type_txt | scope_txt |
      | textarea_attribute | Textarea | global    |
      | text_attribute     | Text     | global    |
      | numeric_attribute  | Numeric  | global    |
      | image_attribute    | Image    | global    |
      | gallery_attribute  | Gallery  | global    |
      | file_attribute     | File     | global    |

  @success
  Scenario Outline: Add <type_txt> attribute with params - success
    When I choose "<type_txt>" option from "attribute-type" select field
    * I fill the "attribute-code" input with the "<name>" term
    * I choose "<scope_txt>" option from "attribute-scope" select field
    * I choose "[0]" options from "attribute-groups" multi select field
    * I choose "<param>" option from "attribute-params" select field
    * On "modal" I "proceed" the data and "create" is "correct"
    * I see "attributes/attribute/%UUID%/general" page
    * Element "attribute-code" is visible
    * Element "title-bar-header" is visible
    Then I can see "attribute-code" input with the "<name>" term

    Examples:
      | name            | type_txt | scope_txt | param    |
      | price_attribute | Price    | local     | Euro     |
      | date_attribute  | Date     | local     | 31.01.99 |
      | unit_attribute  | Unit     | local     | Volt     |

  @success
  Scenario Outline: Add <type_txt> attribute with options - success
    When I choose "<type_txt>" option from "attribute-type" select field
    * I fill the "attribute-code" input with the "<name>" term
    * I choose "<scope_txt>" option from "attribute-scope" select field
    * I choose "[0]" options from "attribute-groups" multi select field
    * Element "attribute-add-options" is visible
    * On "attribute-add-options" element I click button with "ADD OPTION" text
    * I fill the "attribute-option-0" input with the "<option1>" term
    * On "attribute-add-options" element I click button with "ADD OPTION" text
    * I fill the "attribute-option-1" input with the "<option2>" term
    * On "modal" I "submit" the data and "create" is "correct"
    Then On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '3': '<type_txt>', '4': '<scope_txt>'}"

  Examples:
    | name                  | type_txt     | scope_txt | option1 | option2 |
    | select_attribute      | Select       | global    | o1      | o2      |
    | multiselect_attribute | Multi select | global    | opt1    | opt2    |

  @error
  Scenario: Add attribute - duplication error
    When I choose "Text" option from "attribute-type" select field
    * I fill the "attribute-code" input with the "text_attribute" term
    * I choose "global" option from "attribute-scope" select field
    * I choose "[0]" options from "attribute-groups" multi select field
    * On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['The value is not unique.']"
    Then I close modal

  @error
  Scenario: Add attribute - validation error (empty type)
    When On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['Type of attribute is required']"
    Then I close modal

  # FIXME: Wrong validation message for `format` field
  @error
  Scenario: Add attribute - validation error (empty other fields)
    When I choose "Date" option from "attribute-type" select field
    * On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['System name is required', 'Attribute scope is required', 'This value should not be blank.']"
    Then I close modal

  # FIXME: Wrong validation message - replace other message with the option message
  # NOTE: When option is select, request not send
  @error
  Scenario: Add attribute - validation error (empty option fields)
    When I choose "Select" option from "attribute-type" select field
    * On "attribute-add-options" element I click button with "ADD OPTION" text
    * I click on "submit" button
    * I see a form validation error that says "['Option cannot be empty']"
    Then I close modal

  @error
  Scenario: Add attribute - validation error (misc code)
    When I choose "Text" option from "attribute-type" select field
    * I fill the "attribute-code" input with the "@#$%()" term
    * I choose "local" option from "attribute-scope" select field
    * On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['System name can have only letters, digits or underscore symbol and it can`t be `id`']"
    * I close modal
    Then On "grid" I can not see row with "@#$%()" value

  @error
  Scenario: Add attribute - validation error (too long code)
    When I choose "Text" option from "attribute-type" select field
    * I fill the "attribute-code" input with the "text_attribute_text_text_attribute_text_text_attribute_text_text_attribute_text_text_attribute_text_text_attribute_text_text_attribute_text_" term
    * I choose "local" option from "attribute-scope" select field
    * On "modal" I "submit" the data and "create" is "incorrect"
    * I see a form validation error that says "['System name is too long. It should contain 128 characters or less.']"
    * I close modal
    Then On "grid" I can not see row with "text_attribute_text_text_attribute_text_text_attribute_text_text_attribute_text_text_attribute_text_text_attribute_text_text_attribute_text_" value
