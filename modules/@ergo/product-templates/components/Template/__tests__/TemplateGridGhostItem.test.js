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

import TemplateGridLayerItem from '../Base/TemplateGridLayerItem';

const localVue = createLocalVue();
const store = new Store({
    state: {
        draggable: {
            draggedElement: {
            },
        },
    },
});
const mocks = {
    $store: store,
};

describe('Template/Base/TemplateGridLayerItem', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(TemplateGridLayerItem, {
            localVue,
            mocks,
            propsData: {
                position: {
                    row: 1,
                    column: 1,
                },
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof TemplateGridLayerItem.name).toBe('string');
        expect(TemplateGridLayerItem.name).toEqual('TemplateGridLayerItem');
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
        draggableLayerElement.classList.add('template-grid-draggable-layer');
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

            wrapper.find('.template-grid-layer-item').trigger('dragenter');

            expect(wrapper.vm.isGhostElement).toBeTruthy();
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

            wrapper.find('.template-grid-layer-item').trigger('dragleave');

            expect(wrapper.vm.isGhostElement).toBeFalsy();
        });

        it('Ghost element is removed on drop', () => {
            wrapper.find('.template-grid-layer-item').trigger('dragenter');
            wrapper.find('.template-grid-layer-item').trigger('drop');

            expect(wrapper.vm.isGhostElement).toBeFalsy();
        });
    });
});
