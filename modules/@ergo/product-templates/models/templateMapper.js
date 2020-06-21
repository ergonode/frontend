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

export function getMappedLayoutElement(
    elementID,
    elementData,
    elementLabel,
    position,
    required = false,
    size = {
        width: 1,
        height: 1,
    },
) {
    const {
        row, column,
    } = position;
    const {
        width, height,
    } = size;
    const {
        min_width: minWidth,
        min_height: minHeight,
        max_width: maxWidth,
        max_height: maxHeight,
        type,
    } = elementData;

    return {
        id: elementID,
        row,
        column,
        width,
        height,
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
        type,
        label: elementLabel,
        required,
    };
}

export function getMappedLayoutSectionElement(
    title,
    elementData,
    position,
    size = {
        width: 1,
        height: 1,
    },
) {
    const {
        row, column,
    } = position;
    const {
        width, height,
    } = size;
    const {
        min_width: minWidth,
        min_height: minHeight,
        max_width: maxWidth,
        max_height: maxHeight,
    } = elementData;

    return {
        id: getUUID(),
        row,
        column,
        width,
        height,
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
        type: SYSTEM_TYPES.SECTION,
        label: title,
    };
}

export function getMappedLayoutElements(elements, elementsDescription, types) {
    if (!elementsDescription.length) {
        return [];
    }

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
        if (type !== SYSTEM_TYPES.SECTION) {
            const {
                code: descCode, label: descLabel,
            } = elementsDescription.find(el => el.id === attrID);

            return getMappedLayoutElement(
                attrID,
                types.find(attributeType => attributeType.type === type),
                descLabel || descCode,
                {
                    row: row + 1,
                    column: column + 1,
                },
                required,
                size,
            );
        }

        return getMappedLayoutSectionElement(
            label,
            types.find(attributeType => attributeType.type === SYSTEM_TYPES.SECTION),
            {
                row: row + 1,
                column: column + 1,
            },
            size,
        );
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
        let parsedType = type;

        if (type !== SYSTEM_TYPES.SECTION) {
            properties.attribute_id = id;
            properties.required = required;
        } else {
            properties.label = label;
            parsedType = SYSTEM_TYPES.SECTION;
        }

        return {
            position,
            size,
            properties,
            type: parsedType,
        };
    });
}
