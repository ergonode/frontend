/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const positionBetweenRows = 0.5;

export function rebuildTreeWhenElementRemoved(treeData, index) {
    return treeData.reduce((accumulator, current, i) => {
        if (i >= index) {
            accumulator.push({ ...current, row: current.row - 1 });
        } else {
            accumulator.push(current);
        }
        return accumulator;
    }, []);
}

export function rebuildTreeWhenGhostElementRemoved(treeData, id) {
    const findIndex = treeData.findIndex(el => el.id === id);
    return treeData.reduce((accumulator, current, i) => {
        if (i === findIndex && current.row !== 0) {
            accumulator.push({ ...current, row: current.row + positionBetweenRows });
        } else if (i > findIndex) {
            accumulator.push({ ...current, row: current.row + 1 });
        } else {
            accumulator.push(current);
        }
        return accumulator;
    }, []);
}

export function rebuildTreeWhenElementCollapse(treeData, id) {
    const findIndex = treeData.findIndex(el => el.id === id);
    return treeData.reduce((accumulator, current, i) => {
        if (i > findIndex) {
            accumulator.push({ ...current, row: i });
        } else {
            accumulator.push(current);
        }
        return accumulator;
    }, []);
}

export function rebuildTreeWhenElementExpand(hiddenTree, visibleTree, index) {
    const hiddenChildren = hiddenTree[index];
    const findIndex = visibleTree.findIndex(el => el.id === index);
    return visibleTree.reduce((accumulator, current, i) => {
        let expandedTree = accumulator;
        if (i === findIndex) {
            expandedTree = [...expandedTree, current, ...hiddenChildren];
        } else if (i > findIndex) {
            expandedTree.push({ ...current, row: current.row + hiddenChildren.length });
        } else {
            expandedTree.push(current);
        }
        return expandedTree;
    }, []);
}

export function initializeRowBounds(elements) {
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
