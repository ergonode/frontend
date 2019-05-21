/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import GridInfoCell from '~/components/Grid/GridInfoCell';

describe('GridInfoCell', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(GridInfoCell, {
        propsData: {
          isEditable: false,
        },
      });
    });

    it('check name GridInfoCell', () => {
        expect(GridInfoCell.name).toEqual('GridInfoCell');
        expect(typeof GridInfoCell.name).toBe('string');
    });

    it("return the string if set data property as string", () => {
      wrapper.setProps({ value: 'test' });
        expect(wrapper.vm.text).toBe("test");
    });

    it("return the string if set data property as array", () => {
      wrapper.setProps({ value: ['2', '4', '6'] });
        expect(wrapper.vm.text).toBe("2, 4, 6");
    });

    it("return the empty string if don't set data property", () => {
      expect(wrapper.vm.text).toBe("");
  });
});
