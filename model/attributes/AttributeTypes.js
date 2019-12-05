/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import { TYPES } from '~/defaults/attributes';

export function hasOptions(type) {
    return type === TYPES.SELECT || type === TYPES.MULTI_SELECT;
}

export function hasPlaceholder(type) {
    return (
        type === TYPES.TEXT
        || type === TYPES.TEXTAREA
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
        return [];
    }
}

export function getTypeTranslation(type) {
    switch (type) {
    case TYPES.TEXT:
        return 'TEXT';
    case TYPES.TEXTAREA:
        return 'TEXT AREA';
    case TYPES.NUMERIC:
        return 'NUMERIC';
    case TYPES.SELECT:
        return 'SELECT';
    case TYPES.MULTI_SELECT:
        return 'MULTI SELECT';
    case TYPES.IMAGE:
        return 'IMAGE';
    case TYPES.PRICE:
        return 'PRICE';
    case TYPES.UNIT:
        return 'UNIT';
    case TYPES.DATE:
        return 'DATE';
    default:
        return '';
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

export function getTypeElement(type) {
    switch (type) {
    case TYPES.TEXT:
        return 'SingleLine';
    case TYPES.TEXTAREA:
        return 'MultiLine';
    case TYPES.NUMERIC:
        return 'SingleLine';
    case TYPES.SELECT:
        return 'Options';
    case TYPES.MULTI_SELECT:
        return 'Options';
    case TYPES.IMAGE:
        return 'Image';
    case TYPES.PRICE:
        return 'SingleLine';
    case TYPES.UNIT:
        return 'SingleLine';
    case TYPES.DATE:
        return 'Date';
    default:
        return 'SingleLine';
    }
}
