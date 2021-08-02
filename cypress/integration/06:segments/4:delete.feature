@delete
Feature: DELETE: Segment
  This feature allows delete segment

  Background:
    Given I open "segments/grid" page

  @other
  Scenario: Delete segment by grid button - give up
    When On "grid" I can see row with "segment_code" value and columns data: "{'0': 'segment_code',  '4': '0'}"
    * On "grid" I click on "delete" button for row with "segment_code" value
    * Element "modal" is visible
    * I close modal by button
    Then Element "modal" not exist

  @other
  Scenario: Delete segment from edit page - give up
    When On "grid" I can see row with "segment_code2" value and columns data: "{'0': 'segment_code2',  '4': '0'}"
    * On "grid" I click on "edit" button for row with "segment_code2" value
    * I see "segments/segment/%UUID%/general" page
    * Element "segment-code" is visible
    * Element "title-bar-header" is visible
    * I can see "segment-code" input with the "segment_code2" term
    * I can see "segment-code" field as disabled
    * I click on "delete-segment" button
    * I close modal
    Then I see "segments/segment/%UUID%/general" page

  @success
  Scenario: Delete segment by grid button - success
    When On "grid" I can see row with "segment_code" value and columns data: "{'0': 'segment_code',  '4': '0'}"
    * On "grid" I click on "delete" button for row with "segment_code" value
    * I confirm modal
    Then On "grid" I can not see row with "segment_code" value

  @success
  Scenario: Delete segment from edit page - success
    When On "grid" I can see row with "segment_code2" value and columns data: "{'0': 'segment_code2',  '4': '0'}"
    * On "grid" I click on "edit" button for row with "segment_code2" value
    * I see "segments/segment/%UUID%/general" page
    * Element "segment-code" is visible
    * Element "title-bar-header" is visible
    * I can see "segment-code" input with the "segment_code2" term
    * I can see "segment-code" field as disabled
    * I click on "delete-segment" button
    * I confirm modal
    Then I see "segments/grid" page
