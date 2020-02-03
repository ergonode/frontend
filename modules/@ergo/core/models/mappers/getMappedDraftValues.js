/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default function (value) {
    let apiData = '';
    let presentationValue = '';

    if (Array.isArray(value)) {
        const { length } = value;
        apiData = [];
        presentationValue = '';

        for (let i = 0; i < length; i += 1) {
            const val = value[i];

            presentationValue += val.value || `#${val.key}`;

            if (i + 1 < length) {
                presentationValue += ', ';
            }

            apiData.push(val.key);
        }
    } else if (typeof value === 'object') {
        if (value.key) {
            apiData = value.key;
            presentationValue = value.value || `#${value.key}`;
        }
    } else {
        apiData = value;
        presentationValue = value;
    }

    return {
        apiData,
        presentationValue,
        editValue: value,
    };
}
