/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import LayoutElementData from './LayoutElementData';

class LayoutElementSectionData extends LayoutElementData {
    constructor(coordinates, component, label, isObstacle) {
        super(coordinates, component);
        this.label = label;
        this.isObstacle = isObstacle;
    }
}

export default LayoutElementSectionData;
