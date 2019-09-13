/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount, createLocalVue } from '@vue/test-utils';
import { Store } from 'vuex-mock-store';
import GridColumn from '~/components/Grid/GridColumn';
import sinon from 'sinon';

const localVue = createLocalVue();
const store = new Store({
    state: {
        grid: {
            configuration: {
                isColumnMoveable: true,
                isColumnResizeable: true,
            },
        },
        draggable: {
            draggedElIndex: -1,
        },
        authentication: {

        },
    },
});
const mocks = {
    $store: store,
};

describe('Grid/GridColumn', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(GridColumn, {
            localVue,
            mocks,
            propsData: {
                storeNamespace: 'grid',
                index: 1,
                column: { width: 100 },
            },
        });
    });

    it('Component is rendered', () => {
        expect(wrapper.is(GridColumn)).toBe(true);
    });

    it('Component is named well', () => {
        expect(typeof GridColumn.name).toBe('string');
        expect(GridColumn.name).toEqual('GridColumn');
    });

    describe('Layout configuration', () => {
        it('Grid cells has correct size', () => {
            wrapper.setProps({
                rowsHeight: 50,
            });

            expect(wrapper.vm.colGridTemplate).toStrictEqual({
                gridAutoRows: '50px',
            });
        });
    });

    describe('Drag & Drop', () => {
        it('Column is dragged', () => {
            const stub = jest.fn();
            wrapper.setMethods({ onDragStart: stub });
            wrapper.find('.column').trigger('dragstart');
            expect(stub).toHaveBeenCalled();
        });
    });
});
