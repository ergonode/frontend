/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount, createLocalVue } from "@vue/test-utils";
import Alert from '~/components/Alerts/Alert.vue';

const localVue = createLocalVue();
localVue.directive('ripple', {});

describe('Alerts/Feedback', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Alert, {
      localVue,
      propsData: {
        type: '',
      },
    });
  });

  it('Component is rendered', () => {
    expect(wrapper.is(Alert)).toBe(true);
  });

  it('Component is named well', () => {
    expect(typeof Alert.name).toBe('string');
    expect(Alert.name).toEqual('Alert');
  });

  it('Check alerts', () => {
      const alerts = wrapper.findAll('.alert');
      expect(alerts.length).toBe(1);
      expect(wrapper.vm.type).toBe("");
  });
  it('Check alert props', () => {
    wrapper.setProps({
      type: 'error',
      message: 'test',
    });
    expect(wrapper.vm.type).toBe("error");
    expect(wrapper.vm.message).toBe("test");
  });

  it('Check alert classes', () => {
    wrapper.setProps({
      type: 'success',
    });
    expect(wrapper.vm.typeClass).toBe("alert--success");
  });

});
