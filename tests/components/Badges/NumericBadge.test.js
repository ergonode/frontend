/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import NumericBadge from '~/components/Badges/NumericBadge.vue';


describe('Badges/NumericBadge', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(NumericBadge, {
            propsData: {
                number: 0,
            }
        });
    });

    it('Component is named well', () => {
        expect(typeof NumericBadge.name).toBe('string');
        expect(NumericBadge.name).toEqual('NumericBadge');
    });

    it('Check default text', () => {
        expect(wrapper.find('span').text()).toEqual('0');
    });

    it('Check text', () => {
        wrapper.setProps({
            number: 4,
        });
        expect(wrapper.find('span').text()).toEqual('4');
    });
});
