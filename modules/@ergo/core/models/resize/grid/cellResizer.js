/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { GREEN } from '@Core/assets/scss/_js-variables/colors.scss';
import { Z_INDEX_LVL_1 } from '@Core/assets/scss/_js-variables/indexes.scss';
import { BORDER_DASHED_GREEN } from '@Core/assets/scss/_js-variables/borders.scss';
import registerResizeEventListeners from '@Core/models/resize/registerResizeEventListeners';
import unregisterResizeEventListeners from '@Core/models/resize/unregisterResizeEventListeners';

const resizeElement = document.createElement('div');
const resizeBorderElement = document.createElement('div');
const resizeElementStyle = `
        position: absolute;
        display: inline-block;
        left: 50%;
        bottom: -3px;
        transform: translate(-50%, 0);
        z-index: ${Z_INDEX_LVL_1};
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background-color: ${GREEN};
        cursor: row-resize;
    `;
const resizeBorderElementStyle = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: ${Z_INDEX_LVL_1};
        height: 100%;
        border: ${BORDER_DASHED_GREEN};
        box-sizing: border-box;
    `;

resizeElement.setAttribute('style', resizeElementStyle);
resizeBorderElement.setAttribute('style', resizeBorderElementStyle);

resizeElement.classList.add('resizer');
resizeBorderElement.classList.add('resizer-border');

let parentElement = null;
let startY = 0;
let startHeight = 0;
let currentHeight = 0;

function resetData() {
    resizeBorderElement.style.height = null;
    startY = 0;
    startHeight = 0;
    currentHeight = 0;
    parentElement.removeChild(resizeBorderElement);
}

function onResize(event) {
    const { pageY } = event;
    const height = startHeight + pageY - startY;
    const factor = Math.ceil(height / startHeight);
    const fixedHeight = factor * startHeight;

    if (fixedHeight !== currentHeight) {
        if (height < 0) {
            resizeBorderElement.style.height = `${-1 * fixedHeight + 2 * startHeight}px`;
            resizeBorderElement.style.bottom = '0';
            resizeBorderElement.style.top = null;
        } else {
            resizeBorderElement.style.height = `${fixedHeight}px`;
            resizeBorderElement.style.top = '0';
            resizeBorderElement.style.bottom = null;
        }

        currentHeight = fixedHeight;
    }
}

function onStopResizing() {
    const factor = Math.ceil(currentHeight / startHeight) - 1;
    const event = new CustomEvent('resizeend', { detail: factor });

    parentElement.dispatchEvent(event);

    resetData();
    unregisterResizeEventListeners(onResize, onStopResizing);
}

function initResizingDrag(event) {
    const { pageY } = event;

    startY = pageY;
    startHeight = parseInt(parentElement.getBoundingClientRect().height, 10);
    currentHeight = startHeight;
    parentElement.appendChild(resizeBorderElement);

    registerResizeEventListeners(onResize, onStopResizing);
}

export function bind(element) {
    parentElement = element;
    element.appendChild(resizeElement);
    resizeElement.addEventListener('mousedown', initResizingDrag);
}

export function unbind(element) {
    parentElement = null;
    element.removeChild(resizeElement);
    resizeElement.removeEventListener('mousedown', initResizingDrag);
}
