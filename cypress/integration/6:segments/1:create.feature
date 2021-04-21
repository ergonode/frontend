@create
Feature: CREATE: Segment
  This feature allows create segment

  Background:
    Given I open "segments/grid" page
    When I click on "new-segment" button
    Then Element "modal" is visible

  @other
  Scenario: Close modal
    When I close modal
    Then Element "modal" not exist

  @success
  Scenario: Add segment - success
    When I fill the "segment-code" input with the "segment_code" term
    * I click on "submit" button
    * I send a "POST" request and status code should be 201
    * I open "segments/grid" page
    Then On "grid" I can see row with "segment_code" value and columns data: "{'0': 'segment_code', '1': '',  '2': '',  '3': 'new',  '4': '0'}"

  @success
  Scenario: Add segment and go to edit - success
    When I fill the "segment-code" input with the "segment_code2" term
    * I click on "proceed" button
    * I send a "POST" request and status code should be 201
    * I see "segments/segment/%UUID%/general" page
    * Element "segment-code" is visible
    * Element "title-bar-header" is visible
    Then I can see "segment-code" input with the "segment_code2" term

  @error
  Scenario: Add segment - duplication error
    When I fill the "segment-code" input with the "segment_code" term
    * I click on "submit" button
    * I send a "POST" request and status code should be 400
    * I see a form validation error that says "['Given value is not unique']"
    Then I close modal

  @error
  Scenario: Add segment - validation error (empty string)
    When I click on "submit" button
    * I send a "POST" request and status code should be 400
    * I see a form validation error that says "['System name is required']"
    Then I close modal

  # NOTE: Check if validation not needed
  # @error
  # Scenario: Add segment - validation error (misc string)
  #   When I fill the "segment-code" input with the "@#$%()" term
  #   * I click on "submit" button
  #   * I send a "POST" request and status code should be 400
  #   * I see a form validation error that says "['System name can have only letters, digits or underscore symbol']"
  #   * I close modal
  #   Then On "grid" I can not see row with "@#$%()" value
