/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    setTabTranslations: ({ commit }, translation) => {
        commit('setTabTranslations', translation);
    },
    setMultilingualTranslationPropertyValue: ({ commit }, params) => {
        commit('setMultilingualTranslationPropertyValue', params);
    },
    clearStorage: ({ commit }) => {
        commit('clearStorage');
    },
};
