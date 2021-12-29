/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    DEFAULT_COLUMNS,
    DEFAULT_ROW_HEIGHT,
} from '@UI/components/Designer/__tests__/__mocks__';
import Designer from '@UI/components/Designer/Designer';
import {
    createLocalVue,
    shallowMount,
} from '@vue/test-utils';

const localVue = createLocalVue();
localVue.component('Button', {});

describe('Designer/DesignerBackgroundLayer', () => {
    let wrapper;
    const lastItemRow = 0;

    beforeEach(() => {
        wrapper = shallowMount(Designer, {
            localVue,
            propsData: {
                columns: DEFAULT_COLUMNS,
                lastItemRow,
                rowHeight: DEFAULT_ROW_HEIGHT,
            },
            stubs: {
                ResizeObserver: true,
                Button: true,
            },
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('Component is named well', () => {
        expect(typeof Designer.name).toBe('string');
        expect(Designer.name).toEqual('Designer');
    });

    describe('Calculations', () => {
        it('Default grid layer', () => {
            const {
                gridTemplateColumns,
                gridTemplateRows,
            } = wrapper.vm.layerStyle;

            expect(gridTemplateColumns).toEqual('repeat(4, 1fr)');
            expect(gridTemplateRows).toEqual('repeat(0, 64px)');
        });

        it('Height has changed', () => {
            wrapper.vm.onResize({
                contentRect: {
                    height: 1000,
                },
            });

            expect(wrapper.vm.rows).toEqual(14);
            expect(wrapper.emitted().rows[0][0]).toEqual(14);
        });

        it('Added additional row', async () => {
            const button = await wrapper.findComponent({
                name: 'button',
            });

            button.trigger('click');

            expect(wrapper.emitted().rows[0][0]).toEqual(1);
            expect(wrapper.vm.additionalRows).toEqual(1);
            expect(wrapper.vm.rows).toEqual(1);
        });
    });
});
