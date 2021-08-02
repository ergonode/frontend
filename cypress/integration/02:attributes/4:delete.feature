@delete
Feature: DELETE: Attributes
  This feature allows delete attributes

  Background:
    Given I open "attributes/grid" page

  @other
  Scenario: Delete attribute by grid button - give up
    When On "grid" I can see row with "text_attribute" value and columns data: "{'1': 'text_attribute', '3': 'Text'}"
    * On "grid" I click on "delete" button for row with "text_attribute" value
    * Element "modal" is visible
    * I close modal by button
    Then Element "modal" not exist

  @other
  Scenario: Delete attribute from edit page - give up
    When On "grid" I can see row with "text_attribute" value and columns data: "{'1': 'text_attribute', '3': 'Text'}"
    * On "grid" I click on "edit" button for row with "text_attribute" value
    * I see "attributes/attribute/%UUID%/general" page
    * Element "attribute-code" is visible
    * Element "title-bar-header" is visible
    * I can see "attribute-code" input with the "text_attribute" term
    * I can see "attribute-code" field as disabled
    * I click on "delete-attribute" button
    * I close modal
    Then I see "attributes/attribute/%UUID%/general" page

  @success
  Scenario Outline: Delete <type_txt> attribute by grid button - success
    When On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '3': '<type_txt>'}"
    * On "grid" I click on "delete" button for row with "<name>" value
    * I confirm modal
    Then On "grid" I can not see row with "<name>" value

    Examples:
      | name                   | type_txt     |
      | date_attribute         | Date         |
      | file_attribute         | File         |
      | gallery_attribute      | Gallery      |
      | image_attribute        | Image        |
      | multiselect_attribute  | Multi select |

  @success
  Scenario Outline: Delete <type_txt> attribute from edit page - success
    When On "grid" I can see row with "<name>" value and columns data: "{'1': '<name>', '3': '<type_txt>'}"
    * On "grid" I click on "edit" button for row with "<name>" value
    * I see "attributes/attribute/%UUID%/general" page
    * Element "attribute-code" is visible
    * Element "title-bar-header" is visible
    * I can see "attribute-code" input with the "<name>" term
    * I can see "attribute-code" field as disabled
    * I click on "delete-attribute" button
    * I confirm modal
    Then I see "attributes/grid" page

    Examples:
      | name               | type_txt |
      | numeric_attribute  | Numeric  |
      | price_attribute    | Price    |
      | select_attribute   | Select   |
      | text_attribute     | Text     |
      | textarea_attribute | Textarea |
      | unit_attribute     | Unit     |
