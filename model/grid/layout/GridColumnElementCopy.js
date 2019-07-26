/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function addGridColumnCopyToDocumentBody(event, width) {
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
}

export function removeGridColumnCopyFromDocumentBody() {
    const clonedDOMElement = document.documentElement.querySelector('.cloned-column-element');
    document.body.removeChild(clonedDOMElement);
}

export function getGhostColumnElementModel() {
    return {
        id: 'ghost',
        editable: false,
        label: '',
        type: '',
        width: 100,
        minWidth: 100,
    };
}
