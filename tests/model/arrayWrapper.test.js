/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
  sumArray,
  swapItemPosition,
  getObjectWithMaxValueInArrayByObjectKey,
  getMinObjectValueInArrayByObjectKey,
} from '~/model/arrayWrapper';

describe('arrayWrapper/swapItemPosition', () => {
  it('Chage array items position. Pos1 bigger then pos2', () => {
    const array = [6, 6, 5, 2];
    const obj = swapItemPosition(array, 3, 1);
    expect(obj).toEqual([6, 2, 6, 5]);
  });

  it('Chage array items position. Pos2 bigger then pos1', () => {
    const array = [6, 6, 5, 2];
    const obj = swapItemPosition(array, 1, 3);
    expect(obj).toEqual([6, 5, 2, 6]);
  });

  it('Chage array items position. Incorrect positions', () => {
    const array = [6, 6, 5, 2];
    const obj = swapItemPosition(array, 6, 3);
    expect(obj).toEqual([6, 6, 5, 2]);
  });
});

describe('arrayWrapper/maxObjectValueInArrayByObjectKeyByObjectKey', () => {
  it('Getting max value of object property in array', () => {
    const array = [{ a: 1 }, null, { a: 2 }, { a: 6}, { a: 2 }, null ];

    const maxValue = getObjectWithMaxValueInArrayByObjectKey(array, 'a');

    expect(maxValue.a).toEqual(6);
  });

  it('Array has no elements', () => {
    const maxValue = getObjectWithMaxValueInArrayByObjectKey([], 'a');

    expect(maxValue).toEqual(0);
  });
});

describe('arrayWrapper/maxObjectValueInArrayByObjectKeyByObjectKey', () => {
  it('Getting min value of object property in array', () => {
    const array = [{ a: 1 }, { a: 2 }, null, { a: 6}, { a: 2 }, null ];

    const minValue = getMinObjectValueInArrayByObjectKey(array, 'a');

    expect(minValue).toEqual(1);
  });

  it('Array has no elements', () => {
    const maxValue = getObjectWithMaxValueInArrayByObjectKey([], 'a');

    expect(maxValue).toEqual(0);
  });
});
