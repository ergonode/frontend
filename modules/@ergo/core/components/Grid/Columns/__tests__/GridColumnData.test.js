/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { Store } from 'vuex-mock-store';
import GridColumnData from '@Core/components/Grid/Columns/GridColumnData';
import draggableMutations from '@Core/store/draggable/mutations';

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

describe('Grid/GridColumnData', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(GridColumnData, {
            localVue,
            mocks,
            propsData: {
                namespace: 'grid',
                index: 1,
                column: { width: 100 },
                columnOffset: 0,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof GridColumnData.name).toBe('string');
        expect(GridColumnData.name).toEqual('GridColumnData');
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
        describe('Calculating ghost index position after interactions of dragged column with column bellow', () => {
            describe('Dragged column is before first half of column bellow', () => {
                it('Index of column bellow is smaller than dragged column (The origin of dragged column is after column bellow)', () => {
                    draggableMutations.SET_DRAGGED_EL_INDEX(store.state.draggable, 3);
                    wrapper.setProps({
                        index: 2,
                    });

                    const targetGhostIndex = wrapper.vm.getTargetGhostIndex(false);

                    expect(targetGhostIndex).toBe(3);
                });

                it('Index of column bellow is greater than dragged column (The origin of dragged column is before column bellow)', () => {
                    draggableMutations.SET_DRAGGED_EL_INDEX(store.state.draggable, 2);
                    wrapper.setProps({
                        index: 3,
                    });


                    const targetGhostIndex = wrapper.vm.getTargetGhostIndex(true);

                    expect(targetGhostIndex).toBe(2);
                });
            });

            describe('Dragged column is after first half of column bellow', () => {
                it('Index of column bellow is smaller than dragged column (The origin of dragged column is after column bellow)', () => {
                    draggableMutations.SET_DRAGGED_EL_INDEX(store.state.draggable, 3);
                    wrapper.setProps({
                        index: 2,
                    });


                    const targetGhostIndex = wrapper.vm.getTargetGhostIndex(false);

                    expect(targetGhostIndex).toBe(3);
                });

                it('Index of column bellow is greater than dragged column (The origin of dragged column is before column bellow)', () => {
                    draggableMutations.SET_DRAGGED_EL_INDEX(store.state.draggable, 2);
                    wrapper.setProps({
                        index: 3,
                    });


                    const targetGhostIndex = wrapper.vm.getTargetGhostIndex(true);

                    expect(targetGhostIndex).toBe(2);
                });
            });
        });

        describe('Column transform with fixed index', () => {
            it('Column has transform', () => {
                wrapper.vm.$el.style.transform = 'translateX(200px)';
                wrapper.setProps({
                    index: 3,
                });

                expect(wrapper.vm.getElementTransform()).toBe(200);
                expect(wrapper.vm.getColumnFixedIndex()).toBe(4);

                wrapper.vm.$el.style.transform = 'translateX(-200px)';

                expect(wrapper.vm.getElementTransform()).toBe(-200);
                expect(wrapper.vm.getColumnFixedIndex()).toBe(2);
            });

            it('Column does not have transform', () => {
                wrapper.setProps({
                    index: 3,
                });

                expect(wrapper.vm.getElementTransform()).toBe(0);
                expect(wrapper.vm.getColumnFixedIndex()).toBe(3);
            });
        });
    });
});
