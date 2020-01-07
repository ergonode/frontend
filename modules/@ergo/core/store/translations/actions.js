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
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
