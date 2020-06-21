/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import GridAdvancedFilterTextContent from '@Core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterTextContent';
import { FILTER_OPERATOR } from '@Core/defaults/operators';
import { shallowMount } from '@vue/test-utils';

describe('Grid/AdvancedFilters/Contents/GridAdvancedFilterTextContent', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(GridAdvancedFilterTextContent, {
            propsData: {
                filter: {
                    value: '',
                },
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof GridAdvancedFilterTextContent.name).toBe('string');
        expect(GridAdvancedFilterTextContent.name).toEqual('GridAdvancedFilterTextContent');
    });

    describe('Filter value', () => {
        it('Is not defined', () => {
            expect(wrapper.vm.filterValue).toBe('');
        });

        it('Has value', () => {
            wrapper.setProps({
                filter: {
                    value: { [FILTER_OPERATOR.EQUAL]: 'Test value' },
                },
            });

            expect(wrapper.vm.filterValue).toBe('Test value');
        });
    });
});
