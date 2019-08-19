/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount, createLocalVue } from "@vue/test-utils";
import { Store } from 'vuex-mock-store';
import CategoryTreesPage from '~/components/Pages/CategoryTreesPage';

const localVue = createLocalVue();
const store = new Store({
  state: {
    draggable: {
      isListElementDragging: false,
    }
  }
});
const mocks = {
    $canIUse: jest.fn(),
    $store: store,
};
afterEach(() => store.reset());
describe('Pages/CategoryTreesPage', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CategoryTreesPage, {
        localVue,
        mocks,
        propsData: {
          title: '',
        },
        stubs: {
          NuxtLink: true,
          HorizontalTabBar: true,
        }
      });
    });
    it("Component rendered correctly", () => {
      expect(wrapper.is(CategoryTreesPage)).toBe(true);
    });

    it('Check if component is named correctly', () => {
      expect(typeof CategoryTreesPage.name).toBe('string');
      expect(CategoryTreesPage.name).toEqual('CategoryTreesPage');
    });

    it('Check if blur is visible', () => {
      expect(wrapper.vm.isBlurVisible).toBeFalsy();
      wrapper.vm.$nextTick(() => {
        store.state.draggable.isListElementDragging = true;
        expect(wrapper.vm.isBlurVisible).toBeTruthy();
      });
    });

    it('Check if z-index is set up', () => {
      expect(wrapper.vm.blurZIndex).toBeNull();
      wrapper.vm.$nextTick(() => {
        store.state.draggable.isListElementDragging = true;
        expect(wrapper.vm.blurZIndex).toEqual({zIndex: '10'});
      });
    });
});
