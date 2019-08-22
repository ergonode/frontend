/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';
import { isThereAnyTranslation, getParsedTranslations } from '~/model/mappers/translationsMapper';

export default {
    setCode({ commit }, code) {
        commit(types.SET_CODE, code);
    },
    setColor({ commit }, color) {
        commit(types.SET_COLOR, color);
    },
    createProductStatus({ commit, state, rootState }, { onSuccess, onError }) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const data = {
            code: state.code,
            color: state.color,
        };
        return this.app.$axios.$post(`${userLanguageCode}/workflow/default/status`, data).then(({ id }) => {
            commit(types.SET_STATUS_ID, id);
            onSuccess(id);
        }).catch(e => onError(e.data));
    },
    getProductStatus({ commit }, { path, onError }) {
        return this.app.$axios.$get(path).then(({
            id, code, color, name, description,
        }) => {
            const translations = {
                name,
                description,
            };

            commit(types.SET_STATUS_ID, id);
            commit(types.SET_CODE, code);
            commit(types.SET_COLOR, color);

            commit('translations/setTabTranslations', { translations }, { root: true });
        }).catch(e => onError(e.data));
    },
    updateProductStatus({ commit, state, rootState }, { onSuccess, onError }) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const { translations } = rootState.translations;

        let { name, description } = translations;

        if (isThereAnyTranslation(name)) {
            name = getParsedTranslations(name);
        }

        if (isThereAnyTranslation(description)) {
            description = getParsedTranslations(description);
        }

        const data = {
            code: state.code,
            color: state.color,
            name,
            description,
        };

        return this.app.$axios.$put(`${userLanguageCode}/workflow/default/status/${state.id}`, data).then(({ id }) => {
            onSuccess(id);
        }).catch(e => onError(e.data));
    },
    removeProductStatus({ commit, state, rootState }, { onSuccess, onError }) {
        const { id } = state;
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$delete(`${userLanguageCode}/workflow/default/status/${id}`).then(() => onSuccess()).catch(e => onError(e.data));
    },
};
