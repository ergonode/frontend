/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import AdvancedFilterShowOnly from '@UI/components/AdvancedFilters/AdvancedFilterShowOnly';
import {
    shallowMount,
} from '@vue/test-utils';

describe('AdvancedFilters/AdvancedFilterShowOnly', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(AdvancedFilterShowOnly, {
            propsData: {
                value: false,
            },
            stubs: {
                Toggler: true,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof AdvancedFilterShowOnly.name).toBe('string');
        expect(AdvancedFilterShowOnly.name).toEqual('AdvancedFilterShowOnly');
    });

    it('Emitted value is reversed', () => {
        wrapper.vm.onValueChange(!wrapper.vm.value);

        expect(wrapper.emitted().input).toBeTruthy();
        expect(wrapper.emitted().input[0][0]).toEqual(true);
    });
});
