Feature: Segment adding
  This feature allows adding segment

  Background:
    Given I am authenticated as "admin"
    Given I open "segments/grid" page
    When I click on "new-segment" button
    Then Element "modal" is "visible"

  Scenario: Add segment and delete by request
    When I fill the "segment-code" input with the "segment_1" term
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then On "grid" I can see row 0 with columns data: "{'0': 'segment_1', '4': '0'}"
    And On "grid" I click on "delete" button for row 0
    Then I close modal by button
    And I remove "this" element by "DELETE" request

  Scenario: Add segment and delete by grid button
    When I fill the "segment-code" input with the "segment_2" term
    When On "modal" element I click button with "CREATE" text
    Then I send a "POST" request and status code should be 201
    Then On "grid" I can see row 0 with columns data: "{'0': 'segment_2', '4': '0'}"
    And On "grid" I click on "delete" button for row 0
    Then I confirm modal
    And On "grid" I can not see row 0 with columns data: "{'0': 'segment_2'}"

  Scenario: Add segment and delete from edit
    When I fill the "segment-code" input with the "segment_3" term
    When On "modal" element I click button with "CREATE & EDIT" text
    Then I send a "POST" request and status code should be 201
    And I see "segments/segment/%UUID%/general" page
    Then Element "segment-code" is "visible"
    Then Element "title-bar-header" is "visible"
    Then I can see "segment_3" text on "title-bar-header" element
    When I click on "delete-segment" button
    Then I confirm modal
    And I see "segments/grid" page

  Scenario: Add segment1 for use
    When I fill the "segment-code" input with the "segment_1" term
    And On "modal" element I click button with "CREATE & EDIT" text
    Then I send a "POST" request and status code should be 201
    And I see "segments/segment/%UUID%/general" page
    Then I click tab with "Translations" text
    And I choose "[1]" options from "translation-language-select" multi select field
    Then I fill the "segment-name" input with the "segment_label_1_EN" term for "en" translation
    Then I fill the "segment-description" textarea with the "segment_description_1_EN" term for "en" translation
    And I fill the "segment-name" input with the "segment_label_1_PL" term for "pl" translation
    Then I fill the "segment-description" textarea with the "segment_description_1_PL" term for "pl" translation
    And I click on "save-segment" button
