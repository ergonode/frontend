/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const types = {
    SET_LANGUAGES: 'SET_LANGUAGES',
    SET_SELECTED_LANGUAGE_NAMES: 'SET_SELECTED_LANGUAGE_NAMES',
};

export default {
    [types.SET_LANGUAGES](state, languages) {
        state.languages = languages;
    },
    [types.SET_SELECTED_LANGUAGE_NAMES](state, selectedLanguageNames) {
        state.selectedLanguageNames = { ...selectedLanguageNames };
    },
};
