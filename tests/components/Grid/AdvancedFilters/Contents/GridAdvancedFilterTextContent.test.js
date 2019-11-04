/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import GridAdvancedFilterTextContent from '~/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterTextContent';
import { FILTER_OPERATOR } from '~/defaults/operators';

describe('Grid/AdvancedFilters/Contents/GridAdvancedFilterTextContent', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(GridAdvancedFilterTextContent, {
            propsData: {
                filter: null,
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
                    [FILTER_OPERATOR.EQUAL]: 'Test value',
                },
            });

            expect(wrapper.vm.filterValue).toBe('Test value');
        });

        it('Has empty records', () => {
            wrapper.setProps({
                filter: {
                    isEmptyRecord: true,
                },
            });

            expect(wrapper.vm.isEmptyRecord).toBeTruthy();
        });

        it('Has no empty records', () => {
            wrapper.setProps({
                filter: null,
            });

            expect(wrapper.vm.isEmptyRecord).toBeFalsy();
        });
    });
});
