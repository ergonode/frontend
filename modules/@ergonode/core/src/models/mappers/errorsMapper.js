/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const getMappedErrors = ({
    errors,
    fieldKeys = {},
    getOnlyFirstError = false,
}) => {
    const keys = Object.keys(errors);

    let mappedErrors = {};

    for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        const fieldKey = fieldKeys[key] || key;

        if (Array.isArray(errors[key])) {
            if (getOnlyFirstError) {
                const [
                    errorMessage,
                ] = errors[key];

                mappedErrors[fieldKey] = errorMessage;
            } else {
                mappedErrors[fieldKey] = errors[key].join(', ');
            }
        } else if (typeof errors[key] === 'object') {
            mappedErrors = {
                ...mappedErrors,
                [fieldKey]: getMappedErrors({
                    errors: errors[key],
                    fieldKeys,
                    getOnlyFirstError,
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
    getOnlyFirstError = false,
}) => ({
    [scope]: getMappedErrors({
        errors,
        fieldKeys,
        getOnlyFirstError,
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
