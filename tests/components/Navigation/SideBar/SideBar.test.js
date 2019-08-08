/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue } from "@vue/test-utils"
import SideBar from '~/components/Navigation/SideBar/SideBar';

const localVue = createLocalVue();
const router = new VueRouter();
const mocks = {
  $route: {
    path: '/products',
    params: { placeholder: '2' }
  },
  $modulesConfiguration: {
    menu: []
  }
};
describe('Navigation/SideBar/SideBar', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(SideBar, {
          localVue,
          router,
          mocks,
          stubs: ['NuxtLink'],
        });
    });

    it("component renders correctly", () => {
      expect(wrapper.is(SideBar)).toBe(true);
    });

    it('check name SideBar component', () => {
      expect(typeof SideBar.name).toBe('string');
      expect(SideBar.name).toEqual('SideBar');
    });

    it('check if the data is provided', () => {
        expect(typeof SideBar.data).toBe('function');
        expect(wrapper.vm.value).toBeTruthy();
        expect(wrapper.vm.menu).toBeTruthy();
    });

    it("returns the menu state class", () => {
      expect(wrapper.vm.value).toBe(2);
      expect(wrapper.vm.menuStateClass).toBe("menu--full");
      wrapper.vm.$nextTick(() => {
        expect(SideBar.computed.menuStateClass.call({ value: 0 })).toBe("menu--hidden");
      });
      wrapper.vm.$nextTick(() => {
        expect(SideBar.computed.menuStateClass.call({ value: 1 })).toBe("menu--icons");
      });
    });

    it("render menu items", () => {
      let MenuContent = wrapper.find('.side-bar__content');
      wrapper.setData({
        menu: [
          {
            title: 'CATALOG',
            menu: [
                {
                    title: 'Products',
                    action: '/products',
                    icon: 'paper',
                },
            ]
          }
        ]
      });
      expect(MenuContent.contains('div.menu-section')).toBe(true);
      expect(MenuContent.find('h3.menu-section__title').text()).toMatch("CATALOG");
      expect(MenuContent.contains('ul.menu-section__list')).toBe(true);
      expect(MenuContent.find('li.list-element').find('span').text()).toMatch('Products');
    });

});
