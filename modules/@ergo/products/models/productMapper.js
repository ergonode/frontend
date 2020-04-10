/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

function getParsedOptions({ language, options }) {
    if (!options) return null;

    return options.map(({ id, code, label }) => (
        { id, key: code, value: label[language] || null }
    ));
}

export function getMappedLayoutElement(language, {
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
        options: getParsedOptions({ language, options }),
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
        template => template.name === selectedTemplate,
    );
    return templateByName
        ? templateByName.id
        : null;
}
