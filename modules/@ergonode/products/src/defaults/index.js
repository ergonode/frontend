/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    BLUE,
    GREEN,
    YELLOW,
} from '@UI/assets/scss/_js-variables/colors.scss';

export const ATTRIBUTE_TYPES = {
    PRODUCT_RELATION: 'PRODUCT_RELATION',
};

export const PRODUCT_TYPE = {
    WITH_VARIANTS: 'VARIABLE-PRODUCT',
    GROUPING: 'GROUPING-PRODUCT',
    SIMPLE_PRODUCT: 'SIMPLE-PRODUCT',
};

export const PRODUCT_TYPE_COLOR = {
    [PRODUCT_TYPE.WITH_VARIANTS]: YELLOW,
    [PRODUCT_TYPE.GROUPING]: BLUE,
    [PRODUCT_TYPE.SIMPLE_PRODUCT]: GREEN,
};

export const PRODUCT_CREATED_EVENT_NAME = 'product-created';
