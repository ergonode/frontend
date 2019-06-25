export function addLayoutElementCopyToDocumentBody(event) {
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
    event.dataTransfer.setDragImage(clonedDOMElement, width / 2, 0);
}

export function removeLayoutElementCopyFromDocumentBody() {
    const clonedDOMElement = document.documentElement.querySelector('.cloned-layout-element');
    document.body.removeChild(clonedDOMElement);
}
