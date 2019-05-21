/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import AttributeElementData from '~/model/template_designer/AttributeElementData';

it('Set AttributeElementData constructor empty', () => {
  const obj = new AttributeElementData();
  expect(obj.data).toBeUndefined();
  expect(obj.required).toBeUndefined();
  expect(obj.sizeRange).toBeUndefined();
  expect(obj.coordinates).toBeUndefined();
  expect(obj.component).toBeUndefined();
  expect(obj.isObstacle).toBeTruthy();
});

it('Set AttributeElementData constructor', () => {
  const obj = new AttributeElementData(['data'], true, 10, {"end": 3, "start": 1}, 'Components', false);
  expect(obj.data).toEqual(['data']);
  expect(obj.required).toBeTruthy();
  expect(obj.sizeRange).toEqual(10);
  expect(obj.coordinates).toEqual({"end": 3, "start": 1});
  expect(obj.component).toEqual('Components');
  expect(obj.isObstacle).toBeFalsy();
});
