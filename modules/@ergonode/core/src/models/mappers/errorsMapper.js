/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const getMappedErrors = ({
    errors,
    fieldKeys = {},
}) => {
    const keys = Object.keys(errors);

    let mappedErrors = {};

    for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        const fieldKey = fieldKeys[key] || key;

        if (Array.isArray(errors[key])) {
            mappedErrors[fieldKey] = errors[key].join(', ');
        } else if (typeof errors[key] === 'object') {
            mappedErrors = {
                ...mappedErrors,
                [fieldKey]: getMappedErrors({
                    errors: errors[key],
                    fieldKeys,
                }),
            };
        } else {
            mappedErrors = {
                ...mappedErrors,
                [fieldKey]: errors[key],
            };
        }
    }

    return mappedErrors;
};

export const getMappedScopedErrors = ({
    errors,
    fieldKeys,
    scope,
}) => ({
    [scope]: getMappedErrors({
        errors,
        fieldKeys,
    }),
});

export const getMappedTranslationErrors = ({
    errors,
    languageCode,
}) => {
    const translationErrors = {};

    Object.keys(errors).forEach((key) => {
        if (typeof errors[key][languageCode] !== 'undefined') {
            translationErrors[key] = errors[key][languageCode];
        }
    });

    return translationErrors;
};
