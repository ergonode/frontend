/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export function getDisabledElementState({
    languageCode,
    elementId,
    disabledElements = {},
}) {
    return Boolean(disabledElements[languageCode]
        && typeof disabledElements[languageCode][elementId] !== 'undefined');
}

export function getDisabledElement({
    languageCode,
    elementId,
    disabledElements = {},
}) {
    return {
        languageCode,
        elementId,
        disabled: getDisabledElementState({
            languageCode,
            elementId,
            disabledElements,
        }),
    };
}

export function getDisabledElements({
    elements,
    defaultLanguageCode,
}) {
    const disabledElements = {};

    elements.forEach((element) => {
        const elementId = element.attributeId || element.element_id;

        if (elementId) {
            const languageCode = element.language || defaultLanguageCode;

            if (typeof disabledElements[languageCode] === 'undefined') {
                disabledElements[languageCode] = {};
            }

            disabledElements[languageCode][elementId] = getDisabledElementState({
                languageCode,
                elementId,
                disabledElements,
            });
        }
    });

    return disabledElements;
}
