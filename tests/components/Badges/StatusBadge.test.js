/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import StatusBadge from '~/components/Badges/StatusBadge.vue';


describe('Badges/StatusBadge', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(StatusBadge, {
            propsData: {
                color: '#000',
            }
        });
    });

    it('Component is rendered', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Component is named well', () => {
        expect(typeof StatusBadge.name).toBe('string');
        expect(StatusBadge.name).toEqual('StatusBadge');
    });

    it('Check default color', () => {
        expect(wrapper.vm.color).toEqual('#000');
    });

    it('Check color', () => {
        wrapper.setProps({
            color: '#fff',
        });
        expect(wrapper.vm.color).toEqual('#fff');
    });

});
