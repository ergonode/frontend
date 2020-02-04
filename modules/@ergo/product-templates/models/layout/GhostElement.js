/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const draggableLayerElementSelector = '.template-grid-draggable-layer';
const ghostElementSelector = '.ghost-element';
const getDraggableLayerElement = () => document.documentElement.querySelector(
    draggableLayerElementSelector,
);
const getGhostElement = (draggableLayer) => draggableLayer.querySelector(ghostElementSelector);

export function addResizablePlaceholder({
    top, left, width, height, boxShadow, backgroundColor,
}) {
    const ghostElement = document.createElement('div');
    const ghostElementStyle = `
        position: absolute;
        top: ${top}px;
        left: ${left}px;
        z-index: 4;
        background-color: ${backgroundColor};
        pointer-events: none;
        box-shadow: ${boxShadow};
        height: ${height}px;
        width: ${width}px;
    `;

    ghostElement.setAttribute('style', ghostElementStyle);
    ghostElement.classList.add('ghost-element');

    const draggableLayerElement = getDraggableLayerElement();

    draggableLayerElement.appendChild(ghostElement);
}

export function updateResizablePlaceholderWidth(width) {
    const draggableLayerElement = getDraggableLayerElement();
    const ghostElement = getGhostElement(draggableLayerElement);

    ghostElement.style.width = `${width}px`;
}

export function updateResizablePlaceholderHeight(height) {
    const draggableLayerElement = getDraggableLayerElement();
    const ghostElement = getGhostElement(draggableLayerElement);

    ghostElement.style.height = `${height}px`;
}

export function removeResizablePlaceholder() {
    const draggableLayerElement = getDraggableLayerElement();
    const ghostElement = getGhostElement(draggableLayerElement);

    draggableLayerElement.removeChild(ghostElement);
}
