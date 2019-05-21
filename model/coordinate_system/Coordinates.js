/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import PositionRange from './PositionRange';

class Coordinates {
    constructor(xPosStart, xPosEnd, yPosStart, yPosEnd) {
        this.xPos = new PositionRange(xPosStart, xPosEnd);
        this.yPos = new PositionRange(yPosStart, yPosEnd);
    }
}

export default Coordinates;
