/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount } from "@vue/test-utils"
import CategoryTreeItem from '~/components/CategoryTree/CategoryTreeItem';

describe('CategoryTree/CategoryTreeItem', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CategoryTreeItem, {
        propsData: {
          numberOfChildren: 0,
          itemName: "",
        },
      });
    });
    it("Component is rendered", () => {
      expect(wrapper.is(CategoryTreeItem)).toBe(true);
    });

    it('Component is named well', () => {
      expect(typeof CategoryTreeItem.name).toBe('string');
      expect(CategoryTreeItem.name).toEqual('CategoryTreeItem');
    });


    it('Check if item has no children', () => {
      expect(wrapper.vm.numberOfChildren).toEqual(0)
      expect(wrapper.vm.hasChildren).toBeFalsy();
      expect(wrapper.find('.grid-item__icon').exists()).toBe(false);
      expect(wrapper.find('.grid-item__categories-length').exists()).toBe(false);
    });

    it('Check if item has children', () => {
      wrapper.setProps({
        numberOfChildren: 3,
      });
      const icon = wrapper.find('.grid-item__icon');
      const categoiesLength = wrapper.find('.grid-item__categories-length');
      expect(wrapper.vm.hasChildren).toBeTruthy();
      expect(icon).toBeTruthy();
      expect(categoiesLength).toBeTruthy();
    });

    it('Check icon image', () => {
      wrapper.setData({
        isExpanded: true,
      });
      expect(wrapper.vm.btnExpanderIcon).toBe('arrow-double trans-none');
    });

    it('Check click method', () => {
      wrapper.setProps({
        numberOfChildren: 3,
      });
      wrapper.setData({
        isExpanded: true,
      });
      const icon = wrapper.find('.grid-item__icon')
      icon.trigger('click')
      expect(wrapper.vm.isExpanded).toBe(false);
    });

    it('Check number of categories label', () => {
      wrapper.setProps({
        numberOfChildren: 3,
      });
      expect(wrapper.vm.getNumberOfCategoriesLabel).toBe('3 categories');
      wrapper.setProps({
        numberOfChildren: 1,
      });
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.getNumberOfCategoriesLabel).toBe('1 category');
      });
    });
});
