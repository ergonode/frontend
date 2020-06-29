/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    TYPES,
} from '@Attributes/defaults/attributes';

export function hasOptions(type) {
    return type === TYPES.SELECT || type === TYPES.MULTI_SELECT;
}

export function hasPlaceholder(type) {
    return (
        type === TYPES.TEXT
        || type === TYPES.TEXT_AREA
        || type === TYPES.NUMERIC
    );
}

export function hasParams(type) {
    return (
        type === TYPES.PRICE
        || type === TYPES.UNIT
        || type === TYPES.DATE
    );
}

export function getParamsOptionsForType(type, data) {
    switch (type) {
    case TYPES.UNIT:
        return data.units;
    case TYPES.DATE:
        return data.dateFormats;
    case TYPES.PRICE:
        return data.currencies;
    default:
        return {};
    }
}

export function getParamsKeyForType(type) {
    switch (type) {
    case TYPES.DATE:
        return 'format';
    case TYPES.UNIT:
        return 'unit';
    case TYPES.PRICE:
        return 'currency';
    default:
        return '';
    }
}
