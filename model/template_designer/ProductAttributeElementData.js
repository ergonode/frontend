/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import LayoutElementData from './LayoutElementData';

class ProductAttributeElementData extends LayoutElementData {
    constructor(coordinates, component, data) {
        super(coordinates, component);
        this.data = data;
    }
}

export default ProductAttributeElementData;
