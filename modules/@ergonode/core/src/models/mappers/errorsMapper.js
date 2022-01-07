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
        const errorMessages = errors[key];

        if (Array.isArray(errorMessages)) {
            if (getOnlyFirstError) {
                const [
                    errorMessage = '',
                ] = errorMessages;

                mappedErrors[fieldKey] = errorMessage;
            } else {
                mappedErrors[fieldKey] = errorMessages.join(' ');
            }
        } else if (typeof errorMessages === 'object') {
            mappedErrors = {
                ...mappedErrors,
                [fieldKey]: getMappedErrors({
                    errors: errorMessages,
                    fieldKeys,
                    getOnlyFirstError,
                }),
            };
        } else {
            mappedErrors = {
                ...mappedErrors,
                [fieldKey]: errorMessages,
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

export const getMappedPresentationErrors = errors => Object.keys(errors).reduce((prev, curr) => [
    ...prev,
    ...(typeof errors[curr] === 'string' ? [
        errors[curr],
    ] : getMappedPresentationErrors(errors[curr])),
], []);
