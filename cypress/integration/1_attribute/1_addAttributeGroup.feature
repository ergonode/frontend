Feature: Attribute group adding
  This feature allows adding attribute groups

  Background:
    Given I open "attribute-groups/grid" page
    When I click on "new-attribute-group" button
    Then Element "modal" is "visible"

  Scenario: Add attibute group and delete by request
    When I fill the "attribute-group-code" input with the "text_attribute_group" term
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    And I open "attribute-groups/grid" page
    Then On "grid" I can see row 0 with columns data: "{'0': 'text_attribute_group', '2': '0'}"
    And On "grid" I click on "delete" button for row 0
    Then I close modal by button
    And I remove "this" element by "DELETE" request

  Scenario: Add attibute group and delete by grid button
    When I fill the "attribute-group-code" input with the "text_attribute_group2" term
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    And I open "attribute-groups/grid" page
    Then On "grid" I can see row 0 with columns data: "{'0': 'text_attribute_group2', '2': '0'}"
    And On "grid" I click on "delete" button for row 0
    Then I confirm modal
    And On "grid" I can not see row 0 with columns data: "{'0': 'text_attribute_group2'}"

  Scenario: Add attibute group and delete from edit
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

  Scenario: Add attibute group for use in attribute
    When I fill the "attribute-group-code" input with the "attribute_group" term
    And On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    And I open "attribute-groups/grid" page
    Then On "grid" I can see row 0 with columns data: "{'0': 'attribute_group', '2': '0'}"
    And On "grid" I click on "edit" button for row 0
    And I see "attribute-groups/group/%UUID%/general" page
    Then I click tab with "Translations" text
    And I choose "[1]" option from "translation-language-select" multi select field
    Then I fill the "attribute-group-name" input with the "attribute_group_EN" term for "en_GB" translation
    And I fill the "attribute-group-name" input with the "attribute_group_PL" term for "pl_PL" translation
    And I click on "save-attribute-group" button
