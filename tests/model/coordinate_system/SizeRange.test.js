/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import SizeRange from '~/model/coordinate_system/SizeRange';

it('Set SizeRange constructor empty', () => {
  const obj = new SizeRange();
  expect(obj.minWidth).toBeUndefined();
  expect(obj.minHeight).toBeUndefined();
  expect(obj.maxWidth).toBeUndefined();
  expect(obj.maxHeight).toBeUndefined();
});

it('Set SizeRange constructor', () => {
  const obj = new SizeRange(300, 10, 400, 100);
  expect(obj.minWidth).toEqual(300);
  expect(obj.minHeight).toEqual(10);
  expect(obj.maxWidth).toEqual(400);
  expect(obj.maxHeight).toEqual(100);
});
