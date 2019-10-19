/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import GridAdvancedFilterTextContent from '~/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterTextContent';

describe('Grid/AdvancedFilters/Contents/GridAdvancedFilterTextContent', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(GridAdvancedFilterTextContent, {
            propsData: {
                value: '',
            },
        });
    });

    it('Component is rendered', () => {
        expect(wrapper.is(GridAdvancedFilterTextContent)).toBe(true);
    });

    it('Component is named well', () => {
        expect(typeof GridAdvancedFilterTextContent.name).toBe('string');
        expect(GridAdvancedFilterTextContent.name).toEqual('GridAdvancedFilterTextContent');
    });
});
