/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
  toCapitalize,
  capitalizeAndConcatenationArray,
} from '~/model/stringWrapper';

it('Capitalize first letter', () => {
  const fun = toCapitalize('tEst');
  expect(fun).toBe('TEst');
});

it('Capitalize first letter', () => {
  const strings = ['test', 'jest']
  const fun = capitalizeAndConcatenationArray(strings);
  expect(fun).toBe('TestJest');
});
