/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { Store } from 'vuex-mock-store';
import GridColumn from '~/components/Grid/Columns/GridColumn';
import draggableMutations from '~/store/draggable/mutations';
import {
    GHOST_ELEMENT_MODEL,
} from '~/defaults/grid/main';

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

describe('Grid/GridColumn', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(GridColumn, {
            localVue,
            mocks,
            propsData: {
                namespace: 'grid',
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
                rowHeight: 50,
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

        describe('Columns transform', () => {
            let gridContent = null;

            beforeAll(() => {
                Element.prototype.getBoundingClientRect = jest.fn(() => {
                    return {
                        width: 200,
                        height: 0,
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                    }
                });
                const columnStyle = `
                    height: 100%;
                    width: 200px;
                `;
                const contentStyle = `
                    display: grid;
                    gird-auto-flow: column;
                    height: 500px;
                `;
                gridContent = document.createElement('div');
                const column1 = document.createElement('div');
                const column2 = document.createElement('div');
                const column3 = document.createElement('div');
                const column4 = document.createElement('div');
                const column5 = document.createElement('div');
                const column6 = document.createElement('div');
                const column7 = document.createElement('div');

                gridContent.appendChild(column1);
                gridContent.appendChild(column2);
                gridContent.appendChild(column3);
                gridContent.appendChild(column4);
                gridContent.appendChild(column5);
                gridContent.appendChild(column6);
                gridContent.appendChild(column7);

                gridContent.setAttribute('style', contentStyle);
                column1.setAttribute('style', columnStyle);
                column2.setAttribute('style', columnStyle);
                column3.setAttribute('style', columnStyle);
                column4.setAttribute('style', columnStyle);
                column5.setAttribute('style', columnStyle);
                column6.setAttribute('style', columnStyle);
                column7.setAttribute('style', columnStyle);
            });

            it('Dragged index is higher than index bellow mouse', () => {
                draggableMutations.SET_DRAGGED_EL_INDEX(store.state.draggable, 3);
                draggableMutations.SET_GHOST_INDEX(store.state.draggable, 3);

                let lowerBounds = {};

                wrapper.setProps({
                    index: 2,
                });

                lowerBounds = wrapper.vm.getLowerBoundsTransforms(gridContent, 200, 0);

                expect(lowerBounds).toStrictEqual({ transforms: { 2: 200 }, updatedGhostTransform: -200 });

                wrapper.setProps({
                    index: 1,
                });

                lowerBounds = wrapper.vm.getLowerBoundsTransforms(gridContent, 200, 0);

                expect(lowerBounds).toStrictEqual({ transforms: { 2: 200, 1: 200 }, updatedGhostTransform: -400 });

                wrapper.setProps({
                    index: 0,
                });

                lowerBounds = wrapper.vm.getLowerBoundsTransforms(gridContent, 200, 0);

                expect(lowerBounds).toStrictEqual({ transforms: { 2: 200, 1: 200, 0: 200 }, updatedGhostTransform: -600 });
            });

            it('Dragged index is lower than index bellow mouse', () => {
                draggableMutations.SET_DRAGGED_EL_INDEX(store.state.draggable, 3);
                draggableMutations.SET_GHOST_INDEX(store.state.draggable, 3);

                let upperBounds = {};

                wrapper.setProps({
                    index: 4,
                });

                upperBounds = wrapper.vm.getUpperBoundsTransforms(gridContent, 200, 0);

                expect(upperBounds).toStrictEqual({ transforms: { 4: -200 }, updatedGhostTransform: 200 });

                wrapper.setProps({
                    index: 5,
                });

                upperBounds = wrapper.vm.getUpperBoundsTransforms(gridContent, 200, 0);

                expect(upperBounds).toStrictEqual({ transforms: { 4: -200, 5: -200 }, updatedGhostTransform: 400 });

                wrapper.setProps({
                    index: 6,
                });

                upperBounds = wrapper.vm.getUpperBoundsTransforms(gridContent, 200, 0);

                expect(upperBounds).toStrictEqual({ transforms: { 4: -200, 5: -200, 6: -200 }, updatedGhostTransform: 600 });
            });

            it('Dragged index is higher than index bellow mouse and ghost element is greater than dragged index', () => {
                draggableMutations.SET_DRAGGED_EL_INDEX(store.state.draggable, 3);
                draggableMutations.SET_GHOST_INDEX(store.state.draggable, 4);
                gridContent.children[4].style.transform = 'translateX(200px)';

                let lowerBounds = {};

                wrapper.setProps({
                    index: 2,
                });
                lowerBounds = wrapper.vm.getLowerBoundsTransforms(gridContent, 200, -200);

                expect(lowerBounds).toStrictEqual({ transforms: { 4: 0, 2: 200 }, updatedGhostTransform: -200 });

                wrapper.setProps({
                    index: 1,
                });
                lowerBounds = wrapper.vm.getLowerBoundsTransforms(gridContent, 200, -200);

                expect(lowerBounds).toStrictEqual({ transforms: { 4: 0, 2: 200, 1: 200 }, updatedGhostTransform: -400 });

                gridContent.children[4].style.transform = 'translateX(0)';
                gridContent.children[2].style.transform = 'translateX(200px)';
                gridContent.children[1].style.transform = 'translateX(200px)';

                wrapper.setProps({
                    index: 4,
                });
            });
        });
    });
});
