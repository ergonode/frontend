Feature: Attribute adding
  This feature allows adding attributes

  Background:
    Given I am authenticated as "admin"
    Given I open "attributes/grid" page
    When I click on "new-attribute" button
    Then Element "modal" is "visible"

  Scenario: Add text attibute with local scope
    When I fill the "attribute-code" input with the "text_attribute" term
    And I choose 6 option from "attribute-type" select field
    And I choose 1 option from "attribute-scope" select field
    Then I can see "Configuration" text on "modal" element
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then I close modal
    # Then On "grid" I can see row 0 with columns data: "{'1': 'text_attribute', '3': 'Text', '4': 'local'}"
    And I remove "this" element by "DELETE" request

  Scenario: Add textarea attibute with local scope
    When I fill the "attribute-code" input with the "textarea_attribute" term
    And I choose 7 option from "attribute-type" select field
    And I choose 1 option from "attribute-scope" select field
    Then I can see "Configuration" text on "modal" element
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then I close modal
    # Then On "grid" I can see row 0 with columns data: "{'1': 'textarea_attribute', '3': 'Textarea', '4': 'local'}"
    And I remove "this" element by "DELETE" request

  Scenario: Add numeric attibute with global scope
    When I fill the "attribute-code" input with the "numeric_attribute" term
    And I choose 3 option from "attribute-type" select field
    And I choose 0 option from "attribute-scope" select field
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then I close modal
    # Then On "grid" I can see row 0 with columns data: "{'1': 'numeric_attribute', '3': 'Numeric', '4': 'global'}"
    And I remove "this" element by "DELETE" request

  Scenario: Add price attibute with global scope
    When I fill the "attribute-code" input with the "price_attribute" term
    And I choose 4 option from "attribute-type" select field
    And I choose 0 option from "attribute-scope" select field
    Then I can see "Configuration" text on "modal" element
    And I choose 0 option from "attribute-params" select field
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then I close modal
    # Then On "grid" I can see row 0 with columns data: "{'1': 'price_attribute', '3': 'Price', '4': 'global'}"
    And I remove "this" element by "DELETE" request

  Scenario: Add date attibute with local scope
    When I fill the "attribute-code" input with the "date_attribute" term
    And I choose 0 option from "attribute-type" select field
    And I choose 1 option from "attribute-scope" select field
    Then I can see "Configuration" text on "modal" element
    And I choose 0 option from "attribute-params" select field
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then I close modal
    # Then On "grid" I can see row 0 with columns data: "{'1': 'date_attribute', '3': 'Date', '4': 'local'}"
    And I remove "this" element by "DELETE" request

  Scenario: Add unit attibute with local scope
    When I fill the "attribute-code" input with the "unit_attribute" term
    And I choose 8 option from "attribute-type" select field
    And I choose 1 option from "attribute-scope" select field
    Then I can see "Configuration" text on "modal" element
    And I choose 0 option from "attribute-params" select field
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then I close modal
    # Then On "grid" I can see row 0 with columns data: "{'1': 'unit_attribute', '3': 'Unit', '4': 'local'}"
    And I remove "this" element by "DELETE" request

  Scenario: Add image attibute with global scope
    When I fill the "attribute-code" input with the "image_attribute" term
    And I choose 1 option from "attribute-type" select field
    And I choose 1 option from "attribute-scope" select field
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then I close modal
    # Then On "grid" I can see row 0 with columns data: "{'1': 'image_attribute', '3': 'Image', '4': 'global'}"
    And I remove "this" element by "DELETE" request

