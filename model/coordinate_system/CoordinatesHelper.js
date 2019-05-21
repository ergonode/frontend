/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import * as number from '~/model/numberOperations';

export function coordinatesAreBetween(coordinatesA, coordinatesB) {
    const { xPos: xPosA, yPos: yPosA } = coordinatesA;
    const { xPos: xPosB, yPos: yPosB } = coordinatesB;

    return number.isGreaterOrEqualThan(xPosA.start, xPosB.start)
        && number.isSmallerOrEqualThan(xPosA.end, xPosB.end)
        && number.isGreaterOrEqualThan(yPosA.start, yPosB.start)
        && number.isSmallerOrEqualThan(yPosA.end, yPosB.end);
}

export default {
    coordinatesAreBetween,
};
