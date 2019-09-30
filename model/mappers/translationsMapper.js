/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function isThereAnyTranslation(obj) {
    return !!Object.keys(obj).find((key) => obj[key] !== '');
}

export function getParsedTranslations(obj) {
    return Object.keys(obj).reduce((response, property) => {
        if (obj[property] !== '') {
            return { ...response, [property]: obj[property] };
        }
        return { ...response };
    }, {});
}
