/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    DEFAULT_COLUMNS,
    DEFAULT_ROWS,
} from '@UI/components/Designer/__tests__/__mocks__';
import DesignerBackgroundLayer from '@UI/components/Designer/DesignerBackgroundLayer';
import {
    createLocalVue,
    shallowMount,
} from '@vue/test-utils';

const localVue = createLocalVue();

describe('Designer/DesignerBackgroundLayer', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(DesignerBackgroundLayer, {
            localVue,
            propsData: {
                columns: DEFAULT_COLUMNS,
                rows: DEFAULT_ROWS,
            },
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('Component is named well', () => {
        expect(typeof DesignerBackgroundLayer.name).toBe('string');
        expect(DesignerBackgroundLayer.name).toEqual('DesignerBackgroundLayer');
    });

    describe('Calculations', () => {
        it('Number of generated background items', () => {
            expect(wrapper.vm.numberOfItems).toBe(DEFAULT_ROWS * DEFAULT_COLUMNS);
        });

        it('Column index for scoped slot is correct', () => {
            const result = wrapper.vm.getColumn(10);

            expect(result).toBe(2);
        });

        it('Row index for scoped slot is correct', () => {
            const result = wrapper.vm.getRow(10);

            expect(result).toBe(2);
        });
    });
});
