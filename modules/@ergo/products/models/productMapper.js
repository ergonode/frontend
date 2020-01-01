/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

function getParsedOptions(options) {
    // TODO:
    // BE needs to unify options for select / multiselect - when those attrs does not have options they are returning [], but whenever they do - returning { key: value }

    if (!options) return null;
    if (Array.isArray(options)) return [];

    const optionKeys = Object.keys(options);
    const { length } = optionKeys;
    const parsedOptions = [];

    for (let i = 0; i < length; i += 1) {
        const key = optionKeys[i];

        parsedOptions.push({ key, value: options[key] });
    }

    return parsedOptions;
}

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
        options: getParsedOptions(options),
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
