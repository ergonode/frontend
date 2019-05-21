/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import Translation from '~/model/categories/Translation';

it('Set Translation constructor empty', () => {
  const obj = new Translation();
  expect(obj.name).toBe('');
});

it('Set Translation constructor', () => {
  const obj = new Translation('x');
  expect(obj.name).toBe('x');
});
