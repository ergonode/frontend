/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    setTabTranslations: ({ commit }, translation) => {
        commit('setTabTranslations', translation);
    },
    setMultilingualTranslationPropertyValue: ({ commit }, value) => {
        commit('setMultilingualTranslationPropertyValue', value);
    },
    addCardLanguageCode: ({ commit }, language) => commit('addCardLanguageCode', language),
    setVisibleCardTranslations: ({ commit, state }, { languages }) => {
        const { cardsLanguageCodes, translations } = state;
        const { length: numberOfCards } = cardsLanguageCodes;
        const { length: numberOfSelectedLanguages } = languages;

        if (numberOfCards > numberOfSelectedLanguages) {
            // Remove unselected cards
            const languageCodesToRemove = cardsLanguageCodes.filter(
                (cardLanguageCode) => !languages.some(
                    selectedLanguageCode => cardLanguageCode === selectedLanguageCode, // eslint-disable-line
                ),
            );

            languageCodesToRemove.forEach((languageCode) => {
                const indexToRemove = cardsLanguageCodes.findIndex(
                    (cardLanguageCode) => cardLanguageCode === languageCode,
                );
                commit('removeCardLanguageCode', {
                    index: indexToRemove,
                });
            });
        } else {
            // Add new cards
            const languageCodesToAdd = languages.filter(
                (selectedLanguageCode) => !cardsLanguageCodes.some(
                    (cardLanguageCode) => selectedLanguageCode === cardLanguageCode,
                ),
            );
            languageCodesToAdd.forEach((languageCode) => {
                commit('addCardLanguageCode', { languageCode });
            });

            commit('setTabTranslations', translations);
        }
    },
    addOptionTranslation: ({ commit }, option) => commit('addOptionTranslation', option),
    clearStorage: ({ commit }) => {
        commit('clearStorage');
    },
};
