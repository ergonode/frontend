/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getKeyByValue,
} from '@Core/models/objectWrapper';
import {
    getUUID,
} from '@Core/models/stringWrapper';

export function getParsedType(types, selectedType) {
    return getKeyByValue(types, selectedType);
}

export function getMappedArrayOptions(options) {
    return options.reduce((acc, current) => {
        const newObject = acc;

        newObject[getUUID()] = {
            id: current.id,
            key: current.code || null,
            value: !current.label || current.label.length < 1 ? null : current.label,
        };
        return newObject;
    }, {});
}
