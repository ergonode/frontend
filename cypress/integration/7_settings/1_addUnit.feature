Feature: Unit adding
  This feature allows adding unit

  Background:
    Given I open "settings/units" page
    When I click on "new-unit" button
    Then Element "modal" is "visible"

  Scenario: Add unit and remove it by request
    When I fill the "unit-name" input with the "unit_1" term
    And I fill the "unit-symbol" input with the "u_1" term
    When I click on "submit" button
    Then I send a "POST" request and status code should be 201
    Then On "grid" I can see row with "unit_1" value and columns data: "{'0': 'unit_1'}"
    And On "grid" I click on "delete" button for row with "unit_1" value
    Then I close modal by button
    And I remove element by request

  Scenario: Add unit and delete by grid button
    When I fill the "unit-name" input with the "unit_2" term
    And I fill the "unit-symbol" input with the "u_2" term
    When I click on "submit" button
    Then I send a "POST" request and status code should be 201
    Then On "grid" I can see row with "unit_2" value and columns data: "{'0': 'unit_2'}"
    And On "grid" I click on "delete" button for row with "unit_2" value
    Then I confirm modal
    And On "grid" I can not see row with "unit_2" value

  Scenario: Add unit and delete from edit
    When I fill the "unit-name" input with the "unit_3" term
    And I fill the "unit-symbol" input with the "u_3" term
    When I click on "proceed" button
    Then I send a "POST" request and status code should be 201
    And I see "settings/units/unit/%UUID%/general" page
    Then Element "unit-name" is "visible"
    Then Element "unit-symbol" is "visible"
    Then Element "title-bar-header" is "visible"
    When I click on "delete-unit" button
    Then I confirm modal
    And I see "settings/units" page

  Scenario: Add unit and edit
    When I fill the "unit-name" input with the "unit_4" term
    And I fill the "unit-symbol" input with the "u_4" term
    And I click on "proceed" button
    Then I send a "POST" request and status code should be 201
    And I see "settings/units/unit/%UUID%/general" page
    Then Element "unit-name" is "visible"
    Then Element "unit-symbol" is "visible"
