/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import Coordinates from '~/model/coordinate_system/Coordinates';

it('Set Coordinates constructor empty', () => {
  const obj = new Coordinates();
  expect(obj.xPos).toEqual({"end": undefined, "start": undefined});
  expect(obj.yPos).toEqual({"end": undefined, "start": undefined});
});

it('Set Coordinates constructor', () => {
  const obj = new Coordinates(1, 3, 4, 2);
  expect(obj.xPos).toEqual({"end": 3, "start": 1});
  expect(obj.yPos).toEqual({"end": 2, "start": 4});
});
