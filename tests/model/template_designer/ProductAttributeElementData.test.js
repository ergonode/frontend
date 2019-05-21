/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import ProductAttributeElementData from '~/model/template_designer/ProductAttributeElementData';

it('Set ProductAttributeElementData constructor empty', () => {
  const obj = new ProductAttributeElementData();
  expect(obj.data).toBeUndefined();
});

it('Set ProductAttributeElementData constructor', () => {
  const obj = new ProductAttributeElementData({"end": 3, "start": 1}, 'Component', [3,4,6]);
  expect(obj.data).toEqual([3,4,6]);
});
