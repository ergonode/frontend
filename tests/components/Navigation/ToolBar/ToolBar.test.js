/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { Store } from 'vuex-mock-store';
import ToolBar from '~/components/Navigation/ToolBar/ToolBar';

const localVue = createLocalVue();
localVue.directive('ripple', {});
const store = new Store({
  state: {
    settings: {
      sideBarState: 0,
    },
    authentication: {
      user: {}
    }
  }
});
const mocks = {
  $store: store,
};
afterEach(() => store.reset());
describe('Navigation/ToolBar/ToolBar', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ToolBar, {
      localVue,
      mocks,
      stubs: ['nuxt-link'],
    });
  });

  it("Component rendered correctly", () => {
    expect(wrapper.is(ToolBar)).toBe(true);
  });

  it('Check if component is named correctly', () => {
    expect(typeof ToolBar.name).toBe('string');
    expect(ToolBar.name).toEqual('ToolBar');
  });

  it("Returns the icon name for sideBarState property", () => {
    expect(wrapper.vm.sideBarState).toBe(0);
    expect(wrapper.vm.getMenuIcon).toBe("full");
    wrapper.vm.$nextTick(() => {
      expect(ToolBar.computed.getMenuIcon.call({ sideBarState: 2 })).toBe("icons");
    });
    wrapper.vm.$nextTick(() => {
      expect(ToolBar.computed.getMenuIcon.call({ sideBarState: 1 })).toBe("hidden");
    });
  });
});
