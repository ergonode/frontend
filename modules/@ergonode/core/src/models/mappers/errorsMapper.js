/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const getMappedErrors = ({
    errors,
    fieldKey = null,
}) => {
    let mappedErrors = {};

    Object.keys(errors).forEach((errorKey) => {
        if (!Array.isArray(errors[errorKey])) {
            mappedErrors = {
                ...mappedErrors,
                ...Object.keys(errors[errorKey]).reduce((acc, current) => {
                    const tmp = acc;

                    if (Array.isArray(errors[errorKey][current])) {
                        tmp[`${errorKey}_${current}`] = errors[errorKey][current].join(', ');
                    } else {
                        tmp[`${errorKey}_${current}`] = getMappedErrors({
                            errors: errors[errorKey][current],
                        });
                    }

                    return tmp;
                }, {}),
            };
        } else if (fieldKey) {
            mappedErrors[fieldKey] = errors[errorKey].join(', ');
        } else {
            mappedErrors[errorKey] = errors[errorKey].join(', ');
        }
    });

    return mappedErrors;
};

const flattenErrors = ({
    mappedErrors, errors, fieldKeys,
}) => {
    const keys = Object.keys(errors);
    const tmpErrors = {};

    for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        const fieldKey = fieldKeys[key];

        if (Array.isArray(errors[key])) {
            tmpErrors[fieldKey || key] = errors[key].join(', ');
        } else if (typeof errors[key] === 'object') {
            return {
                ...mappedErrors,
                [fieldKey || key]: flattenErrors({
                    mappedErrors,
                    errors: errors[key],
                    fieldKeys,
                }),
            };
        } else {
            return {
                ...mappedErrors,
                [fieldKey || key]: errors[key],
            };
        }
    }

    return {
        ...mappedErrors,
        ...tmpErrors,
    };
};

export const getMappedErrorsV2 = ({
    errors,
    fieldKeys,
    scope,
}) => ({
    [scope]: flattenErrors({
        mappedErrors: {},
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
        translationErrors[key] = errors[key][languageCode];
    });

    return translationErrors;
};
