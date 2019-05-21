/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { Store } from 'vuex-mock-store';
import ToolBarUserMenu from '~/components/Navigation/ToolBar/ToolBarUserMenu';

const localVue = createLocalVue();
localVue.directive('ripple', {});
const store = new Store({
  state: {
    authentication: {
      user: {}
    }
  }
});
const mocks = {
  $store: store,
};
afterEach(() => store.reset());
describe('Navigation/ToolBar/ToolBarUserMenu', () => {
  let wrapper;
  beforeEach(() => {
      wrapper = shallowMount(ToolBarUserMenu, {
        localVue,
        propsData: {
          isActive: true,
        },
        mocks,
        stubs: ['nuxt-link'],
      });
  });

  it("Component renders correctly", () => {
    expect(wrapper.is(ToolBarUserMenu)).toBe(true);
  });

  it('Check if component is named correctly', () => {
    expect(typeof ToolBarUserMenu.name).toBe('string');
    expect(ToolBarUserMenu.name).toEqual('ToolBarUserMenu');
  });
});
