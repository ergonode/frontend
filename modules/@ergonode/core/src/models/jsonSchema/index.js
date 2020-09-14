/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    DEFAULT_TYPES,
} from '@Core/defaults/jsonSchema';

export function getDefaultJsonSchemaTypes(properties) {
    return Object.keys(properties).reduce((acc, current) => {
        const newObject = acc;
        const value = DEFAULT_TYPES[properties[current].type];

        newObject[current] = value !== undefined ? value : null;

        return newObject;
    }, {});
}
