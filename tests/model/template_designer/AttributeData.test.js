/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import AttributeData from '~/model/template_designer/AttributeData';

it('Set AttributeData constructor empty', () => {
  const obj = new AttributeData();
  expect(obj.id).toBeUndefined();
  expect(obj.type).toBeUndefined();
  expect(obj.label).toBeUndefined();
});

it('Set AttributeData constructor', () => {
  const obj = new AttributeData(1, 'type', 'label');
  expect(obj.id).toEqual(1);
  expect(obj.type).toEqual('type');
  expect(obj.label).toEqual('label');
});
