/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function getDraggedColumnPositionState(pageX, elXPos, width) {
    const normalizedHalfWidthFactor = 0.5;

    return (pageX - elXPos) / width < normalizedHalfWidthFactor;
}

export function getDraggedRowPositionState(pageY, elYPos, height) {
    const normalizedHalfWidthFactor = 0.5;

    return (pageY - elYPos) / height < normalizedHalfWidthFactor;
}
