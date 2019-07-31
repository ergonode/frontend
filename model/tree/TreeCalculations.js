/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const positionBetweenRows = 0.5;

function getCoordinatesForHiddenCategories(hiddenElements, { row, column }) {
    const [{ row: firstRow, column: firstColumn }] = hiddenElements;
    const newRow = oldRow => oldRow - ((firstRow - 1) - row);
    const newColumn = oldColumn => oldColumn - ((firstColumn - 1) - column);
    return hiddenElements.map((ele) => {
        const item = {
            ...ele,
            row: newRow(ele.row),
            column: newColumn(ele.column),
        };
        return item;
    });
}

export function getMaxChildRow(tree, column, row) {
    const [neighbor] = tree.filter(
        e => e.column <= column && e.row > row,
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
        if (i >= index) {
            const newRow = currentElement.row + (i === index ? positionBetweenRows : 1);
            newTree.push({ ...currentElement, row: newRow });
        } else {
            newTree.push(currentElement);
        }
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
    const { length } = elements;
    const elementBounds = [];
    for (let i = 0; i < length; i += 1) {
        const bounds = elements[i].getBoundingClientRect();
        elementBounds.push(bounds);
    }
    return elementBounds;
}

export function getRowBellowMouse({ clientY, elements, elementBounds }, completion) {
    const { length } = elements;
    for (let i = 0; i < length; i += 1) {
        const { y, height } = elementBounds[i];
        if (y <= clientY && y + height >= clientY) {
            return completion({ index: i, category: elements[i] });
        }
    }
    return null;
}

export function getFullTree(hiddenChildren, oldTree) {
    let newTree = oldTree;
    const arr = Object.keys(hiddenChildren);
    for (let i = arr.length - 1; i >= 0; i -= 1) {
        const key = arr[i];
        const index = newTree.findIndex(el => el.id === key);
        newTree = getTreeWhenElementExpand(hiddenChildren[key], newTree, index);
    }
    return newTree;
}
