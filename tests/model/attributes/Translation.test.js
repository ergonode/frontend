/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import Translation from '~/model/attributes/Translation';

it('Set Translation constructor empty', () => {
  const obj = new Translation();
  expect(obj.label).toBe('');
  expect(obj.hint).toBe('');
  expect(obj.placeholder).toBe('');
});

it('Set Translation constructor', () => {
  const obj = new Translation('x', 'y', 'z');
  expect(obj.label).toBe('x');
  expect(obj.hint).toBe('y');
  expect(obj.placeholder).toBe('z');
});
