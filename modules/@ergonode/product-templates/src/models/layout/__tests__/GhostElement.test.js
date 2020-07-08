/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    addResizablePlaceholder,
    removeResizablePlaceholder,
    updateResizablePlaceholderHeight,
    updateResizablePlaceholderWidth,
} from '../GhostElement';

beforeEach(() => {
    const draggableLayerElement = document.createElement('div');
    const draggableLayerElementStyle = `
        height: 500px;
        width: 200px;
    `;
    draggableLayerElement.classList.add('template-grid-draggable-layer');
    draggableLayerElement.setAttribute('style', draggableLayerElementStyle);

    document.body.appendChild(draggableLayerElement);
});

test('Ghost element is added to draggable layer', () => {
    const draggableLayerElement = document.documentElement.querySelector('.template-grid-draggable-layer');

    expect(document.body.contains(draggableLayerElement)).toBeTruthy();

    const ghostElementBounds = {
        top: 50,
        left: 50,
        width: 200,
        height: 200,
    };

    addResizablePlaceholder(ghostElementBounds);

    const ghostElement = draggableLayerElement.querySelector('.ghost-element');
    expect(document.body.contains(ghostElement)).toBeTruthy();
});

test('Ghost element width is updated', () => {
    updateResizablePlaceholderWidth(200);

    const draggableLayerElement = document.documentElement.querySelector('.template-grid-draggable-layer');
    const ghostElement = draggableLayerElement.querySelector('.ghost-element');

    expect(ghostElement.style.width).toEqual('200px');
});

test('Ghost element height is updated', () => {
    updateResizablePlaceholderHeight(200);

    const draggableLayerElement = document.documentElement.querySelector('.template-grid-draggable-layer');
    const ghostElement = draggableLayerElement.querySelector('.ghost-element');

    expect(ghostElement.style.height).toEqual('200px');
});

test('Ghost element is removed from parent', () => {
    removeResizablePlaceholder();
    const draggableLayerElement = document.documentElement.querySelector('.template-grid-draggable-layer');

    expect(draggableLayerElement.children.length).toEqual(0);
});
