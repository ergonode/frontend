/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export function getMappedTemplateID(templates, selectedTemplate) {
    const templateByName = templates.find(
        template => template.name === selectedTemplate,
    );
    return templateByName
        ? templateByName.id
        : null;
}

export function getMappedOptionKeys(options) {
    return options.map(option => option.key);
}

export default {
    getMappedTemplateID,
    getMappedOptionKeys,
};
