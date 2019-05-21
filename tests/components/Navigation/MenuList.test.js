/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from "@vue/test-utils"
import MenuList from '~/components/Navigation/MenuList';

const localVue = createLocalVue();

describe('Navigation/MenuList', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(MenuList, {
        localVue,
        propsData: {
          sectionMenu: [{
            title: 'Products',
            action: '/products',
            icon: 'paper',
          }],
        },
        stubs: ['nuxt-link'],
      });
    });

    it("component renders correctly", () => {
      expect(wrapper.is(MenuList)).toBe(true);
    });

    it('check name MenuList component', () => {
      expect(typeof MenuList.name).toBe('string');
      expect(MenuList.name).toEqual('MenuList');
    });

    it('check if the props are set correct', () => {
      let SectionContainer = wrapper.find('.menu-section');
      expect(wrapper.vm.sectionTitle).toBeNull();
      expect(wrapper.vm.sectionMenu).toBeTruthy();
      expect(wrapper.vm.selectedElement).toBeFalsy();
      expect(SectionContainer.contains('h3.menu-section__title')).toBeFalsy();
      expect(SectionContainer.contains('h3.list-element--selected')).toBeFalsy();
    });

    it("render menu section and items", () => {
      let SectionContainer = wrapper.find('.menu-section');
      SectionContainer.setProps({
        sectionTitle: 'CATALOG',
        selectedElement: '/products',
      });
      expect(SectionContainer.find('h3.menu-section__title').text()).toMatch("CATALOG");
      expect(SectionContainer.contains('ul.menu-section__list')).toBe(true);
      expect(SectionContainer.find('li.list-element').find('span').text()).toMatch('Products');
      expect(SectionContainer.find('li.list-element--selected')).toBeTruthy();
    });

});
