/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import GridAdvancedFilterShowOnly from '@Core/components/Grid/AdvancedFilters/GridAdvancedFilterShowOnly';

describe('Grid/AdvancedFilters/Contents/GridAdvancedFilterShowOnly', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(GridAdvancedFilterShowOnly, {
            propsData: {
                value: false,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof GridAdvancedFilterShowOnly.name).toBe('string');
        expect(GridAdvancedFilterShowOnly.name).toEqual('GridAdvancedFilterShowOnly');
    });

    it('Emitted value is reversed', () => {
        wrapper.vm.onValueChange(!wrapper.vm.value);

        expect(wrapper.emitted().input).toBeTruthy();
        expect(wrapper.emitted().input[0][0]).toEqual(true);
    });
});
