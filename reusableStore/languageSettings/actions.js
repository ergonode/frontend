/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

function getLanguage(language) {
    return { code: language.code, name: language.name };
}

export default {
    updateData({ state, rootState }) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const { selectedLanguageNames } = state;
        const data = Object.keys(selectedLanguageNames);

        return this.app.$axios.$put(`${userLanguageCode}/languages`, data).then(() => {
            this.$addAlert({ type: 'success', message: 'Languages updated' });
        });
    },
    getData({ commit, rootState }, filter = null) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const path = `/${userLanguageCode}/languages`;
        const params = {
            limit: 9999,
            offset: 0,
            view: 'list',
            order: 'ASC',
            field: 'name',
        };

        if (filter) {
            params.filter = `name=${filter}`;
        }

        return this.app.$axios.$get(path, { params }).then(({
            collection,
        }) => {
            commit(types.SET_LANGUAGES, collection.map(getLanguage));
            commit(types.SET_SELECTED_LANGUAGE_NAMES, collection
                .filter((language) => language.active)
                .map((language) => language.code));
        });
    },
    getFilteredData({ commit, rootState }, filter = null) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const path = `/${userLanguageCode}/languages/autocomplite?${filter}`;

        return this.app.$axios.$get(path).then(({
            collection,
        }) => {
            commit(types.SET_LANGUAGES, collection.map(getLanguage));
        });
    },
    setSelectedLanguages({ commit }, selectedLanguageNames) {
        commit(types.SET_SELECTED_LANGUAGE_NAMES, selectedLanguageNames);
    },
};
