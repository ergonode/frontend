/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import Point from '~/model/coordinate_system/Point';

it('Set Point constructor empty', () => {
  const obj = new Point();
  expect(obj.x).toBeUndefined();
  expect(obj.y).toBeUndefined();
});

it('Set Point constructor', () => {
  const obj = new Point(1, 3);
  expect(obj.x).toEqual(1);
  expect(obj.y).toEqual(3);
});
