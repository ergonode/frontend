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
    LABEL: 'LABEL',
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
        return 'Text';
    case types.TEXTAREA:
        return 'Textarea';
    case types.NUMERIC:
        return 'Numeric';
    case types.SELECT:
        return 'Select';
    case types.MULTI_SELECT:
        return 'MultiSelect';
    case types.IMAGE:
        return 'Image';
    case types.PRICE:
        return 'Price';
    case types.UNIT:
        return 'Unit';
    case types.DATE:
        return 'Date';
    default:
        return '';
    }
}

export function getTypeTranslation(type) {
    switch (type) {
    case types.TEXT:
        return 'TEXT';
    case types.TEXTAREA:
        return 'TEXT AREA';
    case types.NUMERIC:
        return 'NUMERIC';
    case types.SELECT:
        return 'SELECT';
    case types.MULTI_SELECT:
        return 'MULTI SELECT';
    case types.IMAGE:
        return 'IMAGE';
    case types.PRICE:
        return 'PRICE';
    case types.UNIT:
        return 'UNIT';
    case types.DATE:
        return 'DATE';
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
