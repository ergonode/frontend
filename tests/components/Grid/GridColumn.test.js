/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount, createLocalVue } from '@vue/test-utils';
import { Store } from 'vuex-mock-store';
import GridColumn from '~/components/Grid/GridColumn';
import draggableMutations from '~/store/draggable/mutations';
import {
    getGhostColumnElementModel,
} from '~/model/grid/layout/GridColumnElementCopy';

const localVue = createLocalVue();
const store = new Store({
    state: {
        grid: {
            configuration: {
                isColumnMoveable: true,
                isColumnResizeable: true,
            },
            editingCellCoordinates: {},
        },
        draggable: {
            draggedElIndex: -1,
            bounds: null,
            ghostElTransform: 0,
            ghostIndex: -1,
            draggedElement: null,
        },
        authentication: {

        },
    },
    dispatch: jest.fn(),
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

    describe('Calculations', () => {
        describe('Calculating index under dragged column', () => {
            beforeEach(() => {
                wrapper.setProps({
                    index: 2,
                });
            });

            it('Column above has no transform, it has not had interaction yet', () => {
                const result = wrapper.vm.getColumnFixedIndex();

                expect(result).toBe(2);
            });

            it('Column above has positive transform, it was moved to next position', () => {
                wrapper.vm.setColumnElementTransform(100);
                const result = wrapper.vm.getColumnFixedIndex();

                expect(result).toBe(3);
            });

            it('Column above has negative transform, it was moved to position before', () => {
                wrapper.vm.setColumnElementTransform(-100);
                const result = wrapper.vm.getColumnFixedIndex();

                expect(result).toBe(1);
            });
        });

        describe('Calculating ghost index position after interactions of dragged column with column bellow', () => {
            describe('Dragged column is before first half of column bellow', () => {
                it('Index of column bellow is smaller than dragged column (The origin of dragged column is after column bellow)', () => {
                    draggableMutations.SET_DRAGGED_EL_INDEX(store.state.draggable, 3);
                    wrapper.setProps({
                        index: 2,
                    });

                    wrapper.vm.updateGhostIndex(true);

                    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('draggable/setGhostIndex', 2);
                });

                it('Index of column bellow is greater than dragged column (The origin of dragged column is before column bellow)', () => {
                    draggableMutations.SET_DRAGGED_EL_INDEX(store.state.draggable, 2);
                    wrapper.setProps({
                        index: 3,
                    });

                    wrapper.vm.updateGhostIndex(true);

                    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('draggable/setGhostIndex', 2);
                });
            });

            describe('Dragged column is after first half of column bellow', () => {
                it('Index of column bellow is smaller than dragged column (The origin of dragged column is after column bellow)', () => {
                    draggableMutations.SET_DRAGGED_EL_INDEX(store.state.draggable, 3);
                    wrapper.setProps({
                        index: 2,
                    });

                    wrapper.vm.updateGhostIndex(false);

                    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('draggable/setGhostIndex', 3);
                });

                it('Index of column bellow is greater than dragged column (The origin of dragged column is before column bellow)', () => {
                    draggableMutations.SET_DRAGGED_EL_INDEX(store.state.draggable, 2);
                    wrapper.setProps({
                        index: 3,
                    });

                    wrapper.vm.updateGhostIndex(false);

                    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('draggable/setGhostIndex', 2);
                });
            });
        });

        describe('Insert ghost column if it does not exist - dragged column/list element is out of bounds grid', () => {
            beforeEach(() => {
                wrapper.setProps({
                    index: 2,
                });
            });

            const xPos = 0;
            const width = 200;

            describe('Dragged element is column', () => {
                beforeEach(() => {
                    draggableMutations.SET_DRAGGED_ELEMENT(store.state.draggable, {});
                    draggableMutations.SET_BOUNDS(store.state.draggable, { width: 200 });
                });

                it('Dragged element is before first half of column bellow', () => {
                    const isBefore = true;

                    wrapper.vm.insertColumnOnDragOver(isBefore, xPos, width);

                    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('grid/insertColumnAtIndex', { column: {}, index: 2 });
                    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('grid/insertColumnWidthAtIndex', { width: `${wrapper.vm.$store.state.draggable.bounds.width}px`, index: 2 });
                    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('draggable/setGhostIndex', 2);
                    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('draggable/setDraggedElIndex', 2);
                });

                it('Dragged element is after first half of column bellow', () => {
                    const isBefore = false;

                    wrapper.vm.insertColumnOnDragOver(isBefore, xPos, width);

                    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('grid/insertColumnAtIndex', { column: {}, index: 3 });
                    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('grid/insertColumnWidthAtIndex', { width: `${wrapper.vm.$store.state.draggable.bounds.width}px`, index: 3 });
                    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('draggable/setGhostIndex', 3);
                    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('draggable/setDraggedElIndex', 3);
                });
            });

            describe('Dragged element is list element', () => {
                beforeEach(() => {
                    draggableMutations.SET_DRAGGED_ELEMENT(store.state.draggable, 'id');
                });

                it('Dragged element is before first half of column bellow', () => {
                    const isBefore = true;

                    wrapper.vm.insertColumnOnDragOver(isBefore, xPos, width);

                    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('grid/insertColumnAtIndex', { column: getGhostColumnElementModel(), index: 2 });
                    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('grid/insertColumnWidthAtIndex', { width: '100px', index: 2 });
                    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('draggable/setGhostIndex', 2);
                    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('draggable/setDraggedElIndex', 2);
                });

                it('Dragged element is after first half of column bellow', () => {
                    const isBefore = false;

                    wrapper.vm.insertColumnOnDragOver(isBefore, xPos, width);

                    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('grid/insertColumnAtIndex', { column: getGhostColumnElementModel(), index: 3 });
                    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('grid/insertColumnWidthAtIndex', { width: '100px', index: 3 });
                    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('draggable/setGhostIndex', 3);
                    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('draggable/setDraggedElIndex', 3);

                });
            });
        });
    });
});
