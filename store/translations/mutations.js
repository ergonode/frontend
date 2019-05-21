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
    setTabTranslations: (state, { translations }) => {
        state.translations = { ...translations };
    },
    setTabTranslationPropertyValue: (state, { languageCode, propertyName, value }) => {
        state.translations[propertyName] = {
            ...state.translations[propertyName],
            [languageCode]: value,
        };
    },
    initializeOptionTranslationValues: (state, { optionTranslations }) => {
        state.optionTranslationsValues = optionTranslations;
    },
    addOptionTranslationValueForLanguage: (state, { languageCode }) => {
        state.optionTranslationsValues[languageCode].push('');
    },
    addOptionTranslation: (state, { languageCode }) => {
        state.optionTranslationsValues = {
            ...state.optionTranslationsValues, [languageCode]: [],
        };
    },
    setAttributeOptionKeyValue: (state, { languageCode, index, value }) => {
        state.optionTranslationsValues[languageCode][index] = value;
        state.optionTranslationsValues[languageCode] = [
            ...state.optionTranslationsValues[languageCode],
        ];
    },
    removeAttributeOptionTranslationValueForLanguage: (state, { index, languageCode }) => {
        state.optionTranslationsValues[languageCode].splice(index, 1);
    },
    clearStorage: (state) => {
        state.translations = {};
        state.cardsLanguageCodes = [];
        state.optionTranslationsValues = {};
    },
};
