# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-beta.5](https://github.com/derpdead/frontend/compare/v1.0.0-beta.3...v1.0.0-beta.5) (2020-11-30)

**Note:** Version bump only for package ergonode-front





## CHANGELOG FOR v1.0.0-beta.5
- feature [#596](https://github.com/ergonode/frontend/pull/596) Migrate storybook from v5 to v6 (derpdead)
- feature [#597](https://github.com/ergonode/frontend/pull/597) Add refresh token support (derpdead)
- perf [#595](https://github.com/ergonode/frontend/pull/595) Isolated actions along with buttons, improved routing names (derpdead)
- perf [#598](https://github.com/ergonode/frontend/pull/598) Dropdown improvement (derpdead)
- bugfix [#599](https://github.com/ergonode/frontend/pull/599) Grid memory leaks (derpdead)

## CHANGELOG FOR v1.0.0-beta.4
- feature - add DOM virtualization to select kind components
- feature - add github actions
- feature - search for sidebar list with categories
- refactor - expose Grid pagination
- bugfix - Grid filtering 
- bugfix - sidebar list languages

## CHANGELOG FOR v1.0.0-beta.3
- feature - add axios cancel request support for each request
- feature - replace a custom redirect with native Vue router redirect
- feature - placeholders for Selects
- feature - select column for Grid
- feature - destructive theme for buttons
- feature - possibility of changing template from product page
- feature - remove products from Grid batch/bulk/mass action
- bugfix - Grid stabilisation

## CHANGELOG FOR v1.0.0-beta.2
- feature - integrate lighter version of lazy loaded dropdowns
- refactor - improve performance of loading data for attributes list 
- refactor - exclude VueMS configuration from Grid
- refactor - improve performance of Grid
- refactor - exclude AdvancedFilters from GridHeader
- refactor - add support for Vuex actions for extending by module
- refactor - improve product types
- bugfix - product types
- bugfix - media

## CHANGELOG FOR v0.10.0
 - feature [#474](https://github.com/ergonode/frontend/issues/474) Channels & exports
 - feature [#411](https://github.com/ergonode/frontend/issues/411) Multimedia
 - feature - dependencies update
 - feature - thumbnails
 - feature - user avatar
 - feature - grid placeholders
 - feature - Lerna implementation
 - perf - JSONSchema style performance
 - refactor - Global language code url
 - refactor - vuex clean architecture
 - refactor - e2e test
 - refactor - clear module relations
 - refactor - advanced filters improvement
 - refactor - inputs unification
 - refactor - range picker improve
 - bugfix - language list crash
 - bugfix - Preview grid column
 - bugfix - navigation
 - bugfix - workflow
 - bugfix - select/multiselect filter selection, range filters

## CHANGELOG FOR v0.9.0
 - feature [#384](https://github.com/ergonode/frontend/issues/384) Product variants
 - feature [#418](https://github.com/ergonode/frontend/issues/418) GridCollectionLayout for product related Grid's
 - feature [#428](https://github.com/ergonode/frontend/issues/428) Integrate TextArea/RTE
 - feature [#430](https://github.com/ergonode/frontend/issues/430) Optimisation for D&D at Grid and AdvancedFilters
 - feature dependencies update
 - perf - Language inheritance communication
 - bugfix - Product template updating draft values

## CHANGELOG FOR v0.8.0
 - feature [#365](https://github.com/ergonode/frontend/issues/365) Language inheritance - privileges
 - feature [#366](https://github.com/ergonode/frontend/issues/366) Language inheritance - product changes
 - feature [#374](https://github.com/ergonode/frontend/issues/374) Unifying product templates
 - feature [#376](https://github.com/ergonode/frontend/issues/376) WYSYWIG Editor
 - feature [#405](https://github.com/ergonode/frontend/issues/405) Lazy loading for Select options
 - perf [#396](https://github.com/ergonode/frontend/issues/396) Non dismissible dropdown menu for action buttons

## CHANGELOG FOR v0.7.0
 - feature - Change of architecture to the micro frontend approach
 - feature - Add unit management
 - feature - Add product collections
 - feature - Add creating elements from modal
 - feature - Add import from Magento 1
 - feature - Add new login page
 - feature - Implementation storybook library
 - perf - Performance improvement in grid
 - perf - Performance improvement in UI elements

## CHANGELOG FOR v0.6.1
- bugfix - Vuex store for Grid crashed after f5 - store had been removed
- bugfix - App crash after f5 when page has Fab at TitleBar
- bugfix - Attribute Select/Multiselect options were removing at edition
- bugfix - Product Template fields validation
- bugfix - Resizing at Template Designer
- bugfix - AdvancedFilters had been established - dragging bugs

## CHANGELOG FOR v0.6.0
 - feature - Add product history log
 - feature - Add core notifications
 - feature - Add workflow notifications
 - feature - Add comment module
 - feature - Add system attribute
 - feature - Add advanced filter support
 - feature - Add excel-like mechanisms to grid

## CHANGELOG FOR v0.5.0

- feature [#154](https://github.com/ergonode/frontend/issues/154) Segments + condition sets

## CHANGELOG FOR v0.4.0

- feature [#78](https://github.com/ergonode/frontend/issues/78) Modularity - pages
- feature [#128](https://github.com/ergonode/frontend/issues/128) Product statuses
- feature [#130](https://github.com/ergonode/frontend/issues/130) Access denied view
- feature [#143](https://github.com/ergonode/frontend/issues/143) Category trees
- feature [#158](https://github.com/ergonode/frontend/issues/158) Product statuses - product grid
- bugfix [#134](https://github.com/ergonode/frontend/issues/134) Categories not hide on list
- bugfix [#136](https://github.com/ergonode/frontend/issues/136) Dashboard boxes without privileges
- bugfix [#138](https://github.com/ergonode/frontend/issues/138) Users - no validation on activity status
- bugfix [#144](https://github.com/ergonode/frontend/issues/144) Hidden children not show again
- bugfix [#145](https://github.com/ergonode/frontend/issues/145) Privileges bugs
- perf [#147](https://github.com/ergonode/frontend/issues/147) Change communication with API

## CHANGELOG FOR v0.3.0

- feature [#76](https://github.com/ergonode/frontend/issues/76) Resizable horizontal line for grid columns
- feature [#81](https://github.com/ergonode/frontend/issues/81) User activity flag
- feature [#83](https://github.com/ergonode/frontend/issues/83) User roles
- feature [#92](https://github.com/ergonode/frontend/issues/92) Floating grid headers
- feature [#94](https://github.com/ergonode/frontend/issues/94) Generating icons - mechanism
- feature [#97](https://github.com/ergonode/frontend/issues/97) Reusable Vuex store for each grid
- feature [#105](https://github.com/ergonode/frontend/issues/105) Base role tab
- feature [#108](https://github.com/ergonode/frontend/issues/108) Native Checkbox
- feature [#109](https://github.com/ergonode/frontend/issues/109) Deleting role action
- feature [#111](https://github.com/ergonode/frontend/issues/111) User page - add select field with roles
- feature [#115](https://github.com/ergonode/frontend/issues/115) Privilege roles table
- feature [#117](https://github.com/ergonode/frontend/issues/117) User/s activity logs
- feature [#124](https://github.com/ergonode/frontend/issues/124) Color picker
- feature [#126](https://github.com/ergonode/frontend/issues/126) User Privileges
- bugfix [#98](https://github.com/ergonode/frontend/issues/98) Hide search for lists
- bugfix [#100](https://github.com/ergonode/frontend/issues/100) Label appears while dragging
- perf [#104](https://github.com/ergonode/frontend/issues/104) Inputs improvement
- perf [#121](https://github.com/ergonode/frontend/issues/121) New category tree view


## CHANGELOG FOR v0.2.0

- bugfix [#14](https://github.com/ergonode/frontend/issues/14) User image doesn't display well
- bugfix [#15](https://github.com/ergonode/frontend/issues/15) Multiselect - product template
- bugfix [#28](https://github.com/ergonode/frontend/issues/28) Attributes translations - crash
- bugfix [#47](https://github.com/ergonode/frontend/issues/47) Overlapping grid placeholder over column headers
- bugfix [#49](https://github.com/ergonode/frontend/issues/49) Toggler component has to have disabled style for two states
- bugfix [#50](https://github.com/ergonode/frontend/issues/50) Editting Unit Attribute
- bugfix [#53](https://github.com/ergonode/frontend/issues/53) Firefox support
- feature [#16](https://github.com/ergonode/frontend/issues/16) Category tree
- feature [#17](https://github.com/ergonode/frontend/issues/17) Template Designer - layout improvement
- feature [#42](https://github.com/ergonode/frontend/issues/42) Grid doesn't support attributes with parameters
- feature [#73](https://github.com/ergonode/frontend/issues/73) Grid column - extander

## CHANGELOG FOR v0.1.1

- bugfix [#1](https://github.com/ergonode/frontend/issues/1) many bugs fixed
- bugfix [#12](https://github.com/ergonode/frontend/issues/12) input floating label
- bugfix [#20](https://github.com/ergonode/frontend/issues/20) inputs FF support
- refactor [#6](https://github.com/ergonode/frontend/issues/16) Code refactor
- feature [#4](https://github.com/ergonode/frontend/issues/4) application meta tags / favicon
- feature [#18](https://github.com/ergonode/frontend/issues/18) multilingual attribute support
- configuration - [travis init](https://github.com/ergonode/frontend/issues/7)
- configuration - [CLI](https://github.com/ergonode/frontend/issues/8)
