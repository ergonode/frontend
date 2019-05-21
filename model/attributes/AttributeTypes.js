/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const types = {
    TEXT: 'TEXT',
    TEXTAREA: 'TEXTAREA',
    NUMERIC: 'NUMERIC',
    SELECT: 'SELECT',
    MULTI_SELECT: 'MULTI_SELECT',
    IMAGE: 'IMAGE',
    PRICE: 'PRICE',
    UNIT: 'UNIT',
    DATE: 'DATE',
};

export function hasOptions(type) {
    return type === types.SELECT || type === types.MULTI_SELECT;
}

export function hasPlaceholder(type) {
    return (
        type === types.TEXT
        || type === types.TEXTAREA
        || type === types.NUMERIC
    );
}

export function hasParams(type) {
    return (
        type === types.IMAGE
        || type === types.PRICE
        || type === types.UNIT
        || type === types.DATE
    );
}

export function hasParamsWithMultiSelect(type) {
    return type === types.IMAGE;
}

export function getParamsOptionsForType(type, data) {
    switch (type) {
    case types.UNIT:
        return data.units;
    case types.DATE:
        return data.dateFormats;
    case types.PRICE:
        return data.currencies;
    case types.IMAGE:
        return data.imageFormats;
    default:
        return [];
    }
}

export function getIcon(type) {
    switch (type) {
    case types.TEXT:
        return 'text';
    case types.TEXTAREA:
        return 'text_area';
    case types.NUMERIC:
        return 'text';
    case types.SELECT:
        return 'select';
    case types.MULTI_SELECT:
        return 'select';
    case types.IMAGE:
        return 'image';
    case types.PRICE:
        return 'price';
    case types.UNIT:
        return 'unit';
    case types.DATE:
        return 'date';
    default:
        return '';
    }
}

export function getParamsKeyForType(type) {
    switch (type) {
    case types.DATE:
        return 'format';
    case types.UNIT:
        return 'unit';
    case types.PRICE:
        return 'currency';
    case types.IMAGE:
        return 'formats';
    default:
        return '';
    }
}

export function getTypeElement(type) {
    switch (type) {
    case types.TEXT:
        return 'SingleLine';
    case types.TEXTAREA:
        return 'MultiLine';
    case types.NUMERIC:
        return 'SingleLine';
    case types.SELECT:
        return 'Options';
    case types.MULTI_SELECT:
        return 'Options';
    case types.IMAGE:
        return 'Image';
    case types.PRICE:
        return 'SingleLine';
    case types.UNIT:
        return 'SingleLine';
    case types.DATE:
        return 'Date';
    default:
        return 'SingleLine';
    }
}

export default types;
