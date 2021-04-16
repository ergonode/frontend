@create
Feature: CREATE: Attributes
  This feature allows create attributes

  Background:
    Given I open "attributes/grid" page
    When I click on "new-attribute" button
    Then Element "modal" is visible

  @other
  Scenario: Close modal
    When I close modal
    Then Element "modal" not exist

  @success
  Scenario Outline: Add <type_txt> attribute - success
    When I choose <type> option from "attribute-type" select field
    * I fill the "attribute-code" input with the "<name>" term
    * I choose <scope> option from "attribute-scope" select field
    * I choose "[0]" options from "attribute-groups" multi select field
    Then I click on "submit" button
    * I send a "POST" request and status code should be 201
    * I open "attributes/grid" page
    Then On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '3': '<type_txt>', '4': '<scope_txt>'}"

    Examples:
      | name                | type | type_txt | scope | scope_txt |
      | textarea_attribute  | 9    | Textarea | 0     | global    |
      | text_attribute      | 8    | Text     | 0     | global    |
      | numeric_attribute   | 5    | Numeric  | 0     | global    |
      | image_attribute     | 3    | Image    | 0     | global    |
      | gallery_attribute   | 2    | Gallery  | 0     | global    |
      | file_attribute      | 1    | File     | 0     | global    |

  @success
  Scenario Outline: Add <type_txt> attribute with params - success
    When I choose <type> option from "attribute-type" select field
    * I fill the "attribute-code" input with the "<name>" term
    * I choose <scope> option from "attribute-scope" select field
    * I choose "[0]" options from "attribute-groups" multi select field
    * I choose <param> option from "attribute-params" select field
    Then I click on "proceed" button
    * I send a "POST" request and status code should be 201
    * I see "attributes/attribute/%UUID%/general" page
    * Element "attribute-code" is visible
    * Element "title-bar-header" is visible
    Then I can see "attribute-code" input with the "<name>" term

    Examples:
      | name             | type | type_txt | scope | scope_txt | param |
      | price_attribute  | 6    | Price    | 1     | local     | 0     |
      | date_attribute   | 0    | Date     | 1     | local     | 1     |
      | unit_attribute   | 10   | Unit     | 1     | local     | 0     |

  @success
  Scenario Outline: Add <type_txt> attribute with options - success
    When I choose <type> option from "attribute-type" select field
    * I fill the "attribute-code" input with the "<name>" term
    * I choose <scope> option from "attribute-scope" select field
    * I choose "[0]" options from "attribute-groups" multi select field
    * Element "attribute-add-options" is visible
    * On "attribute-add-options" element I click button with "ADD OPTION" text
    * I fill the "attribute-option-0" input with the "<option1>" term
    * On "attribute-add-options" element I click button with "ADD OPTION" text
    * I fill the "attribute-option-1" input with the "<option2>" term
    Then I click on "submit" button
    * I send a "POST" request and status code should be 201
    * I open "attributes/grid" page
    Then On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '3': '<type_txt>', '4': '<scope_txt>'}"

  Examples:
    | name                   | type | type_txt     | scope | scope_txt | option1 | option2 |
    | select_attribute       | 7    | Select       | 0     | global    | o1      | o2      |
    | multiselect_attribute  | 4    | Multi select | 0     | global    | opt1    | opt2    |

  @error
  Scenario: Add attribute - duplication error
    When I choose 8 option from "attribute-type" select field
    * I fill the "attribute-code" input with the "text_attribute" term
    * I choose 0 option from "attribute-scope" select field
    * I choose "[0]" options from "attribute-groups" multi select field
    * I click on "submit" button
    * I send a "POST" request and status code should be 400
    * I see a form validation error that says "['The value is not unique.']"
    Then I close modal

  @error
  Scenario: Add attribute - validation error (empty type)
    When I click on "submit" button
    * I send a "POST" request and status code should be 400
    * I see a form validation error that says "['Type of attribute is required']"
    Then I close modal

  # FIXME: Wrong validation message for `format` field
  @error
  Scenario: Add attribute - validation error (empty other fields)
    When I choose 0 option from "attribute-type" select field
    * I click on "submit" button
    * I send a "POST" request and status code should be 400
    * I see a form validation error that says "['System name is required', 'Attribute scope is required', 'This value should not be blank.']"
    Then I close modal

  # FIXME: Wront validation message - replace other message with the option message
  # NOTE: When option is select, request not send
  @error
  Scenario: Add attribute - validation error (empty option fields)
    When I choose 7 option from "attribute-type" select field
    * On "attribute-add-options" element I click button with "ADD OPTION" text
    * I click on "submit" button
    * I see a form validation error that says "['Option cannot be empty']"
    Then I close modal

  @error
  Scenario: Add attribute - validation error (misc code)
    When I choose 8 option from "attribute-type" select field
    * I fill the "attribute-code" input with the "@#$%()" term
    * I choose 1 option from "attribute-scope" select field
    * I click on "submit" button
    * I send a "POST" request and status code should be 400
    * I see a form validation error that says "['System name can have only letters, digits or underscore symbol']"
    * I close modal
    Then On "grid" I can not see row with "@#$%()" value

  @error
  Scenario: Add attribute - validation error (too long code)
    When I choose 8 option from "attribute-type" select field
    * I fill the "attribute-code" input with the "text_attribute_text_text_attribute_text_text_attribute_text_text_attribute_text_text_attribute_text_text_attribute_text_text_attribute_text_" term
    * I choose 1 option from "attribute-scope" select field
    * I click on "submit" button
    * I send a "POST" request and status code should be 400
    * I see a form validation error that says "['System name is too long. It should contain 128 characters or less.']"
    * I close modal
    Then On "grid" I can not see row with "text_attribute_text_text_attribute_text_text_attribute_text_text_attribute_text_text_attribute_text_text_attribute_text_text_attribute_text_" value
