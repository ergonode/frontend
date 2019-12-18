/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { Store } from 'vuex-mock-store';
import TemplateGridDraggableLayer from '~/components/Template/Base/TemplateGridDraggableLayer';

const localVue = createLocalVue();
const store = new Store({
    state: {
        draggable: {
            draggedElement: {},
        },
    },
});
const mocks = {
    $store: store,
};

describe('Template/Base/TemplateGridDraggableLayer', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(TemplateGridDraggableLayer, {
            localVue,
            mocks,
            propsData: {
                columnsNumber: 4,
                rowsNumber: 4,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof TemplateGridDraggableLayer.name).toBe('string');
        expect(TemplateGridDraggableLayer.name).toEqual('TemplateGridDraggableLayer');
    });

    it('Interactive placeholder positions', () => {
        const positions = [
            {
                row: 1,
                column: 1,
            },
            {
                row: 1,
                column: 2,
            },
            {
                row: 1,
                column: 3,
            },
            {
                row: 1,
                column: 4,
            },
            {
                row: 2,
                column: 1,
            },
            {
                row: 2,
                column: 2,
            },
            {
                row: 2,
                column: 3,
            },
            {
                row: 2,
                column: 4,
            },
            {
                row: 3,
                column: 1,
            },
            {
                row: 3,
                column: 2,
            },
            {
                row: 3,
                column: 3,
            },
            {
                row: 3,
                column: 4,
            },
            {
                row: 4,
                column: 1,
            },
            {
                row: 4,
                column: 2,
            },
            {
                row: 4,
                column: 3,
            },
            {
                row: 4,
                column: 4,
            },
        ];

        expect(wrapper.vm.gridLayerPositions).toEqual(positions);
    });
});
