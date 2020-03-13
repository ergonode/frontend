/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { ALERT_TYPE } from '@Core/defaults/alerts';
import { types } from './mutations';

function mappedLanguage({ id, code, name }) {
    return { id, key: code, value: name };
}

export default {
    updateData({ state, rootState }) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const { selectedLanguages } = state;
        const data = {
            collection: selectedLanguages.map(language => language.key),
        };

        return this.app.$axios.$put(`${userLanguageCode}/languages`, data).then(() => {
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Languages updated' });
        });
    },
    getData({ commit, rootState }) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const path = `/${userLanguageCode}/languages`;
        const params = {
            limit: 9999,
            offset: 0,
            view: 'list',
            order: 'ASC',
            field: 'name',
        };

        return this.app.$axios.$get(path, { params }).then(({
            collection,
        }) => {
            commit(types.SET_LANGUAGES, collection.map(mappedLanguage));
            commit(types.SET_SELECTED_LANGUAGE_NAMES, collection
                .filter(language => language.active)
                .map(mappedLanguage));
        });
    },
    getFilteredData({ commit, rootState }, filter = '') {
        const { language: userLanguageCode } = rootState.authentication.user;
        const path = `/${userLanguageCode}/language/autocomplete`;
        const params = {
            search: filter,
            order: 'ASC',
            field: 'name',
        };
        return this.app.$axios.$get(path, { params }).then((data) => {
            commit(types.SET_LANGUAGES, data.map(mappedLanguage));
        });
    },
    setSelectedLanguages({ commit }, selectedLanguages) {
        commit(types.SET_SELECTED_LANGUAGE_NAMES, selectedLanguages);
    },
};
