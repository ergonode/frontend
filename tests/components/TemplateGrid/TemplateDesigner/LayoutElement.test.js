/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount, createLocalVue } from '@vue/test-utils';
import { Store } from 'vuex-mock-store';
import LayoutElement from '~/components/Template/TemplateDesigner/LayoutElement';

const localVue = createLocalVue();
const store = new Store({
    state: {
        draggable: {
            draggedElement: {},
        },
    },
    mutations: {

    },
    actions: {

    },
});
const mocks = {
    $store: store,
};

describe('Template/TemplateDesigner/LayoutElement', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(LayoutElement, {
            localVue,
            mocks,
            propsData: {
                index: 1,
                element: {
                    id: 'testId', width: 1, height: 1, row: 1, column: 1,
                },
                columnsNumber: 4,
                rowsNumber: 10,
            },
        });
    });

    it('Component is rendered', () => {
        expect(wrapper.is(LayoutElement)).toBe(true);
    });

    it('Component is named well', () => {
        expect(typeof LayoutElement.name).toBe('string');
        expect(LayoutElement.name).toEqual('LayoutElement');
    });

    describe('Dragging events', () => {

    });

    describe('Setting data', () => {
        it('Element width and height is set', () => {
            wrapper.setData({
                startWidth: 200,
                startHeight: 50,
            });
            wrapper.vm.initElementStyleForResizeState();

            expect(wrapper.vm.$el.style.width).toEqual('200px');
            expect(wrapper.vm.$el.style.height).toEqual('50px');
        });

        it('Data is reseted', () => {
            wrapper.vm.resetDataForEndResizeInteraction();

            expect(wrapper.vm.isDraggingEnabled).toEqual(true);
            expect(wrapper.vm.highlightingPositions).toEqual([]);
        });

        it('Element width and height is reseted', () => {
            wrapper.vm.resetElementStyleForEndResizeInteraction();

            expect(wrapper.vm.$el.style.width).toEqual('');
            expect(wrapper.vm.$el.style.height).toEqual('');
        });

        it('New width and height', () => {
            wrapper.vm.initElementNormalizedBoundary();

            expect(wrapper.vm.newWidth).toEqual(1);
            expect(wrapper.vm.newHeight).toEqual(1);
        });

        it('Actual row and column', () => {
            wrapper.vm.initActualElementNormalizedBoundary();

            expect(wrapper.vm.actualElementColumn).toEqual(1);
            expect(wrapper.vm.actualElementRow).toEqual(1);
        });

        it('Mouse position', () => {
            const position = {
                clientX: 100,
                clientY: 100,
            };

            wrapper.vm.initMousePosition(position);

            expect(wrapper.vm.startX).toEqual(100);
            expect(wrapper.vm.startY).toEqual(100);
        });

        it('Dragging is disabled', () => {
            wrapper.vm.blockOtherInteractionsOnResizeEvent();

            expect(wrapper.vm.isDraggingEnabled).toEqual(false);
        });
    });
});
