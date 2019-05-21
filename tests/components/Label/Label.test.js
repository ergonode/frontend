/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount } from "@vue/test-utils";
import Label from '~/components/Label/Label.vue';


describe('Label/Label', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Label, {
      propsData: {
        text: "",
      }
    });
  });

  it("Component rendered correctly", () => {
    expect(wrapper.is(Label)).toBe(true);
  });

  it('Check if component is named correctly', () => {
    expect(typeof Label.name).toBe('string');
    expect(Label.name).toEqual('Label');
  });

  it('Check alert classes', () => {
    wrapper.setProps({
      text: 'Test',
      isDisabled: true,
    });
    expect(wrapper.vm.getLabelColor).toBe("txt--light-graphite");
  });


});
