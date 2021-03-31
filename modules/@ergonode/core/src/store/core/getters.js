/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    rootLanguage: state => state.inheritedLanguagesTree.find(({
        column,
    }) => column === 0),
    availableLanguages: (state, getters, rootState) => state.inheritedLanguagesTree.filter(({
        code,
    }) => {
        const {
            languagePrivileges,
        } = rootState.authentication.user;

        return languagePrivileges[code] && languagePrivileges[code].read;
    }),
    defaultLanguageCode: (state, getters, rootState) => {
        if (rootState.authentication.user) {
            const {
                language: languageCode,
            } = rootState.authentication.user;

            const defaultLanguage = getters.availableLanguages.find(
                language => language.code === languageCode,
            );

            if (defaultLanguage) {
                return defaultLanguage.code;
            }

            if (getters.availableLanguages.length) {
                return getters.availableLanguages[0].code;
            }
        }

        return null;
    },
};
