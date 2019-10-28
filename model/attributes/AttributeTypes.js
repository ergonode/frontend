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
        type === TYPES.IMAGE
        || type === TYPES.PRICE
        || type === TYPES.UNIT
        || type === TYPES.DATE
    );
}

export function hasParamsWithMultiSelect(type) {
    return type === TYPES.IMAGE;
}

export function getParamsOptionsForType(type, data) {
    switch (type) {
    case TYPES.UNIT:
        return data.units;
    case TYPES.DATE:
        return data.dateFormats;
    case TYPES.PRICE:
        return data.currencies;
    case TYPES.IMAGE:
        return data.imageFormats;
    default:
        return [];
    }
}

export function getIcon(type) {
    switch (type) {
    case TYPES.TEXT:
        return 'Text';
    case TYPES.TEXTAREA:
        return 'Textarea';
    case TYPES.NUMERIC:
        return 'Numeric';
    case TYPES.SELECT:
        return 'Select';
    case TYPES.MULTI_SELECT:
        return 'MultiSelect';
    case TYPES.IMAGE:
        return 'Image';
    case TYPES.PRICE:
        return 'Price';
    case TYPES.UNIT:
        return 'Unit';
    case TYPES.DATE:
        return 'Date';
    default:
        return '';
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
    case TYPES.IMAGE:
        return 'formats';
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
