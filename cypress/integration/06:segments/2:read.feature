@read
Feature: READ: Segments
  This feature allows read categories

  Background:
    Given I open "segments/grid" page

  @success
  Scenario: Read segments on grid - success
    When I can see "Segments" text on "title-bar-header" element
    * On "grid" I can see row with "segment_code" value and columns data: "{'0': 'segment_code', '1': '',  '2': '',  '4': '0'}"
    * On "grid" I can see row with "segment_code2" value and columns data: "{'0': 'segment_code2', '1': '',  '2': '',  '4': '0'}"

  @success
  Scenario: Read category general - success
    When On "grid" I can see row with "segment_code" value and columns data: "{'0': 'segment_code', '1': '',  '2': '',  '4': '0'}"
    * On "grid" I click on "edit" button for row with "segment_code" value
    * I see "segments/segment/%UUID%/general" page
    * Element "title-bar-header" is visible
    * I can see "segment_code" text on "title-bar-header" element
    * Element "segment-code" is visible
    * I can see "segment-code" input with the "segment_code" term
    * I can see "segment-code" field as disabled
    Then I click back arrow
    * I see "segments/grid" page

  @success
  Scenario: Read segment translation - success
    When On "grid" I can see row with "segment_code" value and columns data: "{'0': 'segment_code', '1': '',  '2': '',  '4': '0'}"
    * On "grid" I click on "edit" button for row with "segment_code" value
    * I see "segments/segment/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "segments/segment/%UUID%/translations" page
    * I choose "[1]" option from "translation-language-select" multi select field
    * I can see "segment-name_en_GB" input with the "" term
    * I can see "segment-name_en_GB" field as enabled
    * I can see "segment-description_en_GB" textarea with the "" term
    * I can see "segment-description_en_GB" field as enabled
    * I can see "segment-name_pl_PL" input with the "" term
    * I can see "segment-name_pl_PL" field as enabled
    * I can see "segment-description_pl_PL" textarea with the "" term
    * I can see "segment-description_pl_PL" field as enabled
    Then I click back arrow
    * I see "segments/grid" page
