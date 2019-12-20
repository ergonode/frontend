/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

export default {
    setTabTranslations({ commit }, translation) {
        commit(types.SET_TAB_TRANSLATIONS, translation);
    },
    setMultilingualTranslationPropertyValue({ commit }, params) {
        commit(types.SET_MULTILINGUAL_TRANSLATION_PROPERTY_VALUE, params);
    },
    addCardLanguageCode({ commit }, language) {
        commit(types.ADD_CARD_LANGUAGE_CODE, language);
    },
    setVisibleCardTranslations({ commit, state }, { languages }) {
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
                commit(types.REMOVE_CARD_LANGUAGE_CODE, {
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
                commit(types.ADD_CARD_LANGUAGE_CODE, { languageCode });
            });

            commit(types.SET_TAB_TRANSLATIONS, translations);
        }
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
