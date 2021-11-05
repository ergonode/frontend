@upload
Feature: Upload: Resource
  This feature allows to upload resource

  Background:
    Given I open "media/grid" page
    When I click on "upload-resource" button
    Then Element "modal" is visible

  @error
  Scenario: Upload not supported resource - error
    When I select the "['not_supported_file.log']" file in the "upload-file" input
    Then Uploaded file "not_supported_file.log" extension is not supported

  @success
  Scenario: Upload single resource - success
    When I select the "['supported_file1.jpg']" file in the "upload-file" input
    * I close modal
    Then On "grid" I can see rows with "[{ 'name': 'supported_file1.jpg' }]" values

  @success
  Scenario: Upload multiple resources - success
    When I select the "['supported_file2.jpg', 'supported_file3.jpg']" file in the "upload-file " input
    * I close modal
    Then On "grid" I can see rows with "[{ 'name': 'supported_file2.jpg' }, { 'name': 'supported_file3.jpg'}]" values
