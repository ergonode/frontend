export function addGhostElementToDraggableLayer({
    top, left, width, height,
}) {
    const ghostElement = document.createElement('div');
    const ghostElementStyle = `
        position: absolute;
        top: ${top}px;
        left: ${left}px;
        z-index: 4;
        background-color: #00bc87;
        pointer-events: none;
        box-shadow:
            inset 0 2px 2px 0 rgba(0, 0, 0, 0.14),
            inset 0 3px 1px 0 rgba(0, 0, 0, 0.12),
            inset 0 1px 5px 0 rgba(0, 0, 0, 0.2);
        height: ${height}px;
        width: ${width}px;
    `;

    ghostElement.setAttribute('style', ghostElementStyle);
    ghostElement.classList.add('ghost-element');

    const draggableLayerElement = document.documentElement.querySelector('.draggable-layer');
    draggableLayerElement.appendChild(ghostElement);
}

export function updateGhostElementWidth(width) {
    const draggableLayerElement = document.documentElement.querySelector('.draggable-layer');
    const ghostElement = draggableLayerElement.querySelector('.ghost-element');

    ghostElement.style.width = `${width}px`;
}

export function updateGhostElementHeight(height) {
    const draggableLayerElement = document.documentElement.querySelector('.draggable-layer');
    const ghostElement = draggableLayerElement.querySelector('.ghost-element');

    ghostElement.style.height = `${height}px`;
}

export function removeGhostElementFromDraggableLayer() {
    const draggableLayerElement = document.documentElement.querySelector('.draggable-layer');
    const ghostElement = draggableLayerElement.querySelector('.ghost-element');

    draggableLayerElement.removeChild(ghostElement);
}
