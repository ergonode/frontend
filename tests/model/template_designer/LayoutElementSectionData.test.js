/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import LayoutElementSectionData from '~/model/template_designer/LayoutElementSectionData';

it('Set LayoutElementSectionData constructor empty', () => {
  const obj = new LayoutElementSectionData();
  expect(obj.label).toBeUndefined();
  expect(obj.isObstacle).toBeUndefined();
});

it('Set LayoutElementSectionData constructor', () => {
  const obj = new LayoutElementSectionData({"end": 3, "start": 1}, 'Component', 'label', true);
  expect(obj.label).toEqual('label');
  expect(obj.isObstacle).toBeTruthy();
});
