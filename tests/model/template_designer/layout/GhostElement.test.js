import {
    addGhostElementToDraggableLayer,
    updateGhostElementWidth,
    updateGhostElementHeight,
    removeGhostElementFromDraggableLayer,
} from "~/model/template_designer/layout/GhostElement";

beforeEach(() => {
    const draggableLayerElement = document.createElement('div');
    const draggableLayerElementStyle = `
        height: 500px;
        width: 200px;
    `;
    draggableLayerElement.classList.add('draggable-layer');
    draggableLayerElement.setAttribute('style', draggableLayerElementStyle);

    document.body.appendChild(draggableLayerElement);
});

test('Ghost element is added to draggable layer', () => {
    const draggableLayerElement = document.documentElement.querySelector('.draggable-layer');

    expect(document.body.contains(draggableLayerElement)).toBeTruthy();

    const ghostElementBounds = {
        top: 50,
        left: 50,
        width: 200,
        height: 200,
    };

    addGhostElementToDraggableLayer(ghostElementBounds);

    const ghostElement = draggableLayerElement.querySelector('.ghost-element');
    expect(document.body.contains(ghostElement)).toBeTruthy();
});

test('Ghost element width is updated', () => {
    updateGhostElementWidth(200);

    const draggableLayerElement = document.documentElement.querySelector('.draggable-layer');
    const ghostElement = draggableLayerElement.querySelector('.ghost-element');

    expect(ghostElement.style.width).toEqual('200px');
});

test('Ghost element height is updated', () => {
    updateGhostElementHeight(200);

    const draggableLayerElement = document.documentElement.querySelector('.draggable-layer');
    const ghostElement = draggableLayerElement.querySelector('.ghost-element');

    expect(ghostElement.style.height).toEqual('200px');
});

test('Ghost element is removed from parent', () => {
    removeGhostElementFromDraggableLayer();
    const draggableLayerElement = document.documentElement.querySelector('.draggable-layer');

    expect(draggableLayerElement.children.length).toEqual(0);
});
