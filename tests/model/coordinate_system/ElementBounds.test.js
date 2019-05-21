/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import ElementBounds from '~/model/coordinate_system/ElementBounds';

it('Set ElementBounds constructor empty', () => {
  const obj = new ElementBounds();
  expect(obj.x).toBeUndefined();
  expect(obj.y).toBeUndefined();
  expect(obj.width).toBeUndefined();
  expect(obj.height).toBeUndefined();
});

it('Set ElementBounds constructor', () => {
  const obj = new ElementBounds(1, 3, 40, 20);
  expect(obj.x).toEqual(1);
  expect(obj.y).toEqual(3);
  expect(obj.width).toEqual(40);
  expect(obj.height).toEqual(20);
});
