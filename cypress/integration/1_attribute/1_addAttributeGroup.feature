Feature: Attribute group adding
  This feature allows adding attribute groups

  Background:
    Given I open "attribute-groups/grid" page
    When I click on "new-attribute-group" button
    Then Element "modal" is "visible"

  Scenario: Add attribute group and delete by request
    When I fill the "attribute-group-code" input with the "text_attribute_group" term
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    And I open "attribute-groups/grid" page
    Then On "grid" I can see row with "text_attribute_group" value and columns data: "{'0': 'text_attribute_group', '2': '0'}"
    And On "grid" I click on "delete" button for row with "text_attribute_group" value
    Then I close modal by button
    And I remove "this" element by "DELETE" request

  Scenario: Add attribute group and delete by grid button
    When I fill the "attribute-group-code" input with the "text_attribute_group2" term
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    And I open "attribute-groups/grid" page
    Then On "grid" I can see row with "text_attribute_group2" value and columns data: "{'0': 'text_attribute_group2', '2': '0'}"
    And On "grid" I click on "delete" button for row with "text_attribute_group2" value
    Then I confirm modal
    And On "grid" I can not see row with "text_attribute_group2" value

  Scenario: Add attribute group and delete from edit
    When I fill the "attribute-group-code" input with the "text_attribute_group3" term
    When On "modal" element I click button with "CREATE & EDIT" text
    Then I send a "POST" request and status code should be 201
    And I see "attribute-groups/group/%UUID%/general" page
    Then Element "attribute-group-code" is "visible"
    Then Element "title-bar-header" is "visible"
    Then I can see "text_attribute_group3" text on "title-bar-header" element
    When I click on "delete-attribute-group" button
    Then I confirm modal
    And I see "attribute-groups/grid" page

  Scenario: Add attribute group for use in attribute
    When I fill the "attribute-group-code" input with the "attribute_group" term
    And On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    And I open "attribute-groups/grid" page
    Then On "grid" I can see row with "attribute_group" value and columns data: "{'0': 'attribute_group', '2': '0'}"
    And On "grid" I click on "edit" button for row with "attribute_group" value
    And I see "attribute-groups/group/%UUID%/general" page
    Then I click tab with "Translations" text
    And I choose "[1]" option from "translation-language-select" multi select field
    Then I fill the "attribute-group-name" input with the "attribute_group_EN" term for "en_GB" translation
    And I fill the "attribute-group-name" input with the "attribute_group_PL" term for "pl_PL" translation
    And I click on "submit" button
