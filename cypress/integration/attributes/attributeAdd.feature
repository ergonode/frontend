Feature: Attribute adding
  This feature allows adding attributes

  Background:
    Given I am authenticated as "admin"
    Given I open "attributes/grid" page
    When I click on "newAttribute" button
    Then Element "modal" is "visible"

  Scenario: Add text attibute
    When I fill the "attributeName" input with the "text_attribute" term
    And I choose "0" option from "attributeType" select
    Then I can see "Configuration" text on "modal" element
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then I close modal
    Then On "grid" I can see 0 row with data on column: "{'1': 'text_attribute', '3': 'Text', '4': 'true'}"
    And I remove "this" element by "DELETE" request

  Scenario: Add not multilingual text attibute
    When I fill the "attributeName" input with the "text_attribute2" term
    And I choose "0" option from "attributeType" select
    Then I can see "Configuration" text on "modal" element
    And I click "attributeMultilingual" check
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then I close modal
    Then On "grid" I can see 0 row with data on column: "{'1': 'text_attribute2', '3': 'Text', '4': 'false'}"
    And I remove "this" element by "DELETE" request

  Scenario: Add textarea attibute
    When I fill the "attributeName" input with the "textarea_attribute" term
    And I choose "1" option from "attributeType" select
    Then I can see "Configuration" text on "modal" element
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then I close modal
    Then On "grid" I can see 0 row with data on column: "{'1': 'textarea_attribute', '3': 'Textarea', '4': 'true'}"
    And I remove "this" element by "DELETE" request

  Scenario: Add not multilingual textarea attibute
    When I fill the "attributeName" input with the "textarea_attribute2" term
    And I choose "1" option from "attributeType" select
    Then I can see "Configuration" text on "modal" element
    And I click "attributeMultilingual" check
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then I close modal
    Then On "grid" I can see 0 row with data on column: "{'1': 'textarea_attribute2', '3': 'Textarea', '4': 'false'}"
    And I remove "this" element by "DELETE" request

  Scenario: Add numeric attibute
    When I fill the "attributeName" input with the "numeric_attribute" term
    And I choose "2" option from "attributeType" select
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then I close modal
    Then On "grid" I can see 0 row with data on column: "{'1': 'numeric_attribute', '3': 'Numeric', '4': 'false'}"
    And I remove "this" element by "DELETE" request

  Scenario: Add price attibute
    When I fill the "attributeName" input with the "price_attribute" term
    And I choose "5" option from "attributeType" select
    Then I can see "Configuration" text on "modal" element
    And I choose "0" option from "attributeParams" select
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then I close modal
    Then On "grid" I can see 0 row with data on column: "{'1': 'price_attribute', '3': 'Price', '4': 'false'}"
    And I remove "this" element by "DELETE" request

  Scenario: Add date attibute
    When I fill the "attributeName" input with the "date_attribute" term
    And I choose "6" option from "attributeType" select
    Then I can see "Configuration" text on "modal" element
    And I choose "0" option from "attributeParams" select
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then I close modal
    Then On "grid" I can see 0 row with data on column: "{'1': 'date_attribute', '3': 'Date', '4': 'false'}"
    And I remove "this" element by "DELETE" request

  Scenario: Add unit attibute
    When I fill the "attributeName" input with the "unit_attribute" term
    And I choose "7" option from "attributeType" select
    Then I can see "Configuration" text on "modal" element
    And I choose "0" option from "attributeParams" select
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then I close modal
    Then On "grid" I can see 0 row with data on column: "{'1': 'unit_attribute', '3': 'Unit', '4': 'false'}"
    And I remove "this" element by "DELETE" request

  Scenario: Add image attibute
    When I fill the "attributeName" input with the "image_attribute" term
    And I choose "8" option from "attributeType" select
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then I close modal
    Then On "grid" I can see 0 row with data on column: "{'1': 'image_attribute', '3': 'Image', '4': 'false'}"
    And I remove "this" element by "DELETE" request

