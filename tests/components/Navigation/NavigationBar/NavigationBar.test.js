/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { Store } from 'vuex-mock-store';
import NavigationBar from '~/components/Navigation/NavigationBar/NavigationBar';

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
describe('Navigation/NavigationBar/NavigationBar', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(NavigationBar, {
      localVue,
      mocks,
    });
  });

  it("Component rendered correctly", () => {
    expect(wrapper.is(NavigationBar)).toBe(true);
  });

  it('Check if component is named correctly', () => {
    expect(typeof NavigationBar.name).toBe('string');
    expect(NavigationBar.name).toEqual('NavigationBar');
  });

  // it("Returns the icon name for sideBarState property", () => {
  //   expect(wrapper.vm.sideBarState).toBe(0);
  //   expect(wrapper.vm.getMenuIcon).toBe("full");
  //   wrapper.vm.$nextTick(() => {
  //     expect(ToolBar.computed.getMenuIcon.call({ sideBarState: 2 })).toBe("icons");
  //   });
  //   wrapper.vm.$nextTick(() => {
  //     expect(ToolBar.computed.getMenuIcon.call({ sideBarState: 1 })).toBe("hidden");
  //   });
  // });
});
