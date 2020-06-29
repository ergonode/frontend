/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export function fieldDataCompose(check) {
    return ({
        data, draft, defaultValue,
    }) => {
        const dataValue = data || defaultValue;

        if (typeof draft !== 'undefined') {
            return {
                value: draft,
                isDraft: check(dataValue, draft),
            };
        }

        return {
            value: dataValue,
            isDraft: false,
        };
    };
}
