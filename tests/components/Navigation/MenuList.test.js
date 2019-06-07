/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from "@vue/test-utils"
import MenuList from '~/components/Navigation/MenuList';
import VueRouter from 'vue-router'

const localVue = createLocalVue();
const router = new VueRouter();
const mocks = {
    $route: {
        path: '/products',
    }
};

describe('Navigation/MenuList', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(MenuList, {
          localVue,
          router,
          mocks,
          propsData: {
          sectionMenu: [{
            title: 'Products',
            routing: '/products',
            icon: 'paper',
          }],
        },
        stubs: ['NuxtLink'],
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
      expect(SectionContainer.contains('h3.menu-section__title')).toBeFalsy();
      expect(SectionContainer.contains('h3.list-element--selected')).toBeFalsy();
    });
});
