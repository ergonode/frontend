/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { Store } from 'vuex-mock-store';
import ToolBarUserMenuTop from '~/components/Navigation/ToolBar/ToolBarUserMenuTop';

const localVue = createLocalVue();
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
describe('Navigation/ToolBar/ToolBarUserMenuTop', () => {
  let wrapper;
  beforeEach(() => {
      wrapper = shallowMount(ToolBarUserMenuTop, {
        localVue,
        mocks,
      });
  });

  it("Component renders correctly", () => {
    expect(wrapper.is(ToolBarUserMenuTop)).toBe(true);
  });

  it('Check if component is named correctly', () => {
    expect(typeof ToolBarUserMenuTop.name).toBe('string');
    expect(ToolBarUserMenuTop.name).toEqual('ToolBarUserMenuTop');
  });
});
