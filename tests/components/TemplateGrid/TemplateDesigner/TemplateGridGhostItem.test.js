/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount, createLocalVue } from '@vue/test-utils';
import { Store } from 'vuex-mock-store';
import TemplateGridGhostItem from '~/components/TemplateGrid/TemplateDesigner/TemplateGridGhostItem';

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

describe('TemplateGrid/TemplateDesigner/TemplateGridGhostItem', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(TemplateGridGhostItem, {
            localVue,
            mocks,
            propsData: {
                position: { row: 1, column: 1 },
            },
        });
    });

    it('Component is rendered', () => {
        expect(wrapper.is(TemplateGridGhostItem)).toBe(true);
    });

    it('Component is named well', () => {
        expect(typeof TemplateGridGhostItem.name).toBe('string');
        expect(TemplateGridGhostItem.name).toEqual('TemplateGridGhostItem');
    });

    describe('Component highlighting states', () => {
        it('Is highlighted', () => {
            wrapper.setProps({
                highlightingPositions: [
                    {
                        row: 1,
                        column: 1,
                    },
                ],
            });

            expect(wrapper.vm.highlightedElement).toBeTruthy();
        });

        it('Is not highlighted', () => {
            wrapper.setProps({
                highlightingPositions: [
                    {
                        row: 1,
                        column: 2,
                    },
                ],
            });

            expect(wrapper.vm.highlightedElement).toBeFalsy();
        });

        it('Is top border highlighted', () => {
            wrapper.setProps({
                highlightingPositions: [
                    {
                        row: 1,
                        column: 1,
                    },
                    {
                        row: 1,
                        column: 2,
                    },
                ],
            });

            expect(wrapper.vm.isTopNeighbour).toBeFalsy();
        });

        it('Is not top border highlighted', () => {
            wrapper.setData({
                position: {
                    row: 2,
                    column: 2,
                },
            });
            wrapper.setProps({
                highlightingPositions: [
                    {
                        row: 1,
                        column: 2,
                    },
                    {
                        row: 2,
                        column: 2,
                    },
                ],
            });

            expect(wrapper.vm.isTopNeighbour).toBeTruthy();
        });
    });

    describe('Dragging events', () => {
        const draggableLayerElement = document.createElement('div');
        const draggableLayerElementStyle = `
            height: 500px;
            width: 200px;
        `;
        draggableLayerElement.classList.add('draggable-layer');
        draggableLayerElement.setAttribute('style', draggableLayerElementStyle);

        document.body.appendChild(draggableLayerElement);

        it('Ghost element is added on drag enter', () => {
            wrapper.setProps({
                highlightingPositions: [
                    {
                        row: 1,
                        column: 1,
                    },
                ],
            });

            wrapper.find('.ghost-item').trigger('dragenter');

            const ghostElement = draggableLayerElement.querySelector('.ghost-element');

            expect(draggableLayerElement.contains(ghostElement)).toBeTruthy();
        });

        it('Ghost element is removed on drag leave', () => {
            wrapper.setProps({
                highlightingPositions: [
                    {
                        row: 1,
                        column: 1,
                    },
                ],
            });

            wrapper.find('.ghost-item').trigger('dragleave');

            const ghostElement = draggableLayerElement.querySelector('.ghost-element');

            expect(ghostElement).toBeNull();
        });

        it('Ghost element is removed on drop', () => {
            wrapper.find('.ghost-item').trigger('dragenter');
            wrapper.find('.ghost-item').trigger('drop');

            const ghostElement = draggableLayerElement.querySelector('.ghost-element');

            expect(ghostElement).toBeNull();
        });
    });
});
