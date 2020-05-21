/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import GridAdvancedFilterBaseContent from '@Core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterBaseContent';
import GridAdvancedFilterTextContent from '@Core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterTextContent';

describe('Grid/AdvancedFilters/Contents/GridAdvancedFilterBaseContent', () => {
    let wrapper;
    beforeEach(() => {
        const contentWrapper = {
            render(h) {
                return h(GridAdvancedFilterTextContent, { props: { filter: {} } });
            },
        };

        wrapper = shallowMount(GridAdvancedFilterBaseContent, {
            propsData: {
                isEmptyRecord: false,
            },
            slots: {
                default: contentWrapper,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof GridAdvancedFilterBaseContent.name).toBe('string');
        expect(GridAdvancedFilterBaseContent.name).toEqual('GridAdvancedFilterBaseContent');
    });

    describe('Slots', () => {
        it('Are rendered', () => {
            expect(wrapper.find(GridAdvancedFilterTextContent).isVueInstance()).toBe(true);
        });

        // FIXME
        // it('Are not rendered', () => {
        //     wrapper.setProps({
        //         isEmptyRecord: true,
        //     });
        //
        //     expect(wrapper.findAll(GridAdvancedFilterTextContent).length).toBe(0);
        // });
    });

    describe('Emits', () => {
        it('Not empty records', () => {
            wrapper.vm.onValueChange();
            expect(wrapper.emitted().input).toBeTruthy();
            expect(wrapper.emitted().input[0][0]).toEqual(true);
        });

        it('Empty records', () => {
            wrapper.setProps({
                isEmptyRecord: true,
            });

            wrapper.vm.onValueChange();
            expect(wrapper.emitted().input).toBeTruthy();
            expect(wrapper.emitted().input[0][0]).toEqual(false);
        });
    });
});
