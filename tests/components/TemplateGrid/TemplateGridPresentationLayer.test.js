/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount } from "@vue/test-utils"
import TemplateGridPresentationLayer from '~/components/TemplateGrid/TemplateGridPresentationLayer';

describe('TemplateGrid/TemplateGridPresentationLayer', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(TemplateGridPresentationLayer, {
        propsData: {
          gridStyles: {
            gridTemplateColumns: 'repeat(1, 1fr)',
            gridAutoRows: '50px',
          },
          columns: 3,
          rows: 10,
          isHeader: false,
        },
      });
    });

    it("Component rendered correctly", () => {
      expect(wrapper.is(TemplateGridPresentationLayer)).toBe(true);
    });

    it('Check if component is named correctly', () => {
      expect(typeof TemplateGridPresentationLayer.name).toBe('string');
      expect(TemplateGridPresentationLayer.name).toEqual('TemplateGridPresentationLayer');
    });

    it('Check number of items', () => {
      expect(TemplateGridPresentationLayer.computed.numberOfItems.call({ columns: 3, rows: 10 })).toBe(30);
    });
});
