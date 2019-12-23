/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const positionBetweenRows = 0.5;

export function getCoordinatesForHiddenCategories(hiddenElements, { row, column }) {
    const [{ row: firstRow, column: firstColumn }] = hiddenElements;
    const getFixedRow = (oldRow) => oldRow - ((firstRow - 1) - row);
    const getFixedColumn = (oldColumn) => oldColumn - ((firstColumn - 1) - column);
    return hiddenElements.map((ele) => {
        const item = {
            ...ele,
            row: getFixedRow(ele.row),
            column: getFixedColumn(ele.column),
        };
        return item;
    });
}

export function getNearestNeighborRowId(tree, column, row) {
    const [neighbor] = tree.filter(
        (e) => e.column <= column && e.row > row,
    );
    return neighbor ? neighbor.row : tree.length;
}

export function getTreeWhenElementRemoved(oldTree, index) {
    const newTree = [];
    const filteredTree = oldTree.filter((el, idx) => idx !== index);
    for (let i = 0; i < filteredTree.length; i += 1) {
        const currentElement = filteredTree[i];
        newTree.push(i >= index
            ? { ...currentElement, row: currentElement.row - 1 }
            : currentElement);
    }
    return newTree;
}

export function getTreeWhenGhostElementRemoved(oldTree, index) {
    const newTree = [];
    for (let i = 0; i < oldTree.length; i += 1) {
        const currentElement = oldTree[i];
        let newRow = null;
        if (i >= index && (index !== 0 || (index === 0 && currentElement.row < 0))) {
            newRow = currentElement.row + (i === index ? positionBetweenRows : 1);
        } else {
            newRow = currentElement.row + (oldTree[0].row < 0 ? 1 : 0);
        }
        newTree.push({ ...currentElement, row: newRow });
    }
    return newTree;
}

export function getTreeWhenElementCollapse(oldTree, index) {
    const newTree = [];
    for (let i = 0; i < oldTree.length; i += 1) {
        newTree.push(i > index ? { ...oldTree[i], row: i } : oldTree[i]);
    }
    return newTree;
}

export function getTreeWhenElementExpand(hiddenChildren, oldTree, index) {
    let newTree = [];
    for (let i = 0; i < oldTree.length; i += 1) {
        const current = oldTree[i];
        if (i === index && hiddenChildren.length) {
            const hiddenElement = getCoordinatesForHiddenCategories(hiddenChildren, current);
            newTree = [...newTree, current, ...hiddenElement];
        } else if (i > index) {
            newTree.push({ ...current, row: current.row + hiddenChildren.length });
        } else {
            newTree.push(current);
        }
    }
    return newTree;
}

export function getRowBounds(elements) {
    const elementBounds = [];
    for (let i = 0; i < elements.length; i += 1) {
        const bounds = elements[i].getBoundingClientRect();
        elementBounds.push(bounds);
    }
    return elementBounds;
}

export function getRowBellowMouse({ pageY, elements, elementBounds }, completion) {
    for (let i = 0; i < elements.length; i += 1) {
        const { y, height } = elementBounds[i];
        if (y <= pageY && y + height >= pageY) {
            return completion({ index: i, category: elements[i] });
        }
    }
    return null;
}

export function getFullTree(hiddenChildren, oldTree) {
    let newTree = oldTree.filter((el) => el.id !== 'ghost_item');
    const arr = Object.keys(hiddenChildren);
    for (let i = arr.length - 1; i >= 0; i -= 1) {
        const key = arr[i];
        const index = newTree.findIndex((el) => el.id === key);
        newTree = getTreeWhenElementExpand(hiddenChildren[key], newTree, index);
    }
    return newTree;
}
