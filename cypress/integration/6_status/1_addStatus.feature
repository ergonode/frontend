Feature: Status adding
  This feature allows adding status

  Background:
    Given I open "product-statuses/grid" page
    When I click on "new-status" button
    Then Element "modal" is "visible"

  Scenario: Add status and remove it from Grid
    When I fill the "status-code" input with the "status_4" term
    And I choose 0 option from "status-color" color picker field
    When I click on "submit" button
    Then I send a "POST" request and status code should be 201
    And I open "product-statuses/grid" page
    Then On "grid" I can see row with "status_4" value and columns data: "{'0': 'status_4'}"
    And On "grid" I click on "delete" button for row with "status_4" value
    Then I close modal by button
    And I remove element by "DELETE" request

  Scenario: Add status and delete by grid button
    When I fill the "status-code" input with the "status_5" term
    And I choose 4 option from "status-color" color picker field
    When I click on "submit" button
    Then I send a "POST" request and status code should be 201
    And I open "product-statuses/grid" page
    Then On "grid" I can see row with "status_5" value and columns data: "{'0': 'status_5'}"
    And On "grid" I click on "delete" button for row with "status_5" value
    Then I confirm modal
    And On "grid" I can not see row with "status_5" value

  Scenario: Add status and delete from edit
    When I fill the "status-code" input with the "status_6" term
    And I choose 6 option from "status-color" color picker field
    When I click on "proceed" button
    Then I send a "POST" request and status code should be 201
    And I see "product-statuses/status/%UUID%/general" page
    Then Element "status-code" is "visible"
    Then Element "title-bar-header" is "visible"
    Then I can see "status_6" text on "title-bar-header" element
    When I click on "delete-status" button
    Then I confirm modal
    And I see "product-statuses/grid" page

  Scenario: Add status for use
    When I fill the "status-code" input with the "status_done" term
    And I choose 6 option from "status-color" color picker field
    And I click on "proceed" button
    Then I send a "POST" request and status code should be 201
    And I see "product-statuses/status/%UUID%/general" page
    Then I click tab with "Translations" text
    And I choose "[1]" options from "translation-language-select" multi select field
    Then I fill the "status-name" input with the "status-name_done_EN" term for "en_GB" translation
    Then I fill the "status-description" textarea with the "status-description_done_EN" term for "en_GB" translation
    And I fill the "status-name" input with the "status-name_done_PL" term for "pl_PL" translation
    Then I fill the "status-description" textarea with the "status-description_done_PL" term for "pl_PL" translation
    And I click on "submit" button
