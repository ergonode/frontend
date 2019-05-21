/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import LayoutElementData from '~/model/template_designer/LayoutElementData';

it('Set LayoutElementData constructor empty', () => {
  const obj = new LayoutElementData();
  expect(obj.coordinates).toBeUndefined();
  expect(obj.component).toBeUndefined();
  expect(obj.isObstacle).toBeUndefined();
});

it('Set LayoutElementData constructor', () => {
  const obj = new LayoutElementData({"end": 3, "start": 1}, 'Components', true);
  expect(obj.coordinates).toEqual({"end": 3, "start": 1});
  expect(obj.component).toEqual('Components');
  expect(obj.isObstacle).toBeTruthy();
});
