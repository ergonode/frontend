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
    clonedDOMElement.classList.add('cloned-layout-element');
    document.body.appendChild(clonedDOMElement);
    event.dataTransfer.setDragImage(clonedDOMElement, offsetX, offsetY);
    event.dataTransfer.setData('text/plain', 'layoutElement');
}

export function removeLayoutElementCopyFromDocumentBody(event) {
    const clonedDOMElement = document.documentElement.querySelector('.cloned-layout-element');
    document.body.removeChild(clonedDOMElement);
    event.dataTransfer.clearData();
}
