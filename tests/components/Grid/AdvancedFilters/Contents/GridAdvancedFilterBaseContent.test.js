/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import GridAdvancedFilterBaseContent from '~/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterBaseContent';
import GridAdvancedFilterTextContent from '~/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterTextContent';

describe('Grid/AdvancedFilters/Contents/GridAdvancedFilterBaseContent', () => {
    let wrapper;
    beforeEach(() => {
        const contentWrapper = {
            render(h) {
                return h(GridAdvancedFilterTextContent, { props: { value: 'Test' } });
            }
        };

        wrapper = shallowMount(GridAdvancedFilterBaseContent, {
            slots: {
                default: contentWrapper,
            },
        });
    });

    it('Component is rendered', () => {
        expect(wrapper.is(GridAdvancedFilterBaseContent)).toBe(true);
    });

    it('Component is named well', () => {
        expect(typeof GridAdvancedFilterBaseContent.name).toBe('string');
        expect(GridAdvancedFilterBaseContent.name).toEqual('GridAdvancedFilterBaseContent');
    });

    describe('Slots', () => {
        it('Are rendered', () => {
            expect(wrapper.find(GridAdvancedFilterTextContent).isVueInstance()).toBe(true);
        });

        it('Are not rendered', () => {
            wrapper.setData({
                showOnlyEmptyRecords: true,
            });

            expect(wrapper.findAll(GridAdvancedFilterTextContent).length).toBe(0);
        });
    });
});
