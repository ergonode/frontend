/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
class LayoutElementData {
    constructor(coordinates, component, isObstacle) {
        this.coordinates = coordinates;
        this.component = component;
        this.isObstacle = isObstacle;
    }
}

export default LayoutElementData;
