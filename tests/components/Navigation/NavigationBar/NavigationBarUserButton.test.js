/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { Store } from 'vuex-mock-store';
import NavigationBarUserButton from '~/components/Navigation/NavigationBar/NavigationBarUserButton';

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
describe('Navigation/NavigationBar/NavigationBarUserButton', () => {
  let wrapper;
  beforeEach(() => {
      wrapper = shallowMount(NavigationBarUserButton, {
        localVue,
        mocks,
        stubs: ['NuxtLink'],
      });
  });

  it("Component renders correctly", () => {
    expect(wrapper.is(NavigationBarUserButton)).toBe(true);
  });

  it('Check if component is named correctly', () => {
    expect(typeof NavigationBarUserButton.name).toBe('string');
    expect(NavigationBarUserButton.name).toEqual('NavigationBarUserButton');
  });
});
