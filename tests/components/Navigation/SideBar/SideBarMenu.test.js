/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue } from "@vue/test-utils"
import { Store } from 'vuex-mock-store'
import SideBarMenu from '~/components/Navigation/SideBar/SideBarMenu';

const localVue = createLocalVue();
// localVue.use(VueRouter);
const router = new VueRouter();
const store = new Store({
  state: {
    settings: {
      sideBarState: 0,
    },
  }
});
const mocks = {
  $store: store,
  $route: {
    path: '/products',
    params: { placeholder: '2' }
  }
};
afterEach(() => store.reset());
describe('Navigation/SideBar/SideBarMenu', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(SideBarMenu, {
          localVue,
          router,
          mocks,
          stubs: ['nuxt-link'],
        });
    });

    it("component renders correctly", () => {
      expect(wrapper.is(SideBarMenu)).toBe(true);
    });

    it('check name SideBarMenu component', () => {
      expect(typeof SideBarMenu.name).toBe('string');
      expect(SideBarMenu.name).toEqual('SideBarMenu');
    });

    it('check if the data is provided', () => {
        expect(typeof SideBarMenu.data).toBe('function');
        expect(wrapper.vm.selectedElement).toBeTruthy();
        expect(wrapper.vm.menu).toBeTruthy();
    });

    it("returns the class name for sideBarState property", () => {
      expect(wrapper.vm.sideBarState).toBe(0);
      expect(wrapper.vm.getClassName).toBe("hidden");
      wrapper.vm.$nextTick(() => {
        expect(SideBarMenu.computed.getClassName.call({ sideBarState: 2 })).toBe("full");
      });
      wrapper.vm.$nextTick(() => {
        expect(SideBarMenu.computed.getClassName.call({ sideBarState: 1 })).toBe("icons");
      });
    });

    it("check is selectedElement value is correct", () => {
      expect(typeof wrapper.vm.$route).toBe('object');
      expect(wrapper.vm.selectedElement).toBe('/products/2');
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
