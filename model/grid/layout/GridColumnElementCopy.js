/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function addGridColumnCopyToDocumentBody(event, width, id) {
    const clonedDOMElement = event.target.cloneNode(true);
    const clonedDOMElementStyle = `
        position: absolute;
        background-color: white;
        width: ${width}px;
    `;

    clonedDOMElement.setAttribute('style', clonedDOMElementStyle);
    clonedDOMElement.classList.add('cloned-column-element');
    document.body.appendChild(clonedDOMElement);
    event.dataTransfer.setDragImage(clonedDOMElement, clonedDOMElement.offsetWidth / 2, 0);
    event.dataTransfer.setData('text/plain', id);
}

export function removeGridColumnCopyFromDocumentBody(event) {
    const clonedDOMElement = document.documentElement.querySelector('.cloned-column-element');
    document.body.removeChild(clonedDOMElement);

    if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
        // TODO: Only Firefox Error: Modifications are not allowed for this document
        // check why firefox does not support clearData
        event.dataTransfer.clearData();
    }
}
