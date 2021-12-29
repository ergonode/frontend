/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const DRAGGABLE_LAYER_CLASS = 'designer-draggable-layer';

export const DRAGGABLE_LAYER_SELECTOR = `.${DRAGGABLE_LAYER_CLASS}`;

export const RESIZABLE_PLACEHOLDER = 'resizable-placeholder';

export const RESIZABLE_PLACEHOLDER_SELECTOR = `.${RESIZABLE_PLACEHOLDER}`;

export const getDraggableLayerElement = () => document.documentElement.querySelector(
    DRAGGABLE_LAYER_SELECTOR,
);

export const getResizablePlaceholder = layer => layer.querySelector(RESIZABLE_PLACEHOLDER_SELECTOR);

export const addResizablePlaceholder = ({
    top,
    left,
    width,
    height,
    boxShadow,
    backgroundColor,
}) => {
    const resizablePlaceholder = document.createElement('div');
    const resizablePlaceholderStyle = `
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

    resizablePlaceholder.setAttribute('style', resizablePlaceholderStyle);
    resizablePlaceholder.classList.add(RESIZABLE_PLACEHOLDER);

    const draggableLayerElement = getDraggableLayerElement();

    draggableLayerElement.appendChild(resizablePlaceholder);
};

export const updateResizablePlaceholderWidth = (width) => {
    const draggableLayerElement = getDraggableLayerElement();
    const resizablePlaceholder = getResizablePlaceholder(draggableLayerElement);

    resizablePlaceholder.style.width = `${width}px`;
};

export const updateResizablePlaceholderHeight = (height) => {
    const draggableLayerElement = getDraggableLayerElement();
    const resizablePlaceholder = getResizablePlaceholder(draggableLayerElement);

    resizablePlaceholder.style.height = `${height}px`;
};

export const removeResizablePlaceholder = () => {
    const draggableLayerElement = getDraggableLayerElement();
    const resizablePlaceholder = getResizablePlaceholder(draggableLayerElement);

    draggableLayerElement.removeChild(resizablePlaceholder);
};
