/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

function getActiveLanguages(activeAppLanguages, languageCodes) {
    const { length } = languageCodes;
    const collection = [];

    for (let i = 0; i < length; i += 1) {
        const code = languageCodes[i];
        if (!activeAppLanguages[code]) {
            collection.push({
                code,
                active: true,
            });
        }
    }

    return collection;
}

function getNonActiveLanguages(activeLanguageCodes, languageCodes) {
    const { length } = activeLanguageCodes;
    const collection = [];

    for (let i = 0; i < length; i += 1) {
        const activeCode = activeLanguageCodes[i];
        if (languageCodes.findIndex((code) => activeCode === code) === -1) {
            collection.push({
                code: activeCode,
                active: false,
            });
        }
    }

    return collection;
}

export function getParsedData(activeAppLanguages, languageCodes) {
    const activeLanguageCodes = Object.keys(activeAppLanguages);
    const activeLanguages = getActiveLanguages(activeAppLanguages, languageCodes);
    const nonActiveLanguages = getNonActiveLanguages(activeLanguageCodes, languageCodes);

    return { collection: [...activeLanguages, ...nonActiveLanguages] };
}

export function getLanguageCodesBasedOnNames(names, languages) {
    return languages
        .filter((language) => names
            .some((name) => name === language.name))
        .map((language) => language.code);
}
