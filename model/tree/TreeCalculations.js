/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const positionBeetwenRows = 0.5;

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

export function rebuildTreeWhenGhostElementRemoved(treeData, index) {
    return treeData.reduce((accumulator, current, i) => {
        if (i === index && current.row !== 0) {
            accumulator.push({ ...current, row: current.row + positionBeetwenRows });
        } else if (i > index) {
            accumulator.push({ ...current, row: current.row + 1 });
        } else {
            accumulator.push(current);
        }
        return accumulator;
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
