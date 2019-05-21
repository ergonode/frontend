/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount, createLocalVue } from "@vue/test-utils"
import CheckBox from '~/components/Inputs/CheckBox';
import nestedVModelMixin from '~/mixins/nestedVModelMixin';

const localVue = createLocalVue();
localVue.mixin(nestedVModelMixin);

describe('Inputs/CheckBox', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CheckBox, {
        localVue,
        propsData: {
          isDisabled: false,
          value: 0
        },
      });
    });
    it("Component rendered correctly", () => {
      expect(wrapper.is(CheckBox)).toBe(true);
    });

    it('Check if component is named correctly', () => {
      expect(typeof CheckBox.name).toBe('string');
      expect(CheckBox.name).toEqual('CheckBox');
    });

    it("Returns the icon name if not disabled and not checked", () => {
      expect(wrapper.vm.isDisabled).toBeFalsy();
      expect(wrapper.vm.iconClass).toBe("sprite-checkbox checkbox-default");
    });

    it("Returns the icon name if not disabled and checked", () => {
      wrapper.vm.$nextTick(() => {
        expect(CheckBox.computed.iconClass.call({ value: 1 })).toBe("sprite-checkbox checkbox-checked");
      });
    });

    it("Returns the icon name if not disabled and value false", () => {
      wrapper.vm.$nextTick(() => {
        expect(CheckBox.computed.iconClass.call({ value: false })).toBe("sprite-checkbox checkbox-default");
      });
    });

    it("Returns the icon name if disabled and not checked", () => {
      wrapper.vm.$nextTick(() => {
        expect(CheckBox.computed.iconClass.call({ isDisabled: true })).toBe("sprite-checkbox checkbox-default--disabled");
      });
    });

    it("Returns the icon name if disabled and checked", () => {
      wrapper.vm.$nextTick(() => {
        expect(CheckBox.computed.iconClass.call({ isDisabled: true, value: 1 })).toBe("sprite-checkbox checkbox-checked--disabled");
      });
    });

    it('Emit input if value equal 2', () => {
      wrapper.setProps({
        value: 2,
      });
      wrapper.trigger('click');
      expect(wrapper.emitted('input')[0]).toEqual([0]);
    });

    it('Emit input if value equal 0', () => {
      wrapper.trigger('click');
      expect(wrapper.emitted('input')[0]).toEqual([1]);
    });

    it('Emit input if value not number', () => {
      wrapper.setProps({
        value: false,
      });
      wrapper.trigger('click');
      expect(wrapper.emitted('input')[0]).toEqual([true]);
    });
});
