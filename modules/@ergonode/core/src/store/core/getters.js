/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    rootLanguage: state => state.inheritedLanguagesTree.find(({
        column,
    }) => column === 0),
    getLanguage: state => languageId => state.languages.find(({
        id,
    }) => id === languageId),
    activeLanguages: state => state.languages.filter(({
        active,
    }) => active === true),
    getActiveLanguageByCode: (state, getters) => c => getters.activeLanguages.find(
        ({
            code,
        }) => code === c,
    ) || {},
    getActiveLanguageByName: (state, getters) => n => getters.activeLanguages.find(
        ({
            name,
        }) => name === n,
    ) || {},
};
