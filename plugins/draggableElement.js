/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
/* eslint-disable no-param-reassign */
import DraggableStates from '~/model/draggableStates';

const onDragStart = ({ width, height, backgroundColor }, event) => {
    const clonedDOMElement = event.target.cloneNode(true);

    event.target.setAttribute('style', `height: ${height}px;`);

    const clonedDOMElementStyle = `
        position: absolute;
        background-color: ${backgroundColor};
        height: ${height}px;
        width: ${width}px;
    `;
    clonedDOMElement.setAttribute('style', clonedDOMElementStyle);
    clonedDOMElement.classList.add('cloned-list-element');
    document.body.appendChild(clonedDOMElement);
    event.dataTransfer.setDragImage(clonedDOMElement, width / 2, 0);
    event.dataTransfer.setData('text/plain', event.target.id);

    const customEvent = new CustomEvent('state', { bubbles: true, detail: { state: DraggableStates.START } });

    event.target.dispatchEvent(customEvent);
};

const onDragEnd = (event) => {
    const clonedDOMElement = document.documentElement.querySelector('.cloned-list-element');

    event.target.removeAttribute('style');
    document.body.removeChild(clonedDOMElement);
    const customEvent = new CustomEvent('state', { bubbles: true, detail: { state: DraggableStates.END } });
    event.target.dispatchEvent(customEvent);
    if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
        // TODO: Only Firefox Error: Modifications are not allowed for this document
        // check why firefox does not support clearData
        event.dataTransfer.clearData();
    }
};

export default {
    bind(el, binding) {
        const {
            id, draggedElementStyle, onDraggedState, draggable = true,
        } = binding.value;
        el.setAttribute('draggable', draggable);
        el.id = id;

        el.addEventListener('dragstart', onDragStart.bind(null, draggedElementStyle), false);
        el.addEventListener('dragend', onDragEnd, false);
        el.addEventListener('state', onDraggedState);
    },
    unbind(el, binding) {
        const { onDraggedState } = binding.value;

        el.removeEventListener('dragstart', onDragStart, false);
        el.removeEventListener('dragend', onDragEnd, false);
        el.removeEventListener('state', onDraggedState);
    },
};
