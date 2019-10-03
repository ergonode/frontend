/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import { AttributeTypes } from '~/defaults/attributes/main';

export function hasOptions(type) {
    return type === AttributeTypes.SELECT || type === AttributeTypes.MULTI_SELECT;
}

export function hasPlaceholder(type) {
    return (
        type === AttributeTypes.TEXT
        || type === AttributeTypes.TEXTAREA
        || type === AttributeTypes.NUMERIC
    );
}

export function hasParams(type) {
    return (
        type === AttributeTypes.IMAGE
        || type === AttributeTypes.PRICE
        || type === AttributeTypes.UNIT
        || type === AttributeTypes.DATE
    );
}

export function hasParamsWithMultiSelect(type) {
    return type === AttributeTypes.IMAGE;
}

export function getParamsOptionsForType(type, data) {
    switch (type) {
    case AttributeTypes.UNIT:
        return data.units;
    case AttributeTypes.DATE:
        return data.dateFormats;
    case AttributeTypes.PRICE:
        return data.currencies;
    case AttributeTypes.IMAGE:
        return data.imageFormats;
    default:
        return [];
    }
}

export function getIcon(type) {
    switch (type) {
    case AttributeTypes.TEXT:
        return 'Text';
    case AttributeTypes.TEXTAREA:
        return 'Textarea';
    case AttributeTypes.NUMERIC:
        return 'Numeric';
    case AttributeTypes.SELECT:
        return 'Select';
    case AttributeTypes.MULTI_SELECT:
        return 'MultiSelect';
    case AttributeTypes.IMAGE:
        return 'Image';
    case AttributeTypes.PRICE:
        return 'Price';
    case AttributeTypes.UNIT:
        return 'Unit';
    case AttributeTypes.DATE:
        return 'Date';
    default:
        return '';
    }
}

export function getTypeTranslation(type) {
    switch (type) {
    case AttributeTypes.TEXT:
        return 'TEXT';
    case AttributeTypes.TEXTAREA:
        return 'TEXT AREA';
    case AttributeTypes.NUMERIC:
        return 'NUMERIC';
    case AttributeTypes.SELECT:
        return 'SELECT';
    case AttributeTypes.MULTI_SELECT:
        return 'MULTI SELECT';
    case AttributeTypes.IMAGE:
        return 'IMAGE';
    case AttributeTypes.PRICE:
        return 'PRICE';
    case AttributeTypes.UNIT:
        return 'UNIT';
    case AttributeTypes.DATE:
        return 'DATE';
    default:
        return '';
    }
}

export function getParamsKeyForType(type) {
    switch (type) {
    case AttributeTypes.DATE:
        return 'format';
    case AttributeTypes.UNIT:
        return 'unit';
    case AttributeTypes.PRICE:
        return 'currency';
    case AttributeTypes.IMAGE:
        return 'formats';
    default:
        return '';
    }
}

export function getTypeElement(type) {
    switch (type) {
    case AttributeTypes.TEXT:
        return 'SingleLine';
    case AttributeTypes.TEXTAREA:
        return 'MultiLine';
    case AttributeTypes.NUMERIC:
        return 'SingleLine';
    case AttributeTypes.SELECT:
        return 'Options';
    case AttributeTypes.MULTI_SELECT:
        return 'Options';
    case AttributeTypes.IMAGE:
        return 'Image';
    case AttributeTypes.PRICE:
        return 'SingleLine';
    case AttributeTypes.UNIT:
        return 'SingleLine';
    case AttributeTypes.DATE:
        return 'Date';
    default:
        return 'SingleLine';
    }
}
