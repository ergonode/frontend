/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getUUID } from '@Core/models/stringWrapper';

export function getMappedLayoutElement(
    elementID,
    elementData,
    elementLabel,
    position,
    required = false,
    size = { width: 1, height: 1 },
) {
    const { row, column } = position;
    const { width, height } = size;
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
    size = { width: 1, height: 1 },
) {
    const { row, column } = position;
    const { width, height } = size;
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
        type: 'SECTION TITLE',
        label: title,
    };
}

export function getMappedLayoutElements(elements, elementsDescription, elementDataByType) {
    return elements.map((element) => {
        const {
            position, size, properties, type,
        } = element;
        const { attribute_id: attrID, required, label } = properties;
        const { x: column, y: row } = position;
        if (type !== 'SECTION') {
            const {
                code: descCode, label: descLabel,
            } = elementsDescription.find((el) => el.id === attrID);

            return getMappedLayoutElement(
                attrID,
                elementDataByType(type),
                descLabel || descCode,
                { row: row + 1, column: column + 1 },
                required,
                size,
            );
        }

        return getMappedLayoutSectionElement(
            label,
            elementDataByType('SECTION'),
            { row: row + 1, column: column + 1 },
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

        if (type !== 'SECTION TITLE') {
            properties.attribute_id = id;
            properties.required = required;
        } else {
            properties.label = label;
            parsedType = 'SECTION';
        }

        return {
            position,
            size,
            properties,
            type: parsedType,
        };
    });
}
