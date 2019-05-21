/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { Store } from 'vuex-mock-store';
import ToolBarUserButton from '~/components/Navigation/ToolBar/ToolBarUserButton';

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
describe('Navigation/ToolBar/ToolBarUserButton', () => {
  let wrapper;
  beforeEach(() => {
      wrapper = shallowMount(ToolBarUserButton, {
        localVue,
        mocks,
        stubs: ['nuxt-link'],
      });
  });

  it("Component renders correctly", () => {
    expect(wrapper.is(ToolBarUserButton)).toBe(true);
  });

  it('Check if component is named correctly', () => {
    expect(typeof ToolBarUserButton.name).toBe('string');
    expect(ToolBarUserButton.name).toEqual('ToolBarUserButton');
  });
});
