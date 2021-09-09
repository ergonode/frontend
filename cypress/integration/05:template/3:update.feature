# TODO: Update image, deafult label, default image
# TODO: Update  designer tab
@update
Feature: UPDATE: Template
  This feature allows update template

  Background:
    Given I open "product-templates" page

  @success
  Scenario: Update template from edit page - validation error (too long string)
    When I see "product-templates" page
    * I set "table" view on the grid
    Then On "grid" I can see row with "template_code" value and columns data: "{'0': 'template_code'}"
    * On "grid" I click on "edit" button for row with "template_name" value
    * I see "product-templates/template/%UUID%/general" page
