/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import InformationBadge from '~/components/Badges/InformationBadge.vue';


describe('Badges/InformationBadge', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(InformationBadge, {
          propsData: {
              title: '',
          }
      });
    });

    it('Component is rendered', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Component is named well', () => {
        expect(typeof InformationBadge.name).toBe('string');
        expect(InformationBadge.name).toEqual('InformationBadge');
    });

    it('Check default text', () => {
        expect(wrapper.find('.badge__title').text()).toEqual('');
    });

    it('Check text', () => {
        wrapper.setProps({
            title: 'test',
        });
        expect(wrapper.find('.badge__title').text()).toEqual('test');
    });
});
