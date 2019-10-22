/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function isMouseOutOfBoundsElement(element, xPos, yPos) {
    const {
        top, right, width, height,
    } = element.getBoundingClientRect();
    const leftAtTheLeft = xPos <= right - width;
    const leftAtTheRight = xPos >= right;
    const leftAtTheTop = yPos <= top;
    const leftAtTheBottom = yPos >= (top + height);

    return (leftAtTheTop
        || leftAtTheBottom
        || leftAtTheLeft
        || leftAtTheRight);
}

export function getDraggedColumnPositionState(pageX, elXPos, width) {
    const normalizedHalfWidthFactor = 0.5;

    return (pageX - elXPos) / width < normalizedHalfWidthFactor;
}
