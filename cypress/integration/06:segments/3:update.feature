@update
Feature: UPDATE: Segment
  This feature allows update segment

  Background:
    Given I open "segments/grid" page

  # FIXME: Add too long string validation
  # @error
  # Scenario: Update segment from edit page - validation error (too long string)
  #   When On "grid" I can see row with "segment_code" value and columns data: "{'0': 'segment_code', '1': '',  '2': '',  '4': '0'}"
  #   * On "grid" I click on "edit" button for row with "segment_code" value
  #   * I see "segments/segment/%UUID%/general" page
  #   * I click tab with "Translations" text
  #   * I see "segments/segment/%UUID%/translations" page
  #   * I fill the "segment-name" input with the "segment_codesegment_codesegment_codesegment_codesegment_codesegment_codesegment_codesegment_codesegment_code" term for "en_GB" translation
  #   * I "submit" the data and "update" is "incorrect"
  #   Then I see a form validation error that says "['Segment name is too long. It should contain 32 characters or less.']"

  @success
  Scenario: Update segment from edit page - success
    When On "grid" I can see row with "segment_code" value and columns data: "{'0': 'segment_code', '1': '',  '2': '',  '4': '0'}"
    * On "grid" I click on "edit" button for row with "segment_code" value
    * I see "segments/segment/%UUID%/general" page
    * I click tab with "Translations" text
    * I see "segments/segment/%UUID%/translations" page
    * I choose "[1]" option from "translation-language-select" multi select field
    * I fill the "segment-name" input with the "segment_EN" term for "en_GB" translation
    * I fill the "segment-description" textarea with the "segment_desc_EN" term for "en_GB" translation
    * I fill the "segment-name" input with the "segment_PL" term for "pl_PL" translation
    * I fill the "segment-description" textarea with the "segment_desc_PL" term for "pl_PL" translation
    * I "submit" the data and "update" is "correct"
    * I click back arrow
    * I see "segments/grid" page
    Then On "grid" I can see row with "segment_code" value and columns data: "{'0': 'segment_code', '1': 'segment_EN',  '2': 'segment_desc_EN',  '4': '0'}"
