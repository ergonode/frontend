/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import ProductAttributeData from '~/model/template_designer/ProductAttributeData';

it('Set ProductAttributeData constructor empty', () => {
  const obj = new ProductAttributeData();
  expect(obj.id).toBeUndefined();
  expect(obj.required).toBeUndefined();
  expect(obj.type).toBeUndefined();
  expect(obj.name).toBeUndefined();
  expect(obj.hint).toBeUndefined();
  expect(obj.placeholder).toBeUndefined();
  expect(obj.parameters).toBeUndefined();
  expect(obj.value).toBeUndefined();
  expect(obj.options).toBeUndefined();
});

it('Set ProductAttributeData constructor', () => {
  const obj = new ProductAttributeData(1, true, 'type', 'name', 'hint', 'placeholder', {currency: 'USD'}, 10, ['1', '2']);
  expect(obj.id).toEqual(1);
  expect(obj.required).toBeTruthy();
  expect(obj.type).toEqual('type');
  expect(obj.name).toEqual('name');
  expect(obj.hint).toEqual('hint');
  expect(obj.placeholder).toEqual('placeholder');
  expect(obj.parameters).toEqual({currency: 'USD'});
  expect(obj.value).toEqual(10);
  expect(obj.options).toEqual(['1', '2']);
});
