/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    addCardLanguageCode: (state, { languageCode }) => {
        state.cardsLanguageCodes.push(languageCode);
    },
    removeCardLanguageCode: (state, { index }) => {
        state.cardsLanguageCodes.splice(index, 1);
    },
    setTabTranslations: (state, translations) => {
        state.translations = { ...translations };
    },
    setMultilingualTranslationPropertyValue: (state, {
        languageCode, propertyName, value, isMultilingual,
    }) => {
        if (isMultilingual) {
            state.translations[propertyName] = {
                ...state.translations[propertyName],
                [languageCode]: value,
            };
        } else {
            state.translations[propertyName] = value;
        }
    },
    clearStorage: (state) => {
        state.translations = {};
        state.cardsLanguageCodes = [];
    },
};
