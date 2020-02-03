/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function addLayoutElementCopyToDocumentBody(event) {
    const { offsetX, offsetY } = event;
    const { width, height } = event.target.getBoundingClientRect();
    const clonedDOMElement = event.target.cloneNode(true);
    const clonedDOMElementStyle = `
        position: absolute;
        background-color: #fff;
        height: ${height}px;
        width: ${width}px;
    `;
    clonedDOMElement.setAttribute('style', clonedDOMElementStyle);
    clonedDOMElement.classList.add('cloned-theme-element');
    document.body.appendChild(clonedDOMElement);
    event.dataTransfer.setDragImage(clonedDOMElement, offsetX, offsetY);
    event.dataTransfer.setData('text/plain', 'layoutElement');
}

export function removeLayoutElementCopyFromDocumentBody(event) {
    const clonedDOMElement = document.documentElement.querySelector('.cloned-theme-element');
    document.body.removeChild(clonedDOMElement);

    if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
        // TODO: Only Firefox Error: Modifications are not allowed for this document
        // check why firefox does not support clearData
        event.dataTransfer.clearData();
    }
}
