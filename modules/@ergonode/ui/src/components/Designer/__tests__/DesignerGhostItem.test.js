/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    DEFAULT_GAP,
    DEFAULT_ROW_HEIGHT,
} from '@UI/components/Designer/__tests__/__mocks__';
import DesignerGhostItem from '@UI/components/Designer/DesignerGhostItem';
import {
    createLocalVue,
    shallowMount,
} from '@vue/test-utils';

const localVue = createLocalVue();

describe('Designer/DesignerGhostItem', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(DesignerGhostItem, {
            localVue,
            propsData: {
                row: 1,
                column: 1,
                gap: DEFAULT_GAP,
                rowHeight: DEFAULT_ROW_HEIGHT,
                width: 1,
                height: 1,
            },
            stubs: {
                IconAddFilter: true,
            },
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('Component is named well', () => {
        expect(typeof DesignerGhostItem.name).toBe('string');
        expect(DesignerGhostItem.name).toEqual('DesignerGhostItem');
    });

    describe('Calculations', () => {
        it('Has correct style', () => {
            const {
                gridArea,
                margin,
                height,
            } = wrapper.vm.styles;

            expect(gridArea).toEqual('2 / 2 / 3 / 3');
            expect(height).toEqual('48px');
            expect(margin).toEqual('8px');
        });
    });
});
