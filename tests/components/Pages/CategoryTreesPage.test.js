/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from "@vue/test-utils";
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
  $store: store,
};
afterEach(() => store.reset());
describe('Pages/CategoryTreesPage', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(CategoryTreesPage, {
        localVue,
        mocks,
        propsData: {
          title: 'Test',
        },
      });
    });
    it("Component rendered correctly", () => {
      expect(wrapper.is(CategoryTreesPage)).toBe(true);
    });

    it('Check if component is named correctly', () => {
      expect(typeof CategoryTreesPage.name).toBe('string');
      expect(CategoryTreesPage.name).toEqual('CategoryTreesPage');
    });
});
