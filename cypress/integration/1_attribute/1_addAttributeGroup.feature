Feature: Attribute group adding
  This feature allows adding attribute groups

  Background:
    Given I am authenticated as "admin"
    Given I open "attribute-groups/grid" page
    When I click on "newAttributeGroup" button
    Then Element "modal" is "visible"

  Scenario: Add attibute group
    When I fill the "attributeGroupName" input with the "text_attribute_group" term
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then I close modal
    Then On "grid" I can see row 0 with columns data: "{'0': 'text_attribute_group', '2': '0'}"

  Scenario: Add attibute group 2
    When I fill the "attributeGroupName" input with the "text_attribute_group2" term
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then I close modal
    Then On "grid" I can see row 1 with columns data: "{'0': 'text_attribute_group2', '2': '0'}"
    And I remove "this" element by "DELETE" request
