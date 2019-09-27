/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export function getMappedLayoutElement({
    label,
    type,
    properties,
    position,
    size,
}) {
    const { x: column, y: row } = position;
    const {
        attribute_id: id, attribute_code: code, required, hint, placeholder, parameters, options,
    } = properties;
    const { width, height } = size;

    // TODO:
    // BE needs to unify options for select / multiselect - when those attrs does not have options they are returning [], but whenever they do - returning { key: value }
    const parsedOptions = Array.isArray(options) ? {} : options;

    return {
        id,
        code,
        row: row + 1,
        column: column + 1,
        width,
        height,
        type,
        label,
        hint,
        placeholder,
        required,
        parameters,
        options: parsedOptions,
    };
}

export function getMappedLayoutSectionElement({
    label,
    position,
    size,
}) {
    const { x: column, y: row } = position;
    const { width, height } = size;

    return {
        row: row + 1,
        column: column + 1,
        width,
        height,
        type: 'SECTION TITLE',
        label,
    };
}

export function getMappedTemplateID(templates, selectedTemplate) {
    const templateByName = templates.find(
        (template) => template.name === selectedTemplate,
    );
    return templateByName
        ? templateByName.id
        : null;
}

export function getMappedLayoutElements(elements) {
    return elements.map((element) => {
        if (element.type === 'SECTION') {
            return getMappedLayoutSectionElement(element);
        }

        return getMappedLayoutElement(element);
    });
}
