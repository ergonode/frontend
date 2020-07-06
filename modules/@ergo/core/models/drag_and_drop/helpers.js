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

export function isMouseInsideElement(element, xPos, yPos) {
    if (!element) {
        return false;
    }

    const {
        top, left, width, height,
    } = element.getBoundingClientRect();

    return xPos >= left
        && xPos <= left + width
        && yPos >= top
        && yPos <= top + height;
}

export function getDraggedColumnPositionState(pageX, elXPos, width) {
    const normalizedHalfWidthFactor = 0.5;

    return (pageX - elXPos) / width < normalizedHalfWidthFactor;
}

export function getPositionForBrowser(event) {
    let xPos = null;
    let yPos = null;

    // Firefox does not support pageX, pageY...
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        xPos = event.screenX;
        yPos = event.screenY;
    } else {
        xPos = event.pageX;
        yPos = event.pageY;
    }

    return {
        xPos,
        yPos,
    };
}
