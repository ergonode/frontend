/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    setTabTranslations: ({ commit }, payload) => {
        commit('setTabTranslations', payload);
    },
    setMultilingualTranslationPropertyValue: ({ commit }, payload) => {
        commit('setMultilingualTranslationPropertyValue', payload);
    },
    addCardLanguageCode: ({ commit }, payload) => commit('addCardLanguageCode', payload),
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

            commit('setTabTranslations', { translations });
        }
    },
    addOptionTranslation: ({ commit }, payload) => commit('addOptionTranslation', payload),
    clearStorage: ({ commit }) => {
        commit('clearStorage');
    },
};
