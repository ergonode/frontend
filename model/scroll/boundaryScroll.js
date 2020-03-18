/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function rightBound({ xOffset, maxWidth }) {
    return xOffset && maxWidth ? xOffset === maxWidth : false;
}

export function leftBound({ xOffset }) {
    return xOffset === 0;
}

export function topBound({ yOffset }) {
    return yOffset === 0;
}

export function bottomBound({ yOffset, maxHeight }) {
    return yOffset && maxHeight ? yOffset === maxHeight : false;
}
