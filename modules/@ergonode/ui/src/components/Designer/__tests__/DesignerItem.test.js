/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    DEFAULT_GAP,
} from '@UI/components/Designer/__tests__/__mocks__/index';
import DesignerItem from '@UI/components/Designer/DesignerItem';
import {
    createLocalVue,
    shallowMount,
} from '@vue/test-utils';

const localVue = createLocalVue();

describe('Designer/DesignerItem', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(DesignerItem, {
            localVue,
            propsData: {
                row: 1,
                column: 1,
                gap: DEFAULT_GAP,
                width: 1,
                height: 1,
            },
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('Component is named well', () => {
        expect(typeof DesignerItem.name).toBe('string');
        expect(DesignerItem.name).toEqual('DesignerItem');
    });

    describe('Calculations', () => {
        it('Has correct style', () => {
            const {
                gridArea,
                margin,
            } = wrapper.vm.styles;

            expect(gridArea).toEqual('2 / 2 / 3 / 3');
            expect(margin).toEqual('8px');
        });
    });
});
