/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    getRootOnLanguagesTree: state => state.languagesTree.find(({
        level,
    }) => level === 0),
    getLanguage: state => languageId => state.languages.find(({
        id,
    }) => id === languageId),
    getActiveLanguages: state => state.languages.filter(({
        active,
    }) => active === true),
    getActiveLanguageByCode: (state, getters) => c => getters.getActiveLanguages.find(
        ({
            code,
        }) => code === c,
    ) || {},
    getActiveLanguageByName: (state, getters) => n => getters.getActiveLanguages.find(
        ({
            name,
        }) => name === n,
    ) || {},
};
