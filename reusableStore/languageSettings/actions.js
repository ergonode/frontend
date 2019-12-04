/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';
import { getParsedData, getLanguageCodesBasedOnNames } from '~/model/mappers/languageMapper';

export default {
    updateData({ state, rootState }) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const { languages: activeLanguages } = rootState.data;
        const { selectedLanguageNames, languages } = state;
        const selectedLanguageCodes = getLanguageCodesBasedOnNames(
            selectedLanguageNames, languages,
        );
        const data = getParsedData(activeLanguages, selectedLanguageCodes);

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
            order: 'ASC',
            field: 'name',
        };

        if (filter) {
            params.filter = `name=${filter}`;
        }

        function getLanguage(language) {
            return { code: language.code, name: language.name };
        }

        function getActiveLanguages(acc, current) {
            const newObject = acc;
            newObject[current.code] = current.name;
            return newObject;
        }

        return this.app.$axios.$get(path, { params }).then(({
            collection,
        }) => {
            commit(types.SET_LANGUAGES, collection.map(getLanguage));
            commit(types.SET_SELECTED_LANGUAGE_NAMES, collection
                .filter((language) => language.active)
                .reduce(getActiveLanguages, {}));
        });
    },
    setSelectedLanguages({ commit }, selectedLanguageNames) {
        console.log(selectedLanguageNames);
        commit(types.SET_SELECTED_LANGUAGE_NAMES, selectedLanguageNames);
    },
};
