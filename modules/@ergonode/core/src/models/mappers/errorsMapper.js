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
