/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
  arrayToObject,
  sumArray,
  swapItemPosition,
} from '~/model/arrayWrapper';

describe('arrayWrapper/sumArray', () => {
  it('Sum number array correct', () => {
    const array = [6, 6];
    const sum = sumArray(array);
    expect(sum).toBe(12);
  });

  it('Sum type mix array correct', () => {
    const array = [6, 'test'];
    const sum = sumArray(array);
    expect(sum).toBe('6test');
  });

  it('Sum if empty array', () => {
    const array = [];
    const sum = sumArray(array);
    expect(sum).toBe(0);
  });
});

describe('arrayWrapper/arrayToObject', () => {
  it('Convert to object', () => {
    const array = [6, 6];
    const obj = arrayToObject(array);
    expect(obj).toEqual({"0": {"id": 6}, "1": {"id": 6}});
  });

  it('Convert to object with key', () => {
    const array = [6, 6];
    const obj = arrayToObject(array, 'key');
    expect(obj).toEqual({"0": {"key": 6}, "1": {"key": 6}});
  });
});


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
