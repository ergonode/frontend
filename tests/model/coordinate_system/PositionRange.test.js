/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import PositionRange from '~/model/coordinate_system/PositionRange';

it('Set PositionRange constructor empty', () => {
  const obj = new PositionRange();
  expect(obj.start).toBeUndefined();
  expect(obj.end).toBeUndefined();
});

it('Set PositionRange constructor', () => {
  const obj = new PositionRange(1, 3);
  expect(obj.start).toEqual(1);
  expect(obj.end).toEqual(3);
});
