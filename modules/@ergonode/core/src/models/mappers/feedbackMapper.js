/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export function hasAnyChange({
    changeValues,
    errors,
}) {
    const changeValuesKeys = Object.keys(changeValues);
    const hasError = Object.keys(errors).length > 0;
    const hasChange = changeValuesKeys.length > 0
        && changeValuesKeys.some(key => Object.keys(changeValues[key]).length > 0
            && !changeValues[key].saved);

    return hasError || hasChange;
}
