/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    SYSTEM_TYPES,
} from '@Attributes/defaults/attributes';
import {
    getUUID,
} from '@Core/models/stringWrapper';

export function getMappedLayoutElement({
    id,
    bounds: {
        min_width: minWidth,
        min_height: minHeight,
        max_width: maxWidth,
        max_height: maxHeight,
        type,
    },
    label,
    position: {
        row,
        column,
    },
    required = false,
    size = {
        width: 1,
        height: 1,
    },
}) {
    const {
        width, height,
    } = size;

    return {
        id,
        row,
        column,
        width,
        height,
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
        type,
        label,
        required,
    };
}

export function getMappedLayoutElements(elements, elementDescriptions, types) {
    const cachedTypes = {};

    return elements.map((element) => {
        const {
            position, size, properties, type,
        } = element;
        const {
            attribute_id: attrID, required, label,
        } = properties;
        const {
            x: column, y: row,
        } = position;

        if (typeof cachedTypes[type] === 'undefined') {
            cachedTypes[type] = types.find(attributeType => attributeType.type === type);
        }

        return getMappedLayoutElement({
            id: attrID || getUUID(),
            label: elementDescriptions[attrID] || label,
            bounds: cachedTypes[type],
            position: {
                row: row + 1,
                column: column + 1,
            },
            required,
            size,
        });
    });
}

export function getMappedLayoutElementsForAPIUpdate(elements) {
    return elements.map(({
        id,
        row,
        column,
        width,
        height,
        type,
        label,
        required,
    }) => {
        const position = {
            x: column - 1,
            y: row - 1,
        };
        const size = {
            width,
            height,
        };
        const properties = {};

        if (type !== SYSTEM_TYPES.SECTION) {
            properties.attribute_id = id;
            properties.required = required;
        } else {
            properties.label = label;
        }

        return {
            position,
            size,
            properties,
            type,
        };
    });
}
