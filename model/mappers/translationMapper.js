/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function setTranslation(translations, defaultTranslation, languageCode) {
    return Object.keys(defaultTranslation).reduce((response, property) => {
        if (!translations[property] || !translations[property][languageCode]) {
            return { ...response, [property]: { ...translations[property], [languageCode]: '' } };
        }
        return { ...translations };
    }, {});
}

export function isThereAnyTranslation(obj) {
    return !!Object.keys(obj).find(entry => obj[entry] !== '');
}

export function clearEmptyTranslations(obj) {
    return Object.keys(obj).reduce((response, property) => {
        if (obj[property] !== '') {
            return { ...response, [property]: obj[property] };
        }
        return { ...response };
    }, {});
}

export default {
    setTranslation,
    isThereAnyTranslation,
};
