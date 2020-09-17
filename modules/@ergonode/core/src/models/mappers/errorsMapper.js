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

const flattenErrors = (mappedErrors, errors) => {
    const keys = Object.keys(errors);
    const tmpErrors = {};

    for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];

        if (Array.isArray(errors[key])) {
            tmpErrors[key] = errors[key].join(', ');
        } else {
            return {
                ...mappedErrors,
                [key]: flattenErrors(mappedErrors, errors[key]),
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
    scope,
}) => ({
    [scope]: flattenErrors({}, errors),
});

export const getMappedTranslationErrors = ({
    errors,
    languageCode,
}) => {
    const translationErrors = {};

    Object.keys(errors).forEach((key) => {
        translationErrors[key] = errors[key][languageCode];
    });

    console.log(translationErrors);

    return translationErrors;
};
