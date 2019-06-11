/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from "@vue/test-utils";
import NavigationBar from '~/components/Navigation/NavigationBar/NavigationBar';

const localVue = createLocalVue();
localVue.directive('ripple', {});
describe('Navigation/NavigationBar/NavigationBar', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(NavigationBar, {
      localVue,
    });
  });

  it("Component rendered correctly", () => {
    expect(wrapper.is(NavigationBar)).toBe(true);
  });

  it('Check if component is named correctly', () => {
    expect(typeof NavigationBar.name).toBe('string');
    expect(NavigationBar.name).toEqual('NavigationBar');
  });
});
