/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { WHITE } from '@Core/assets/scss/_js-variables/colors.scss';

export function addElementCopyToDocumentBody({
    event,
    element,
    id,
}) {
    const { offsetWidth, offsetHeight } = element;
    const clonedDOMElement = element.cloneNode(true);
    const clonedDOMElementStyle = `
        position: absolute;
        background-color: ${WHITE};
        width: ${offsetWidth}px;
        height: ${offsetHeight}px;
        opacity: 1;
    `;

    clonedDOMElement.setAttribute('style', clonedDOMElementStyle);
    clonedDOMElement.classList.add('cloned-element');
    document.body.appendChild(clonedDOMElement);
    event.dataTransfer.setDragImage(clonedDOMElement, offsetWidth / 2, offsetHeight / 2);
    event.dataTransfer.setData('text/plain', id);
}

export function removeElementCopyFromDocumentBody(event) {
    const clonedDOMElement = document.documentElement.querySelector('.cloned-element');
    document.body.removeChild(clonedDOMElement);

    if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
        // TODO: Only Firefox Error: Modifications are not allowed for this document
        // check why firefox does not support clearData
        event.dataTransfer.clearData();
    }
}
