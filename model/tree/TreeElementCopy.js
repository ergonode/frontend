/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function addTreeElementCopyToDocumentBody(event, element) {
    const elementId = element.getAttribute('item-id');
    const clonedDOMElement = element.querySelector('.grid-item').cloneNode(true);
    const clonedDOMElementStyle = `
        position: absolute;
        background-color: '#fff';
        height: 40px;
        width: 247px;
    `;
    clonedDOMElement.setAttribute('style', clonedDOMElementStyle);
    clonedDOMElement.classList.add('cloned-tree-element');
    document.body.appendChild(clonedDOMElement);
    event.dataTransfer.setDragImage(clonedDOMElement, clonedDOMElement.offsetWidth / 2, 0);
    event.dataTransfer.setData('text/plain', elementId);
}

export function removeTreeElementCopyFromDocumentBody(event) {
    const clonedDOMElement = document.documentElement.querySelector('.cloned-tree-element');
    document.body.removeChild(clonedDOMElement);
    event.dataTransfer.clearData();
}
