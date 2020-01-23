/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { Store } from 'vuex-mock-store';
import Grid from '@Core/components/Grid/Grid';

const localVue = createLocalVue();
const store = new Store({
    state: {
        draggable: {
            isListElementDragging: false,
            draggedElIndex: -1,
            bounds: null,
            ghostIndex: -1,
            draggedElement: null,
        },
    },
    dispatch: jest.fn(),
});

const mocks = {
    $store: store,
};

describe('Grid/Grid', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Grid, {
            localVue,
            mocks,
            propsData: {
                title: 'Products',
            },
        });
    });

    beforeAll(() => {
        window.IntersectionObserver = jest.fn(function () {
            this.observe = jest.fn();
        });
    });

    it('Component is named well', () => {
        expect(typeof Grid.name).toBe('string');
        expect(Grid.name).toEqual('Grid');
    });

    describe('mixins/selectedRowMixin', () => {
        describe('Selecting every row by marking header check', () => {
            it('None of rows are selected', () => {
                wrapper.vm.onSelectAllRows(true);

                expect(wrapper.vm.isSelectedAllRows).toBeTruthy();
            });

            it('All rows are selected', () => {
                wrapper.vm.onSelectAllRows(false);

                expect(wrapper.vm.isSelectedAllRows).toBeFalsy();
            });

            it('Some of rows are selected', () => {
                wrapper.setData({
                    selectedRows: {
                        1: true,
                    },
                });

                wrapper.vm.onSelectAllRows(true);

                expect(wrapper.vm.selectedRows).toStrictEqual({});
            });
        });

        describe('Select single row', () => {
            it('Row is not selected', () => {
                wrapper.vm.onSelectRow({ row: 1, isSelected: true });

                expect(wrapper.vm.selectedRows).toStrictEqual({ 1: true });
            });

            it('Row is selected', () => {
                wrapper.setData({
                    selectedRows: {
                        1: true,
                    },
                });

                wrapper.vm.onSelectRow({ row: 1, isSelected: false });

                expect(wrapper.vm.selectedRows).toStrictEqual({ });
            });

            it('Each row was selected - unselect one row', () => {
                wrapper.setData({
                    isBasicFilters: false,
                    isSelectedAllRows: true,
                    selectedRows: {
                        1: true,
                        2: true,
                        3: true,
                        4: true,
                        5: true,
                    },
                });

                wrapper.vm.onSelectRow({ row: 1, isSelected: false });

                expect(wrapper.vm.selectedRows).toStrictEqual({
                    2: true,
                    3: true,
                    4: true,
                    5: true,
                });
            });
        });
    });
});
