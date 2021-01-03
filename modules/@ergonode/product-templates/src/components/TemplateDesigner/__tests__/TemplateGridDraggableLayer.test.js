/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    createLocalVue,
    shallowMount,
} from '@vue/test-utils';
import {
    Store,
} from 'vuex-mock-store';

// import TreeDesignerDraggableLayer from '../Base/TreeDesignerDraggableLayer';

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

describe('Template/Base/TreeDesignerDraggableLayer', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(TreeDesignerDraggableLayer, {
            localVue,
            mocks,
            propsData: {
                columnsNumber: 4,
                rowsNumber: 4,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof TreeDesignerDraggableLayer.name).toBe('string');
        expect(TreeDesignerDraggableLayer.name).toEqual('TreeDesignerDraggableLayer');
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
