/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from "@vue/test-utils"
import Button from '~/components/Buttons/Button';

const localVue = createLocalVue();
localVue.directive('ripple', {});

describe('Buttons/Button', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(Button, {
        localVue,
      });
    });
    afterEach(() => {
      wrapper.destroy();
    });
    it("Component is rendered", () => {
      expect(wrapper.is(Button)).toBe(true);
    });

    it('Component is named well', () => {
      expect(typeof Button.name).toBe('string');
      expect(Button.name).toEqual('Button');
    });

    it('Check if button has not children', () => {
      const icon = wrapper.find('.btn__icon');
      const label = wrapper.find('label');
      expect(icon.exists()).toBe(false);
      expect(label.exists()).toBe(false);
    });

    it('Check if button has children', () => {
      wrapper.setProps({
        title: 'paper',
      });
      expect(wrapper.vm.title).toBe("paper");
    });

    it('Check title classes', () => {
      expect(wrapper.vm.titleTypo).toBe("typo-btn l-spacing--half");
      wrapper.setProps({
        small: true,
      });
      expect(wrapper.vm.titleTypo).toBe("typo-btn--xs");
    });

    it('Check button classes if no props', () => {
      expect(wrapper.vm.buttonTypeClasses).toStrictEqual([
        "btn",
        "theme",
        "theme--light",
        "primary",
        {
          "btn--fab": false,
          "btn--large": false,
          "btn--rounded": false,
          "btn--small": false
        }
      ]);
    });

    it('Check button classes', () => {
      wrapper.setProps({
        theme: 'dark',
        color: 'success',
        small: true,
        fab: true,
      });
      expect(wrapper.vm.buttonTypeClasses).toStrictEqual([
        "btn",
        "theme",
        "theme--dark",
        "success",
        {
          "btn--fab": true,
          "btn--large": false,
          "btn--rounded": false,
          "btn--small": true
        }
      ]);
    });
});
