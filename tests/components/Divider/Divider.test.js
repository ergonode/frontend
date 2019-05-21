/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount } from "@vue/test-utils";
import Divider from '~/components/Dividers/Divider.vue';


describe('Dividers/Divider', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Divider);
  });

  it("Component rendered correctly", () => {
    expect(wrapper.is(Divider)).toBe(true);
  });

  it('Check if component is named correctly', () => {
    expect(typeof Divider.name).toBe('string');
    expect(Divider.name).toEqual('Divider');
  });

  it('Check class', () => {
    expect(wrapper.classes()).toContain("divider");
  });
});
