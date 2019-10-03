/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { white } from '~/assets/scss/_variables/_colors.scss';

export function addElementCopyToDocumentBody(event, { element, width, height }) {
    const elementId = element.getAttribute('item-id');
    const clonedDOMElement = element.childNodes[0].cloneNode(true);
    const clonedDOMElementStyle = `
        position: absolute;
        background-color: ${white};
        height: ${height}px;
        width: ${width}px;
    `;
    clonedDOMElement.setAttribute('style', clonedDOMElementStyle);
    clonedDOMElement.classList.add('cloned-grid-element');
    document.body.appendChild(clonedDOMElement);
    event.dataTransfer.setDragImage(clonedDOMElement, clonedDOMElement.offsetWidth / 2, 0);
    event.dataTransfer.setData('text/plain', elementId);
}

export function removeElementCopyFromDocumentBody(event) {
    const clonedDOMElement = document.documentElement.querySelector('.cloned-grid-element');
    document.body.removeChild(clonedDOMElement);
    if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
        // TODO: Only Firefox Error: Modifications are not allowed for this document
        // check why firefox does not support clearData
        event.dataTransfer.clearData();
    }
}
