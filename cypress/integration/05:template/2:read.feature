@read
Feature: READ: Template
  This feature allows read template

  Background:
    Given I open "product-templates" page

  @success
  Scenario: Read template on grid - success
    When I can see "Product templates" text on "title-bar-header" element
    * I set "table" view on the grid
    Then On "grid" I can see rows with "[{ 'code': 'template_code', 'name': 'template_name' }, { 'code': 'template_code2', 'name': 'template_name2' }]" values

  @success
  Scenario: Read template general - success
    When I see "product-templates" page
    * I set "table" view on the grid
    Then On "grid" I can see row with "template_code" value and columns data: "{'0': 'template_code', '4': 'SKU'}"
    * On "grid" I click on "edit" button for row with "template_code" value
    * I see "product-templates/template/%UUID%/general" page
    * Element "title-bar-header" is visible
    * I can see "template_name" text on "title-bar-header" element
    * Element "template-name" is visible
    * I can see "template-code" input with the "template_code" term
    * I can see "template-name" input with the "template_name" term
    * I can see "template-code" field as disabled
    Then I click back arrow
    * I see "product-templates" page

