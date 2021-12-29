/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    addResizablePlaceholder,
    DRAGGABLE_LAYER_CLASS,
    getDraggableLayerElement,
    getResizablePlaceholder,
    removeResizablePlaceholder,
    updateResizablePlaceholderHeight,
    updateResizablePlaceholderWidth,
} from '@Templates/models/layout/ResizablePlaceholder';

describe('GhostElement', () => {
    beforeAll(() => {
        const draggableLayerElement = document.createElement('div');
        const draggableLayerElementStyle = `
            height: 500px;
            width: 200px;
        `;
        draggableLayerElement.classList.add(DRAGGABLE_LAYER_CLASS);
        draggableLayerElement.setAttribute('style', draggableLayerElementStyle);

        document.body.appendChild(draggableLayerElement);
    });

    afterAll(() => {
        const draggableLayerElement = getDraggableLayerElement();

        if (draggableLayerElement) {
            const resizablePlaceholderElement = getResizablePlaceholder(draggableLayerElement);

            if (resizablePlaceholderElement) {
                resizablePlaceholderElement.remove();
            }

            draggableLayerElement.remove();
        }
    });

    it('Ghost element is added to draggable layer', () => {
        const draggableLayerElement = getDraggableLayerElement();

        const ghostElementBounds = {
            top: 50,
            left: 50,
            width: 200,
            height: 200,
        };

        addResizablePlaceholder(ghostElementBounds);

        const resizablePlaceholderElement = getResizablePlaceholder(draggableLayerElement);

        expect(document.body.contains(resizablePlaceholderElement)).toBeTruthy();
    });

    it('Ghost element width is updated', () => {
        const draggableLayerElement = getDraggableLayerElement();

        updateResizablePlaceholderWidth(200);

        const resizablePlaceholderElement = getResizablePlaceholder(draggableLayerElement);

        expect(resizablePlaceholderElement.style.width).toEqual('200px');
    });

    it('Ghost element height is updated', () => {
        const draggableLayerElement = getDraggableLayerElement();

        updateResizablePlaceholderHeight(200);

        const resizablePlaceholderElement = getResizablePlaceholder(draggableLayerElement);

        expect(resizablePlaceholderElement.style.height).toEqual('200px');
    });

    it('Ghost element is removed from parent', () => {
        const draggableLayerElement = getDraggableLayerElement();

        removeResizablePlaceholder();

        expect(draggableLayerElement.children.length).toEqual(0);
    });
});
