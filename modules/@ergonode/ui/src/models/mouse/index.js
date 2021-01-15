/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function isMouseOutsideElement(element, xPos, yPos) {
    if (!element || typeof xPos === 'undefined' || typeof yPos === 'undefined') {
        return false;
    }

    const {
        top,
        right,
        width,
        height,
    } = element.getBoundingClientRect();
    const leftAtTheLeft = xPos <= right - width;
    const leftAtTheRight = xPos >= right;
    const leftAtTheTop = yPos <= top;
    const leftAtTheBottom = yPos >= (top + height);

    return leftAtTheTop
        || leftAtTheBottom
        || leftAtTheLeft
        || leftAtTheRight;
}

export function getFixedMousePosition(event) {
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
