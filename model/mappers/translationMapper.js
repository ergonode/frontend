/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function setDefaultTranslation(transaltions, languageCode) {
    return Object.keys(transaltions).reduce((prevProperty, currProperty) => ({ ...transaltions[currProperty], [languageCode]: '' }), {});
}

export function setTransaltion(transaltions, deafaultTranslation, languageCode) {
    return Object.keys(deafaultTranslation).reduce((response, property) => {
        if (!transaltions[property] || !transaltions[property][languageCode]) {
            return { ...response, [property]: { ...transaltions[property], [languageCode]: '' } };
        }
        return { ...transaltions };
    }, {});
}

export function isThereAnyTranslation(obj) {
    return Object.keys(obj).find(entry => obj[entry] !== '') ? obj : false;
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
    setTransaltion,
    setDefaultTranslation,
    isThereAnyTranslation,
};
