@delete
Feature: DELETE: Resource
  This feature allows delete resource

  Background:
    Given I open "media/grid" page

  @other
  Scenario: Delete resource by grid button - give up
    When On "grid" I can see row with "supported_file1.jpg" value and columns data: "{'1': 'supported_file1.jpg'}"
    * On "grid" I click on "delete" button for row with "supported_file1.jpg" value
    * Element "modal" is visible
    * I close modal by button
    Then Element "modal" not exist

  @other
  Scenario: Delete resource from edit page - give up
    When On "grid" I can see row with "supported_file1.jpg" value and columns data: "{'1': 'supported_file1.jpg'}"
    * On "grid" I click on "edit" button for row with "supported_file1.jpg" value
    * I see "media/resource/%UUID%/general" page
    * I can see "resource-name" input with the "supported_file1" term
    * I click on "delete-resource" button
    * I close modal
    Then I see "media/resource/%UUID%/general" page

  @success
  Scenario: Delete resource by grid button - success
    When On "grid" I can see row with "supported_file1.jpg" value and columns data: "{'1': 'supported_file1.jpg'}"
    * On "grid" I click on "delete" button for row with "supported_file1.jpg" value
    * I confirm modal
    Then On "grid" I can not see row with "supported_file1.jpg2" value

  @success
  Scenario: Delete resource from edit page - success
    When On "grid" I can see row with "supported_file2.jpg" value and columns data: "{'1': 'supported_file2.jpg'}"
    * On "grid" I click on "edit" button for row with "supported_file2.jpg" value
    * I see "media/resource/%UUID%/general" page
    * I can see "resource-name" input with the "supported_file2" term
    * I click on "delete-resource" button
    * I confirm modal
    * I see "media/grid" page
    Then On "grid" I can not see row with "supported_file2.jpg" value
