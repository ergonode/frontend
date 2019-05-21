/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import LayoutElementData from './LayoutElementData';

class AttributeElementData extends LayoutElementData {
    constructor(
        data,
        required,
        sizeRange,
        coordinates,
        component,
        isObstacle = true,
    ) {
        super(coordinates, component);
        this.data = data;
        this.required = required;
        this.sizeRange = sizeRange;
        this.isObstacle = isObstacle;
    }
}

export default AttributeElementData;
