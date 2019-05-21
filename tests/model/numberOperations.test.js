/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
  isGreaterOrEqualThan,
  isSmallerOrEqualThan,
  isSmallerThan,
  isGreaterThan,
} from '~/model/numberOperations';

describe('numberOperations/isGreaterOrEqualThan', () => {
  it('If number is greater or equal', () => {
    const fun = isGreaterOrEqualThan(4, 3);
    expect(fun).toBeTruthy();
  });
  it('If number is greater or equal', () => {
    const fun = isGreaterOrEqualThan(3, 3);
    expect(fun).toBeTruthy();
  });
});

describe('numberOperations/isSmallerOrEqualThan', () => {
  it('If number is greater or equal', () => {
    const fun = isSmallerOrEqualThan(2, 3);
    expect(fun).toBeTruthy();
  });
  it('If number is greater or equal', () => {
    const fun = isSmallerOrEqualThan(3, 3);
    expect(fun).toBeTruthy();
  });
});

it('If number is smaller', () => {
  const fun = isSmallerThan(2, 3);
  expect(fun).toBeTruthy();
});

it('If number is greater', () => {
  const fun = isGreaterThan(4, 3);
  expect(fun).toBeTruthy();
});
